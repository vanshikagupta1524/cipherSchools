const { model, Schema } = require("mongoose");
const { isEmail } = require("validator");
const { encryptPassword, checkPassword } = require("../bcrypt");
const { generateToken } = require("../jwt");

const UserSchema = new Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: {
        type: String, lowercase: true, trim: true, required: true, unique: true, validate: {
            validator(email) {
                return isEmail(email);
            },
        },
    },
    password: {
        type: String, required: true, trim: true, minlength: 8, validate: {
            validator(pass) {
                if (
                    pass.includes(" ") ||
                    pass.includes("\n") ||
                    pass.includes("\t")
                ) {
                    throw new Error("Password includes space/tab/newline charcaters.");
                }
                if (pass.toLowerCase().includes("password")) {
                    throw new Error("Password must not contain password.");
                }
                return true;
            },
        },
    },
    type: {
        type: String,
        enum: ["STUDENT", "LIBRARIAN"],
        default: "STUDENT"
    },
    tokens: {
        type: [{ token: String }],
    }
}, { timestamps: true });

UserSchema.statics.findByEmialAndPasswordForAuth = async (email, password) => {
    try {
        const user = await user.findOne({ email });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const encryptedPasswaord = user.password;
        const isMatch = await checkPassword(password, encryptPassword);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        console.log("Login successful");
        return user;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.modifiedPaths().includes("password")) {
        user.password = await encryptPassword(user.password);
    }
    next();
});


UserSchema.methods.generateToken = function () {
    const user = this;
    const token = generateToken(user);
    user.tokens.push({ token });
    user.save();
    return token;
};

UserSchema.methods.toJSON = function () {
    let user = this.toObject();
    delete user.tokens;
    return user;
};

const User = model("user", UserSchema);

module.exports = User;