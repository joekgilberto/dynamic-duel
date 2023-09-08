const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createUserToken } = require("../middleware/auth");

async function signUp(req, res, next) {
    //   has the password before storing the user info in the database
    try {

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const cachedPW = req.body.password;
        // we store this temporarily so the origin plain text password can be parsed by the createUserToken();

        req.body.password = passwordHash;
        // modify req.body (for storing hash in db)

        const newUser = await User.create(req.body);

        if (newUser) {
            req.body.password = cachedPW;
            const authenticatedUserToken = createUserToken(req, newUser);
            res.status(201).json({
                user: newUser,
                token: authenticatedUserToken,
            });
        } else {
            throw new Error("Something went wrong")
        }
    } catch (err) {
        console.log(res.status(400).json({ error: err.message }));
    }
};



async function login(req, res, next) {
    try {
        const loggingUser = req.body.username;
        const foundUser = await User.findOne({ username: loggingUser });
        const token = await createUserToken(req, foundUser);

        res.status(200).json({
            user: foundUser,
            token,
        });

    } catch (err) {
        console.log(res.status(401).json({ error: err.message }));
    }
}

async function logout(req, res, next) {
    try {
        res.status(200).json({
            token: ""
        })

    } catch (err) {
        console.log(res.status(400).json({ error: err.message }));
    }
};

module.exports = {
    signUp,
    login,
    logout
}

