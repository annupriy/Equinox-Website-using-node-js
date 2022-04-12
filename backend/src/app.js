const express = require("express");
const path = require('path');
const app = express();
// const hbs = require('hbs');
require("./db/conn");
const Data = require("./models/Data")

const port = process.env.PORT || 3000;
// const path = require('path') already declared
// const static_path = path.join(__dirname, '/public');

// const template_path = path.join(__dirname, '../template/partials');
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// console.log(path.join(__dirname, "../public"))
// app.use(express.static(static_path));
app.set("view engine", "hbs");
// app.set(template_path)
// hbs.registerPartials(template_path)

app.get("/", (req, res) => {
    res.render("opening") 
});

app.get("/about", (req, res)=>{
    res.render("about")
})
app.get("/contact", (req, res)=>{
    res.render("contact")
})
app.get("/courses", (req, res)=>{
    res.render("courses")
})
app.get("/index", (req, res)=>{
    res.render("index")
})
app.get("/blog", (req, res)=>{
    res.render("blog")
})
app.post("/Data", async (req, res) => {
    try{
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        if(password==confirmpassword){
            const registerStudents = new Data({

                userid : req.body.userid,
                email : req.body.email,
                password : password,
                confirmpassword : confirmpassword 
            })

         const registered = await registerStudents.save();
         res.status(201).render("register");
        }else{
            res.send("passwords are not matching")
        }
    }catch(error) {
        res.status(400).send(error);
    }
});
app.get("/register", (req, res) => {
    res.render("register") 
});
//LogIn Check
app.get("/login", (req, res) => {
    res.render("login") 
});
app.post("/login", async(req, res) => {
    try {
        const userid = req.body.userid
        const password = req.body.password

        const useridd = await Data.findOne({userid:userid})
        // res.send(useridd.password);
        // console.log(useridd);
        if(useridd.password === password){
            res.status(201).render("home");
        }else{
            res.send("Password is incorrect")
        }
    } catch (error) {
        res.status(400).send("invalid username")
    }
});



// app.get("/", (req, res) => {
//     res.sendFile(__dirname+"/home.html") 
// });

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})

