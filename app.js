const express = require("express")
const { connectDatabase } = require("./database/database")
const Blog = require("./model/blogModel")
const app = express()
const cors = require('cors')

connectDatabase()
app.use(cors({
    origin : 'http://localhost:5173'
}))

// nodejs lai form bata aako data parse gar vaneko ho 
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/",(req,res)=>{
   res.status(200).json({
    "message" : "hello"
   })
})

//create blog api
app.post("/blogs",async(req,res)=>{
    const title = req.body.title;
    const subTitle = req.body.subTitle 
    const description = req.body.description

     // Insert to database logic goes here 
   await Blog.create({
    title : title  ,
    subTitle : subTitle,
    description : description
    })

    res.status(201).json({
        message : "Blog created succesfully"
    })

})

//get allBlogs
app.get("/blogs",async(req,res)=>{
    const blogs = await Blog.find()
    if(blogs.length == 0){
        res.status(404).json({
            message : "No blogs found"
        })
    }else{
    res.status(200).json({
        message : "Blogs fetched sucessfully",
        blogs : blogs
    })
    }
})

//get singleBlog
app.get("/blogs/:id",async(req,res)=>{
    const id = req.params.id
    //const blog = await Blog.find({_id : id})
    const blog = await Blog.findById(id)
    if(blog){
        res.status(200).json({
            message : "Single blog fetched sucessfully",
            blogs : blog
        })
    }else{
    res.status(404).json({
        message : "No blog found "
    })
    }
})

//update blog
app.patch("/blogs/:id",async(req,res)=>{
    const id = req.params.id
    //const{title,subTitle,description} = req.body
    const title = req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description

    await Blog.findByIdAndUpdate(id,{
        title : title,
        subTitle : subTitle,
        description : description
    })

    res.status(200).json({
        messae : "blog updated sucessfully"
    })
})

// DELETE API 
app.delete("/blogs/:id",async (req,res)=>{
    const id = req.params.id
    // const {id} = req.params 

    await Blog.findByIdAndDelete(id)

    res.status(200).json({
        message : "Blog Deleted Successfully"
    })
})

app.listen(3000,()=>{
    console.log("Server started at port 3000")
})