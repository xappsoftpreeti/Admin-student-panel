const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    examRollNo: { type: String, required: true },
    collegeRollNo: { type: String, required: true },
    name: { type: String, required: true },
    honours: { type: String, required: true },
    cc: { type: String, required: true },
    ge1: { type: String, required: false },
    ge2: { type: String, required: false },
    cgpa: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

resultSchema.pre('save', function (next) {
    const totalMarks = [this.honours, this.cc, this.ge1, this.ge2].reduce((acc, mark) => acc + (parseFloat(mark) || 0), 0);
    const subjectCount = 4;
    this.cgpa = (totalMarks / subjectCount) / 10;
    next();
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;

