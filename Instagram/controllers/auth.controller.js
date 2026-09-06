const userModel = require('../src/models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Controller
async function registerController (req, res) {
    const {email, username, password, bio, profileImage} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    });
    if(isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists" + (isUserAlreadyExists.email ==
            email ? "Email already exists" : "Username already exists")
        });
    }

    const hash = await bcrypt.hash(password, 10);
    
    const user = await userModel.create({
        email,
        username,
        password: hash,
        bio,
        profileImage
    });
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.cookie('token', token);

    return res.status(201).json({
        message: "User Reigistered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    });
}

// Login Controller
async function loginController(req, res) {
    const {username, email, password} = req.body;

    const user = await userModel.findOne({
        $or: [
            {email: email},
            {username: username}
        ]
    });
    if(!user) {
        return res.status(401).json({
            message: "Invalid username or email"
        });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.cookie('token', token);

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    });
}

module.exports = {
    registerController,
    loginController
}