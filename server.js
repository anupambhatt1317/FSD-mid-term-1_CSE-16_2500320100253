import express from 'express';

const app = express();
app.use(express.json());

let students = [];

app.get('/', (req, res) => {
    res.send("Welcome to Node.js and Express.js!");
});

app.post('/students', (req, res) => {

    const { id, name, email, course, age } = req.body;


    if (!id || !name || !email || !course || !age) {
        return res.status(400).json({
            message: "All fields are mandatory"
        });
    }

    const existingStudent = students.find(student => student.id === id);

    if (existingStudent) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    const newStudent = {
        id,
        name,
        email,
        course,
        age
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully!",
        student: newStudent
    });

});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});