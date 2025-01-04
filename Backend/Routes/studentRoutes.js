const express = require('express');
const router = express.Router();
const {
    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} = require('../Controller/studentController');
const mongoose = require('mongoose');

// Middleware to validate MongoDB ObjectIDs
const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid student ID' });
    }
    next();
};

// Route to add a new student
router.post('/add', addStudent);
router.get('/', getAllStudents);
router.get('/:id', validateObjectId, getStudentById);
router.put('/:id', validateObjectId, updateStudent);
router.delete('/:id', validateObjectId, deleteStudent);

module.exports = router;
