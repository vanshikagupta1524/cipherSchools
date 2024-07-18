const User = require("../models/User");
const addNewUser = async (req, res) => {
    try{
        const {name, email, age, password} = req.body;
        const user = new User({name, email, age, password});
        await user.save();
        return res.status(201).send(user);
    } catch(err) {
        console.log(err);
        return res.status(500).send({message: "Login failed"});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findByEmialAndPasswordForAuth(email, password);
        console.info("User with this email successfully loged in.");
        return res.status(200).send(user);
    } catch(err) {
        console.log(err);
        return res.status(500).send({message: "Login failed"});
    }
};

module.exports = {addNewUser, loginUser};