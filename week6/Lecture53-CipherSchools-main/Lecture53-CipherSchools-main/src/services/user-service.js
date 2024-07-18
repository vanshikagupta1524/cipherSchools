const User = require("../models/user");
const InputValidationException = require("../exceptions/inputValidationException");

const addNewUser = async (user) => {
    try {
        user = new User(user);
        await user.save();
        console.log(`User with ID: ${user._id} was added in the database.`);
        const token = user.generateToken();
        return { user, token };
    } catch (err) {
        console.error(`Please enter valid fields. The error is: ${err}`);
        throw new InputValidationException(err.message);
    }
};

const loginUser = async ({ email, password }) => {
    const user = await User.findByEmialAndPasswordForAuth(email, password);
    console.info(`User with email: ${email} has logged in.`);
    const token = user.generateToken();
    return { user, token };
};

module.exports = { addNewUser, loginUser };