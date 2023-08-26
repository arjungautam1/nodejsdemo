const express =require('express')
const router = express.Router()
const Student= require('../models/student')
const mongoose= require('mongoose')

router.get('/', async(req, res)=>{

    try{
        const students= await Student.find()
        res.json(students)

    }catch(err){
        res.send('Error'+err)
    }
})

router.get('/:id', async(req, res)=>{

    try{
        const students= await Student.findById(req.params.id)
        res.json(students)

    }catch(err){
        res.status(400).json({ error: err.message });
    }
})

router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        roll: req.body.roll,
        status: req.body.status
    });

    try {
        const savedStudent = await student.save();
        res.json(savedStudent);
    } catch (err) {
         res.status(400).json({ error: err.message }); // Sending error message
        // res.send("Error"+err)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;

        // Validate studentId to ensure it's a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(404).json({ error: "Student not found" });
        }

        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Update student properties...

        if (req.body.name) {
            student.name = req.body.name;
        }
        if (req.body.roll) {
            student.roll = req.body.roll;
        }
        if (req.body.status !== undefined) {
            student.status = req.body.status;
        }

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports=router