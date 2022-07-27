const BlogModel = require('../model/blog');
const validator = require('../validator/validator')
const UserModel = require('../model/user');


// Post API
const addPost = async (req,res)=>{
    try {
     
        let {title,body,createdBy} = req.body
        if(!validator.isValidRequestBody(req.body)){
            return res.status(400).send({status:false,msg:"Please insert something inside the request body"})
        }

        if(!validator.isValid(title)){
            return res.status(400).send({status:false,msg:"Please insert something inside title"})
        }

        if(!validator.isValid(body)){
            return res.status(400).send({status:false,msg:"Please insert something inside body"})
        }
        

        if(!validator.isValidObjectId(createdBy)){
            return res.status(400).send({status:false,msg:"Please insert valid objectId"})
        }


        let isUserIsPresent = await UserModel.findOne({_id:createdBy});

        if(!isUserIsPresent){
            return res.status(400).send({status:false,msg:"User is not present"})
        }
       
        let createPost = await BlogModel.create(req.body);

        return res.status(201).send({status:true,data:createPost})


    } catch (err) {
        return res.status(500).send({status:false,msg:err.message})
    }
}



// get Post

const getPost = async (req,res)=>{
    try {
        let query = req.query;
        let obj = {};
        let {title,createdBy,isActive} = query
        

        if(validator.isValid(title)){
           obj.title = title
        }

        if(validator.isValidObjectId(createdBy)){
           obj.createdBy = createdBy
        }

        console.log(typeof isActive);
        if(typeof(isActive)===Boolean){
            obj.isActive = isActive
        }

        let filter = {
            ...obj,
            isActive
        }

        let findBlog = await BlogModel.find({...filter});
        return res.status(201).send({msg:"Success",data:findBlog})


    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }
}

// Simple get
const getSimplePost = async (req,res)=>{
    try {
        let postId = req.body.postId
        let findBlog = await BlogModel.find({_id:postId,isActive:true});
        return res.status(201).send({msg:"Success",data:findBlog})


    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }
}


// delete api

const deletePost = async (req,res)=>{
   try {
    let reqBody = req.body;
    
    let {postId} = reqBody;
    if(!validator.isValidObjectId(postId)){
        return res.status(400).send({status:false,msg:"Please enter valid object Id"});
    }

    let isPostPresent = await BlogModel.findOne({_id:postId,isActive:true});

    if(!isPostPresent){
        return res.status(400).send({status:false,msg:"Blog is not present"});
    }

    let deleteThePost = await BlogModel.findOneAndUpdate({_id:postId,isActive:true},{isActive:false},{new:true})
    return res.status(201).send({msg:"Success",data:deleteThePost})

   } catch (error) {
    return res.status(500).send({status:false,msg:error.message})
   }




}

// TASK 4

const fetchApiGeoLocation = async (req,res)=>{

    let reqBody = req.body
    let {longitute,lattitude} = reqBody
    console.log(reqBody);
    
    let postData = await BlogModel.find({geoLocation:[longitute,lattitude]});
    
    return res.status(201).send({msg:"Suceess",data:postData})
}


// Task 5

const countActiveAndInActive = async(req,res)=>{
    let activePost = await BlogModel.find({isActive:true}).count()
    let inActivePost = await BlogModel.find({isActive:false}).count();

    return res.status(201).send({activePost:activePost,inActivePost:inActivePost})


}

module.exports.countActiveAndInActive=countActiveAndInActive
module.exports.fetchApiGeoLocation = fetchApiGeoLocation
module.exports.getSimplePost = getSimplePost
module.exports.deletePost = deletePost;
module.exports.getPost = getPost
module.exports.addPost = addPost;