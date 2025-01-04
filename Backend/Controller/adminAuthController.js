const Admin = require('../Models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Admin Register
const registerAdmin = async (req, res) => {
    const { name, email, password, staffId } = req.body;

    try {
        // Validate inputs
        if (!name || !email || !password || !staffId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number',
            });
        }

        // Check if admin with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        // Check if admin with the same staffId already exists
        const existingStaffId = await Admin.findOne({ staffId });
        if (existingStaffId) {
            return res.status(400).json({ message: 'Admin with this staff ID already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const admin = new Admin({
            name,
            email,
            password: hashedPassword,
            staffId,
        });

        await admin.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, name: admin.name, staffId: admin.staffId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Admin registered successfully!',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Admin Login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, name: admin.name, staffId: admin.staffId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                staffId: admin.staffId,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
// =====//

const getAdmin = async (req, res) => {
    try {
        // Fetch the admin data directly (you can specify the admin ID if needed)
        const admin = await Admin.findOne().select('-password');  // Example to fetch the first admin

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Return the admin profile data
        res.json({
            name: admin.name,
            email: admin.email,
            staffId: admin.staffId,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
    getAdmin,
};


