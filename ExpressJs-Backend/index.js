const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// sample users with branch field
const users = [
  { id: 1, name: "Satvik", branch: "CSE", subjects: ["Math", "Science"] },
  { id: 2, name: "Jane", branch: "ECE", subjects: ["English", "History"] },
  { id: 3, name: "Doe", branch: "CSE", subjects: ["Art", "PE"] },
  { id: 4, name: "Max", branch: "ME", subjects: ["Thermo", "Design"] }
];

// root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// ✅ Get users (with optional branch query filter)
app.get('/users', (req, res) => {

  const branchQuery = req.query.branch;

  // agar branch query aayi hai → filter karo
  if (branchQuery) {
    const filteredUsers = users.filter(
      u => u.branch.toLowerCase() === branchQuery.toLowerCase()
    );
    return res.json(filteredUsers);
  }

  // warna sab users bhej do
  res.json(users);
});


// get user by id
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
