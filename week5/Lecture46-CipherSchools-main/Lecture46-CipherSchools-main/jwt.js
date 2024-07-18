const jwt = require("jsonwebtoken");

const CS_SECRET_KEY = "CSSecretKey";

const generateToken = (payload) => {
    const token = jwt.sign(payload, CS_SECRET_KEY);
    return token;
};

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, CS_SECRET_KEY);
        return {isValidToken: true, payload};
    } catch (err) {
        console.error(err);
        return {isValidToken: false, payload: undefined};
    }
};

// console.log(generateToken({ name: "Virat"}));
console.log(verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmlyYXQiLCJpYXQiOjE3MjA0MjgxMTZ9.jgq1d9MgwhQxy8EmRH72__eTNSpESAI-jIxBvHKe7Ig"));

// module.exports = { generateToken, verifyToken };