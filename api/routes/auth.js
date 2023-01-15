const router=require('express').Router()
const bcrypt=require('bcrypt')
const User=require("../models/User")


//register
router.post("/register",async(req,res)=>{
    try{

        const salt=await bcrypt.genSalt(10)
        const hashedPass=await bcrypt.hash(req.body.password,salt)
        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        })

        const user=await newUser.save();
        res.status(200).json(user)
       

    }catch(e){
        res.status(500).json(e)
    }

})



//Login


router.post("/login",async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        if(!user) {
           return res.status(400).json("User not registered")

        } 

        const validated=await bcrypt.compare(req.body.password,user.password)
       if(!validated){return res.status(400).json("Wrong credentials")} 
         
        const{password,...others}=user._doc;

        res.status(200).json(others)
    }catch(e){
        res.status(500).json(e)
    }
})


module.exports=router