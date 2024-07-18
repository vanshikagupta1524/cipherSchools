const User = require("../models/User");
const addNewUser = async (req, res) => {
    try {
        const { name, email, age, password } = req.body;
        const user = new User({ name, email, age, password });
        await user.save();
        const token = user.generateToken();
        return res.status(201).send({user, token});
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Login failed" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmialAndPasswordForAuth(email, password);
        const token = user.generateToken();
        console.info("User with this email successfully loged in.");
        return res.status(200).send({ user, token });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Login failed" });
    }
};

const deleteUser = async (req, res) => {
    const { user } = req;
    const userld = user._id;
    const deleteResult = await User.deleteOne({ _id: userld });
    if (!deleteResult.deletedCount) {
        console.error(`Delete failed! User with ID: ${userld} was not found. `);
        return res.status(404).send({
            message: `Delete failed! User with ID: ${userld} was not found.`,
        });
    }
    console.info(`Delete Success: User with ID: ${userld} was deleted`);
    return res.status(200).send({
        message: "Delete Success !"
    });
};

module.exports = { addNewUser, loginUser, deleteUser };