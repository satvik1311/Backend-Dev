const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"public/form.html"))
});

app.post("/register", (req, res) => {
    const newStudent = {
        name: req.body.name,
        password: req.body.password
    };

    fs.readFile("students.json", "utf8", (err, data) => {

        let students = [];

        if (!err && data.length > 0) {
            students = JSON.parse(data);
        }

        students.push(newStudent);

  
        fs.writeFile("students.json", JSON.stringify(students, null, 2), (err) => {
            if (err) {
                return res.send("Error saving data");
            }

            res.send("Student Registered");
        });
    });
});




// app.post("/register",(req,res)=>{
//     const newStudent = {
//         name : req.body.name,
//         password : req.body.password
//     }

//     const data = fs.readFileSync("Students.json","utf8");
//     let students = [];
//     if(data.length>0){
//     students = JSON.parse(data);
//     }
//     students.push(newStudent);
//     fs.writeFileSync("Students.json",JSON.stringify(students, null, 2));
//     // fs.appendFileSync("Students.json", JSON.stringify(newStudent) + "\n"); is tareeke se objext ke form mai append hoyega

// res.send("Student Registered");

// });
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
