const Result = require('../Models/Result');  // Corrected Result model import
const PDFDocument = require('pdfkit');

// Publish Result
const publishResult = async (req, res) => {
    try {
        const { studentName, examRollNo, collegeRollNo, marks } = req.body;

        if (!studentName || !examRollNo || !collegeRollNo || !marks) {
            return res.status(400).json({ message: 'Student details and marks are required' });
        }

        // Define student object
        const student = {
            name: studentName,
            examRollNo: examRollNo,
            collegeRollNo: collegeRollNo,
            honours: marks.honours || 0,
            cc: marks.cc || 0,
            ge1: marks.ge1 || 0,
            ge2: marks.ge2 || 0,
        };

        // Create a result object
        const result = new Result({
            examRollNo: student.examRollNo,
            collegeRollNo: student.collegeRollNo,
            name: student.name,
            honours: student.honours,
            cc: student.cc,
            ge1: student.ge1,
            ge2: student.ge2,
            cgpa: calculateCGPA(student) // Calculate CGPA here
        });

        await result.save();

        res.status(201).json({ message: 'Result published successfully', result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Calculate CGPA from the marks
const calculateCGPA = (marks) => {
    const totalMarks = marks.honours + marks.cc + marks.ge1 + marks.ge2;
    const cgpa = totalMarks / 4; 
    return cgpa;
};

// Fetch Results
const fetchResults = async (req, res) => {
    try {
        const results = await Result.find(); // Assuming no 'studentId' reference for simplicity
        res.status(200).json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Download Result as PDF

const downloadResult = async (req, res) => {
    try {
        const { resultId } = req.params;

        const result = await Result.findById(resultId);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        const doc = new PDFDocument({
            size: 'A4',
            margin: 40,
        });

        const fileName = `Result-${result.name}.pdf`;

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

        doc.pipe(res);
        doc
            .fontSize(24)
            .text('Student Result Report', { align: 'center', underline: true })
            .moveDown(2);

        // Add Basic Information
        doc
            .fontSize(14)
            .text(`Name: ${result.name}`, { align: 'left' })
            .text(`Roll No: ${result.examRollNo}`, { align: 'left' })
            .moveDown(1);

        // Add Marks Section with Better Formatting
        doc
            .fontSize(16)
            .text('Marks Obtained:', { underline: true })
            .moveDown(0.5);

        // Draw a table-like structure
        const marks = [
            { subject: 'Honours', marks: result.honours },
            { subject: 'CC', marks: result.cc },
            { subject: 'GE1', marks: result.ge1 },
            { subject: 'GE2', marks: result.ge2 },
        ];

        doc
            .fontSize(14)
            .text('Subject', 100, doc.y, { continued: true })
            .text('Marks', 300, doc.y)
            .moveDown(0.5);

        marks.forEach((item) => {
            doc
                .fontSize(12)
                .text(item.subject, 100, doc.y, { continued: true })
                .text(item.marks.toString(), 300, doc.y)
                .moveDown(0.5);
        });

        doc.moveDown(1);

        // Add CGPA Information
        doc
            .fontSize(14)
            .text(`Cumulative GPA (CGPA): ${result.cgpa.toFixed(2)}`, { align: 'left' })
            .moveDown(2);

        // Add Footer
        const currentDate = new Date().toLocaleDateString();
        doc
            .fontSize(10)
            .text(`Generated on: ${currentDate}`, { align: 'center' });

        doc.end();
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { publishResult, fetchResults, downloadResult };
