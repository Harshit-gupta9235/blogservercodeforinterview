const express=require("express")
const router=express.Router()
const authhandler=require("../controller/authcontroller")
const loginhandler=require("../controller/loginhandler")
const authmiddleware=require("../middleware/authmiddleware.js")
const getblogs=require("../controller/getblogs.js")
const multer=require("multer")
const exportcomment=require("../controller/exportcomment.js")
const getcarddata=require("../controller/getcarddata.js")
const uploadfilehandler=require("../controller/uploadfilehandler")
const uploadimage=require("../controller/uploadimage.js")
const updateblogs=require("../controller/updatablogs.js")
const deleteblogs=require("../controller/deleteblogs.js")
const importcomment = require("../controller/importcomment.js")
const deletecomment = require("../controller/deletecomment.js")
const uploader=multer({
    storage:multer.diskStorage({
        filename:(req,file,cb)=>{
            return cb(null,`${Date.now()}-${file.originalname}`)
        }
    }),
    
})

// signup route
router.post('/signup',authhandler)

// login route
router.post('/login',loginhandler)

// upload image route
router.post('/uploading',uploader.single('file'),authmiddleware,uploadimage)


// insert blog data
router.post('/uploadfile',authmiddleware,uploadfilehandler)

// select blog data
router.get('/getblogs',authmiddleware,getblogs)

// update blog data
router.put('/updateblogs',authmiddleware,updateblogs)

// delete blog data
router.delete('/deleteblogs/:_id',authmiddleware,deleteblogs)

// get single blog data
router.get('/getcard/:id',authmiddleware,getcarddata)

// insert comment data
router.post('/exportcomment',authmiddleware,exportcomment)

// select comment data
router.get('/importcomment/:userid',authmiddleware,importcomment)

// delete comment data
router.delete('/deletecomment/:id',authmiddleware,deletecomment)

module.exports=router;