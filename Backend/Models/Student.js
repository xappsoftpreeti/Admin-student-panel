const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    examRollNo: { type: String, required: true, },
    collegeRollNo: { type: String, required: true, },
    name: { type: String, required: true, },
    honours: { type: String, required: true, },
    cc: { type: String, required: true, },
    ge1: { type: String, required: false, },
    ge2: { type: String, required: false, },
    createdAt: { type: Date, default: Date.now, },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;


