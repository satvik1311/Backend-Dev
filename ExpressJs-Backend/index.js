const express = require('express');
const app = express();
const port = 3000;

// body se JSON data read karne ke liye
app.use(express.json());

// sample users data (temporary DB samajh lo)
const users = [
  { id: 1, name: "Satvik", branch: "CSE", subjects: ["Math", "Computer Science"] },
  { id: 2, name: "Rashi", branch: "CSE", subjects: ["English", "Humanities"] },
  { id: 3, name: "Bhavya", branch: "CSE", subjects: ["Art", "PE"] },
  { id: 4, name: "Ankit", branch: "ME", subjects: ["Thermo", "Design"] }
];
console.log("Initial Users Data:", users);

// root route → server check karne ke liye
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ✅ Get all users
// agar query me ?branch=CSE aaya → sirf wahi branch ke users
app.get('/users', (req, res) => {
  const branchQuery = req.query.branch; // URL se branch read karo

  if (branchQuery) {
    // branch ke basis pe filter
    const filteredUsers = users.filter(
      u => u.branch.toLowerCase() === branchQuery.toLowerCase()
    );
    return res.json(filteredUsers);
  }
  else {
    // agar branch nahi di → sab users bhej do
    return res.json(users);
  }
});

// ✅ get user by id
// example: /users/2
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id); // URL se id nikali
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user); // user mil gaya
  } else {
    res.status(404).json({ message: "User not found" }); // nahi mila
  }
});

// ✅ search user by name
// example: /search?name=sa
app.get('/search', (req, res) => {
  const nameQuery = req.query.name; // query param se name

  if (!nameQuery) {
    return res.status(400).json({ message: "Name query is required" });
  }

  // name ke basis pe search (partial match bhi chalega)
  const matchedUsers = users.filter(u =>
    u.name.toLowerCase().includes(nameQuery.toLowerCase())
  );

  res.json(matchedUsers);
});

// ✅ POST request → new student add karne ke liye
// example: /student/register
app.post('/student/register', (req, res) => {
  const student = req.body; // frontend se aaya data

  if (!student ) {
    console.log("Re-write the Student Data Properly");
    
    return res.status(400).send("Invalid Student Data");
  }
    if(student.id === users.find(u => u.id === student.id)?.id){
      console.log("Duplicate ID found:", student.id);
      return res.status(400).send("Student with this ID already exists");
      
    }
    if(!student.name || !student.branch || !student.id === null)
    {
      console.log("Missing required student data");
      return res.status(400).send("Please provide required student data");
      
    }
   
  // naye student ko users array me add karo
  users.push(student);
  console.log("New student added:", student);

  // updated users list bhej do
  res.status(201).json(users);
});

// PUT request → existing student update karne ke liye
app.put('/users/:id', (req, res) => {
 
  const userId = Number(req.body.id);
  
  // const indx = users.findIndex(u => u.id === userId);
  // if(indx === -1){
  //   return res.status(400).send("User Does Not Exist");
  // }
  
  const updatedUser = users.find(u => u.id === userId);
  if(!updatedUser){
    return res.status(400).send("User Does Not Exist");
  }

  // user data update karo spread operator se 

  // users[userId] = { ...users[indx], ...req.body };
  

  // res.json(users[userId]);
  
   Object.assign(updatedUser, req.body);

   res.json(updatedUser);
    
  console.log("User data after update:", users);

});




// server start
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
