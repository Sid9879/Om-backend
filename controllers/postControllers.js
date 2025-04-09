const PostCollection = require('../models/PostCollection');
const UserCollection = require('../models/UserCollection');
const{query} = require('express')
const createPost = async (req,res)=>{
    const {title,description,price,category,image,size} = req.body;
    const userId = req.user._id;
   try {
    const user = await UserCollection.findById(userId);
    if(!user|| !user.isAdmin){
        return res.status(403).json({msg:'You are not authorized to create a post.',success:false})
    }
   let post = await PostCollection.create({
    title,
    description,
    price,
    category,
    image,
    size,
    userId
   })
        res.status(201).json({msg:"post created successfully",success:true,post})

   } catch (error)
    {
       res.status(500).json({msg:"server error",error:error.message,success:false})
   }

}

const getSeeds = async(req,res)=>{
    let {limit,page} = req.query
    const skip = (page-1)*limit
    try {
        const seeds = await PostCollection.find({category:"Seed"}).skip(Number(skip)).limit(Number(limit)).sort({createdAt:-1});;
        const totalCount = await PostCollection.countDocuments()
        // console.log(totalCount)
       if(seeds.length>0){
        res.status(200).json({msg:"Products fetched",success:true,seeds,totalPage:Math.ceil(totalCount/limit),totalItems:totalCount});
       }
    } catch (error) {
        res.status(500).json({msg:"error in fetching"})
    }
}

const fertilizers =async(req,res)=>{
    let {limit,page} = req.query
    const skip = (page-1)*limit
    try {
        let fertilizers = await PostCollection.find({category:"Fertilizer"}).skip(Number(skip)).limit(Number(limit)).sort({createdAt:-1});;
        const totalCount = await PostCollection.countDocuments()
        if(fertilizers.length>0){
            res.status(200).json({msg:"fertilizer fetched",success:true,fertilizers,totalPage:Math.ceil(totalCount/limit),totalItems:totalCount})
        }
        else{
            res.status(404).json({msg:"fertilizer not found",success:false})
        }
    } catch (error) {
        res.status(500).json({msg:"error in fetching",success:false,error:error.message})
    }
}
  
const Pesticides = async(req,res)=>{
    let {limit,page} = req.query
    const skip = (page-1)*limit
    try {
        let Pesticides = await PostCollection.find({category:"Pesticide"}).skip(Number(skip)).limit(Number(limit)).sort({createdAt:-1});;
    const totalCount = await PostCollection.countDocuments()
        if(Pesticides.length>0){
            res.status(200).json({msg:"Pesticides fetched",success:true,Pesticides,totalPage:Math.ceil(totalCount/limit),totalItems:totalCount});
        }
        else{
            res.status(404).json({msg:"Pesticides not found",success:false})
        }
    } catch (error) {
        res.status(500).json({msg:"error in fetching"})
    }
}

const updatePost = async(req,res)=>{
    const postId = req.params._id
    let userId = req.user._id
    const {title,description,price,category,image,size} = req.body;
try {
    const user = await UserCollection.findById(userId);
    if(!user|| !user.isAdmin){
        return res.status(403).json({msg:'You are not authorized to update a post.',success:false})
    }

    let update = await PostCollection.findByIdAndUpdate(postId,{$set:{title,description,price,category,image,size}});
    if(update){
        res.status(200).json({msg:"Post updated",success:true})
    }
    else{
        res.status(404).json({msg:"Post not found",success:false})
    }
} catch (error) {
    res.status(500).json({msg:"error in updating",error:error.message});
}
}

const deletePost = async(req,res)=>{
    let userId = req.user._id
    let postId = req.params._id
    try {
        const user = await UserCollection.findById(userId);
        if(!user|| !user.isAdmin){
            return res.status(403).json({msg:'You are not authorized to delete a post.',success:false})
        }
       let post = await PostCollection.findOneAndDelete(postId);
       res.status(200).json({msg:"deleted successfully",success:true});
    } catch (error) {
        res.status(500).json({msg:"error in deleting"});
    }
}

const getAll = async(req,res)=>{
    let {limit,page} = req.query
    const skip = (page-1)*limit
 try {
    let post = await PostCollection.find().skip(Number(skip)).limit(Number(limit)).sort({createdAt:-1});
    const totalCount = await PostCollection.countDocuments()
    res.status(200).json({msg:"All post fetched",post,totalPage:Math.ceil(totalCount/limit),totalItems:totalCount})
 } catch (error) {
    res.status(500).json({msg:"error in fetching",error:error.message})
 }
}

const searchUser = async (req,res)=>{
    let {q} = req.query;
   try {
    if (typeof q === 'string' && q.trim().length > 0){
        let queryRegex = new RegExp(q,'i');
        let products = await PostCollection.find({
            $or: [
              { title: { $regex: queryRegex } }
            ]
          }).select(['_id','title']);
  
          if (products.length > 0) {
            return res.json({ msg: "product's found", success: true, products });
          } else {
            return res.json({ msg: "No products found", success: false, products: [] });
          }
        } else {
          return res.json({ msg: "Empty search query", success: false });
        }
  
   } catch (error) {
    res.json({msg:"No search query",success:false,error:error.message})
    
   }
}

const findSingle = async (req,res)=>{
    const postId = req.params._id;
    try {
        const fetchData = await PostCollection.findOne({postId});
        res.status(200).json({msg:"post fetched",post:fetchData})
    } catch (error) {
        res.status(500).json({msg:"no product found",success:false,error:error.message})
    }


}

module.exports = {
    createPost,
    getSeeds,
    fertilizers,
    Pesticides,
    updatePost,
    deletePost,
    getAll,
    searchUser,
    findSingle
}
