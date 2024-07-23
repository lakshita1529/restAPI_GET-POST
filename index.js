const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs')
const app = express();
const PORT = 8006;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());  // Middleware for parsing JSON bodies

// Routes
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")} </ul>`;
    res.send(html);
});

// REST API
app.get('/api/users', (req, res) => {
    return res.json(users);
});

// Get the user with id
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app.post("/api/users", (req, res) => {
    const body = req.body;
  //  console.log('Body:', body);  // Correctly log the body
  users.push({...body, id: users.length+1});
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
    return res.json({ status: "success", id: users.length+1 });
  })
    
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
