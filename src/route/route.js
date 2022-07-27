const express = require('express');
const router = express();
const UserController = require('../controller/userController')
const PostController = require('../controller/blogController')
router.get('/',async ()=>(console.log("router")))


//User Route
router.post('/createUser',UserController.createUser)

// Post Route
router.get('/getSimplePost',PostController.getSimplePost)
router.get('/getPost',PostController.getPost)
router.post('/addPost',PostController.addPost)
router.delete('/deletePost',PostController.deletePost)
router.get('/countActiveAndInActive',PostController.countActiveAndInActive)
router.get('/fetchApiGeoLocation',PostController.fetchApiGeoLocation)
module.exports = router