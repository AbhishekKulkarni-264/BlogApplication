const router=require('express').Router()
const User=require("../models/User")
const Post=require('../models/Post')


//CREATE new post
router.post("/",async(req,res)=>{
 const newPost=new Post(req.body)
 try{
    const savedPost=await newPost.save()
    res.status(200).json(savedPost)

 }  catch(e){
    res.status(500).json(e)
 } 

})



//update
router.put("/:id",async(req,res)=>{
    try{
       const post=await Post.findById(req.params.id);
       if(post.username===req.body.username){
        try{
            const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})

            return res.status(200).json(updatedPost)

        }catch(e){
           return res.status(500).json(e)
        }

       } else{
       return  res.status(401).json("You can update only your post")
       }
       

    }catch(e){
       return res.status(500).json(e)
    }
})
//delete
router.delete("/:id",async(req,res)=>{
    try{
       const post=await Post.findById(req.params.id);
       if(post.username===req.body.username){
        try{
           await post.delete()

            return res.status(200).json("Post is deleted")

        }catch(e){
           return res.status(500).json(e)
        }

       } else{
       return  res.status(401).json("You can delete only your post")
       }
       

    }catch(e){
       return res.status(500).json(e)
    }
})


//GET

router.get("/:id",async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id)
      
        res.status(200).json(post); 

    }catch(e){
        res.status(500).json(e)
    }
})

//GET all posts
router.get("/",async(req,res)=>{

    const username=req.query.user;
    const catname=req.query.cat;

    try{
         let posts;
        if(username){
            posts=await Post.find({username})
        }else if(catname){
            posts=await Post.find({categories:{
                $in:[catname]
            }})

        }else{
            posts=await Post.find();
        }

        res.status(200).json(posts)
    }catch(e){
        res.status(500).json(e)
    }
})




module.exports=router