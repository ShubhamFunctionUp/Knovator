const express = require('express');
const router = express();
const UserController = require('../controller/userController')
const PostController = require('../controller/blogController')
const auth = require('../auth/auth')
router.get('/',async ()=>(console.log("router")))


//User Route
router.post('/createUser',UserController.createUser)
router.post('/login',UserController.login)



// Post Route
router.get('/getSimplePost',PostController.getSimplePost)
router.get('/getPost',PostController.getPost)
router.post('/addPost',auth.authorization,PostController.addPost)
router.delete('/deletePost',PostController.deletePost)
router.get('/countActiveAndInActive',PostController.countActiveAndInActive)
router.get('/fetchApiGeoLocation',PostController.fetchApiGeoLocation)
module.exports = router