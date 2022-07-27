const express = require('express');
const router = express();
const UserController = require('../controller/userController')
router.get('/',async ()=>(console.log("router")))

router.post('/createUser',UserController.createUser)

module.exports = router