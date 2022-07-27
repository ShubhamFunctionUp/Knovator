const UserModel = require('../model/user')
const jwt = require('jsonwebtoken')
// email and name
const validator = require('../validator/validator')
const createUser = async (req,res) =>{
    try {
        let {name,email,password} = req.body 

        if(name.length==0 ){
            return res.send(400).send({status:false,msg:"Please enter the name"})
        }
        
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            res.status(400).send({status:false, msg:"email is not valid"})
            return
        }

        let isEmailPresent = await UserModel.findOne({email:email});
        if(isEmailPresent){
            return res.status(400).send({status:false,msg:"Email is already present"})
        }

        if(!(password.length>7 && password.length<=16)){
            return res.status(400).send({status:false,msg:"Please follow correct password format"})
        }


        let userCreated = await UserModel.create(req.body)
        return res.status(201).send({status:true,data:userCreated})
    } catch (error) {
       return res.status(500).send({status:false,msg:error.message})
    }
}


const login = async (req,res)=>{

  
    let email = req.body.email;
    let password = req.body.password;
     
    if (!validator.isValid(email)) {
        return res
          .status(400)
          .send({ status: false, message: "enter valid email" });
      }
      
      let userIsPresent = await UserModel.findOne({email:email});
      if(!userIsPresent){
        return res.status(400).send({status:false,msg:"false",data:"Email is not correct"})

      }
      let actualPassword = await userIsPresent.isValidPassword(password)

      if(!actualPassword){
        return res.status(400).send({status:false,msg:"false",data:"password is not correct"})

      }

    //   let isUserGen = await UserModel.findOne({email:email,password:actualPassword});
      console.log(actualPassword);
    
      let token = jwt.sign({userId:userIsPresent._id},"Shubham");
      
      return res.status(200).send({status:true,message:"Token is generated Successfully",data:token});


}
module.exports.login =login
module.exports.createUser = createUser;