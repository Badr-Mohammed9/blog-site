const express = require('express');
const router = express.Router();
const Blog = require('./models/blog');

router.get('/blogs', async (req,res)=>{
    let allBlogs = await Blog.find({}).sort({createdAt:-1});
    res.render('index',{blogs: allBlogs})
})


router.post('/blogs',async (req,res)=>{
    try {
        let blog = await Blog.create(req.body);
        // res.json(blog);
        res.redirect('/blogs');
    } catch (error) {
        console.log(error)
    }
})

router.get('/blogs/create',(ree,res)=>{
    res.render('create')
})

router.get('/blogs/:id',async (req,res)=>{
    const id = req.params.id;
    let blog = await Blog.findById(id);
    if (blog) {
        res.render('blogSite',{blog})
    }
})

router.delete('/blogs/:id',async (req,res)=>{
    const id = req.params.id;
    let blog = await Blog.findByIdAndDelete(id);
    if (blog) {
        res.json({redirect:'/blogs'})
    }
})

module.exports = router;