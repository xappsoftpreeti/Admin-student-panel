const { check, validationResult } = require("express-validator");
const Student = require("../Models/Student");

// Middleware for handling validation errors

// const handleValidationErrors = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
//     }
//     next();
// };

exports.addStudent = [
  check("examRollNo")
    .matches(/^[0-9A-Za-z]+$/)
    .withMessage("Exam Roll Number must be alphanumeric")
    .notEmpty()
    .withMessage("Exam Roll Number is required"),

  check("collegeRollNo")
    .matches(/^[A-Za-z0-9-]+$/)
    .withMessage(
      "College Roll Number must be alphanumeric and may contain hyphens"
    )
    .notEmpty()
    .withMessage("College Roll Number is required"),

  check("name")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long")
    .notEmpty()
    .withMessage("Name is required"),

  check("honours")
    .isLength({ min: 3 })
    .withMessage("Honours must be at least 3 characters long")
    .notEmpty()
    .withMessage("Honours is required"),

  check("cc")
    .isLength({ min: 3 })
    .withMessage("CC must be at least 3 characters long")
    .notEmpty()
    .withMessage("CC is required"),

  check("ge1")
    .isLength({ min: 3 })
    .withMessage("GE1 must be at least 3 characters long")
    .notEmpty()
    .withMessage("GE1 is required"),

  check("ge2")
    .isLength({ min: 3 })
    .withMessage("GE2 must be at least 3 characters long")
    .notEmpty()
    .withMessage("GE2 is required"),

  // Handle validation errors

  // handleValidationErrors,

  // Controller to add student to the database
  async (req, res) => {
    const { examRollNo, collegeRollNo, name, honours, cc, ge1, ge2 } = req.body;

    try {
      // Check if the student already exists
      const existingStudent = await Student.findOne({
        $or: [{ examRollNo }, { collegeRollNo }],
      });

      if (existingStudent) {
        return res.status(400).json({
          message:
            "Student already exists with the same Exam Roll Number or College Roll Number.",
        });
      }

      // Create new student
      const student = new Student({
        examRollNo,
        collegeRollNo,
        name,
        honours,
        cc,
        ge1,
        ge2,
      });
      await student.save();

      res.status(201).json({ message: "Student added successfully", student });
    } catch (err) {
      console.error("Error adding student:", err);
      res
        .status(500)
        .json({ message: "Error adding student", error: err.message });
    }
  },
];

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching students", error: err.message });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error fetching student", error: err.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  const { examRollNo, collegeRollNo, name, honours, cc, ge1, ge2 } = req.body;

  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { examRollNo, collegeRollNo, name, honours, cc, ge1, ge2 },
      { new: true }
    );

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ message: "Student updated successfully", student });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating student", error: err.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting student", error: err.message });
  }
};
