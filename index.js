const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require("fs");


const app1 = express()
const PORT = 8000;


//For POST METHOD in POSTMAN
//MiddleWare - Plugin
app1.use(express.urlencoded({ extended: false }))



app1.use((req, res, next) => {
    console.log("Middleware 1");
    // res.json({mgs:"hello middleware"})
    req.myUser = "MahreenFarooq";
    next();
})

app1.use((req, res, next) => {
    // console.log("Middleware 2", req.myUser);
    // // res.json({mgs:"hello middleware"})
    // next();

    fs.appendFile("./log.txt", `\n${Date.now()}:${req.ip}:${req.method}:${req.path}\n`,(err,res)=>{
        next();
    })

})


//Route
//This is json format in mobile app
app1.get("/api/users", (req, res) => {
    console.log("I am in get route")
    console.log(req.myUser)
    return res.json(users)
})


//this is the html format in web app

app1.get("/users", (req, res) => {
    const html = `
   <ul>
        ${users.map((users) => `<li>${users.first_name}</li>`).join("")}
   </ul>
   `
    res.send(html)
})

//Get users by id dynamically

// app.get("/api/users/:id",(req,res)=>{

//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);

// })

app1.post("/api/users", (req, res) => {
    //TODO: CREATE new user

    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, res) => {
        return res.json({ status: "Success", id: users.length })
    })

})

// app.patch("/api/users/:id",(req,res)=>{
//     //TODO: EDIT the user with id
// })   

// app.delete("/api/users/:id",(req,res)=>{
//     //TODO: Delete the user with id
// })


app1.route("/api/users/:id").get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    return res.json(user);

}).patch((req, res) => {


}).delete((req, res) => {
    //TODO: Delete the user with id
})



app1.listen(PORT, () => console.log("Server Started"))
