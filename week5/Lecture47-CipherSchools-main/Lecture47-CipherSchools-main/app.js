// const addNumbers = (...args) => {
//     let sum = 0;
//     args.forEach((arg) => (sum += arg));
//     return sum;
// };

// console.log(addNumbers(4, 5, 1, -2, 10, 5));

// const http = require("http");

// const server = http.createServer((req, res) => {
//     res.write("This is some response from your first Node.js server");
//     res.end();
// });

// server.listen(3000, () => {
//     console.log("Server is running.");
// });

require("./appMongoose");

const express = require("express");
const Task = require("./models/Task");
const useRouter = require("./routes/user-routes");
const app = express();

app.use(express.json());
app.use("/user", useRouter);

app.get("/", (req, res) => {
    res.send("This is some response from your first Node.js server");
});

app.get("/add", (req, res) => {
    let { a: firstNumber, b: secondNumber } = req.query;
    let sum = parseInt(firstNumber) + parseInt(secondNumber);
    res.send({
        sum
    });
});

app.post("/add-task", async (req, res) => {
    const task = new Task({ title: "Test Task", description: "Test Task Desc" });
    await task.save();
    return res.status(201).send({ message: "Saved" });
});

app.get("/get-tasks", async (req, res) => {
    const taskList = await Task.find();
    return res.status(200).send(taskList);
});

app.put("/update-task/:taskId", async (req, res) => {
    const { taskId } = req.params;
    const updateResult = await Task.updateOne({ _id: taskId }, { $set: { ...req.body }, });
    if (!updateResult.matchedCount) {
        return res.status(404).send({message: `Task with ID: ${taskId} was not found.`});
    }
    return res.status(200).send({message: "Update Success"});
});

app.delete("/delete-task/:taskId" , async (req, res) => {
    const { taskId } = req.params;
    const deleteResult = await Task.deleteOne({ _id: taskId });
    if (!deleteResult.deletedCount) {
        return res.status(404).send({message: `Task with ID: ${taskId} was not found.`});
    }
    return res.status(200).send({message: "Delete Success"});
});

app.listen(8080, () => {
    console.log("Server is running.");
});