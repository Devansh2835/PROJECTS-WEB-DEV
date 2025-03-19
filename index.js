const express= require("express")
const app= express()
const port= 8080
const path= require("path")
const{v4:uuidv4}= require("uuid")//uuid package creates a new random id each time it is called
const methodOverride= require("method-override")

app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))

app.listen(port,()=>{ 
    console.log("listening to port: 8080")
})

let posts= [
    {
        username: "devansh",
        content: "i love coding",
        id: uuidv4() //khud se nayi id create krne se better we use this
    },
    {
        username: "apna college",
        content: "hard work is important",
        id: uuidv4()
    },
    {
        username: "agneesh",
        content: "i love roblox",
        id: uuidv4()
    },
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/posts",(req,res)=>{
    let {username,content}= req.body
    let id= uuidv4()
    posts.push({username,content,id})
    res.redirect("/posts") //after the form is submitted yeh automatically redirect krke post wale page pe le ayega wapas
})
app.get("/posts/:id",(req,res)=>{
    let{id}= req.params
    let post= posts.find((p)=>id===p.id)
    res.render("show.ejs",{post })
})
app.patch("/posts/:id",(req,res)=>{
    let{id}= req.params
    let newcontent= req.body.content
    let post= posts.find((p)=>id===p.id)
    post.content= newcontent
    console.log(post)
    res.redirect("/posts")
})
app.get("/posts/:id/edit",(req,res)=>{
    let{id}= req.params
    let post= posts.find((p)=>id===p.id)
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params
    posts= posts.filter((p)=>id!==p.id)
    res.redirect("/posts")
})
