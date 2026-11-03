import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let students = [];

app.get('/', (req, res) => {
    res.send("Welcome to Node.js and Express.js!");
});

// TASK 2: POST API - Add Student

app.post('/students', (req, res) => {
    const { id, name, email, course, age } = req.body;

    if (
        id === undefined || id === null || id === '' ||
        !name || !email || !course ||
        age === undefined || age === null || age === ''
    ) {
        return res.status(400).json({
            message: "All fields are mandatory"
        });
    }

    const existingStudent = students.find(
        student => String(student.id) === String(id)
    );

    if (existingStudent) {
        return res.status(409).json({
            message: "Student ID already exists"
        });
    }

    const newStudent = { id, name, email, course, age };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully!",
        student: newStudent
    });
});

// TASK 3: GET API - Retrieve All Students

app.get('/students', (req, res) => {
    res.status(200).json({
        message: "All students retrieved successfully",
        students: students
    });
});

// GET API - Retrieve Student By ID

app.get('/students/:id', (req, res) => {
    const studentId = req.params.id;

    const student = students.find(
        student => String(student.id) === studentId
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json({
        message: "Student retrieved successfully",
        student: student
    });
});

// TASK 4: PUT API - Update Student

app.put('/students/:id', (req, res) => {
    const studentId = req.params.id;

    const student = students.find(
        student => String(student.id) === studentId
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, course, age } = req.body;

    student.name = name;
    student.email = email;
    student.course = course;
    student.age = age;

    res.status(200).json({
        message: "Student updated successfully!",
        student: student
    });
});

// Start Server

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});