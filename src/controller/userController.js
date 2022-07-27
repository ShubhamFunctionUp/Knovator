const express = require('express');
let emailValidator = require('email-validator');
const UserModel = require('../model/user')
// email and name
const createUser = async (req,res) =>{
    try {
        let {name,email} = req.body 

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

        let userCreated = await UserModel.create({name,email})
        return res.status(201).send({status:true,data:userCreated})
    } catch (error) {
       return res.status(500).send({status:false,msg:error.message})
    }
}

module.exports.createUser = createUser;