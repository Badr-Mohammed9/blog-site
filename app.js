const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const { render } = require('ejs');
const port = 5001;
const router = require('./blogRouter')
//database
const dbURI = 'mongodb+srv://username:password@nodeexpressproject.mhtsqil.mongodb.net/store?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,})
.then((result)=> {
    console.log("conncted to databse");
    app.listen(port,console.log('server is on port 5001'))
})
.catch(()=>console.log('there is eror database'))
app.use(express.static('public')); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.redirect('/blogs')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.use(router)

//databse routes
// app.get('/add-blog',async (req,res)=>{
//     try {
//         const blog = await Blog.create({
//             title:'first blog',
//             snippet:'this is my first damn blog',
//             body:`this is body`
//         });
//         res.json({blog})
//     } catch (error) {
        
//     }
// })

// app.get('/all-blogs', async (req,res)=>{
//     try {
//         let allBlogs = await Blog.find({});
//         res.json(allBlogs)
//     } catch (error) {
        
//     }
// })





app.use((req,res)=>{
    res.sendFile('./views/404.html',{root:__dirname})
})
