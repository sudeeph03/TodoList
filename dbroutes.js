import JWT from "jsonwebtoken";
const JWT_SECRET = "iLoveProgramming";

let users = [];
let tasks = [];
let userId = 0;

export function checkInputs(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (username == "" || password == "") {
        res.status(400).json({
            message: "Please fill the input boxes",
        });
        return;
    }

    req.username = username;
    req.password = password;
    next();
}

export async function signUpUser(req, res) {
    const userFound = users.find((user) => req.username == user.username);

    if (!userFound) {
        users.push({
            userId: userId + 1,
            username: req.username,
            password: req.password,
            role: "user",
        });

        userId++;

        return res.status(200).json({
            message: "Done!",
        });
    } else {
        return res.status(400).json({
            message: "User already exists!",
        });
    }
}

export async function signInUser(req, res) {
    const userFound = users.find(
        (user) => req.username == user.username && req.password == user.password
    );

    if (userFound) {
        const token = JWT.sign(
            { userId: userFound.userId, username: userFound.username },
            JWT_SECRET
        );
        userFound.token = token;

        return res.status(200).json({
            message: "Done!",
            token: token,
        });
    } else {
        return res.status(400).json({
            message: "Wrong Credentials!",
        });
    }
}

export async function checkUser(req, res, next) {
    const token = req.headers.token;
    const userFound = JWT.verify(token, JWT_SECRET);

    if (userFound) {
        req.user = userFound;
        next();
    } else {
        res.status(400).json({
            message: "Invalid Credentials!",
        });
    }
}

export async function getTodos(req, res) {
    const userTasks = tasks.filter((task) => task.userId === req.user.userId);

    res.send(userTasks);
}

export async function newTodo(req, res) {
    const taskId = req.body.taskId;
    const task = req.body.task;

    if (task == "") {
        return res.status(400).json({
            message: "Please enter a task!",
        });
    }

    tasks.push({
        userId: req.user.userId,
        taskId,
        task: task,
    });

    res.status(200).json({
        tasks,
    });
}

export async function updateTodo(req, res) {
    const taskId = req.body.taskId;
    const updatedTask = req.body.update;

    if (task == "") {
        return res.status(400).json({
            message: "Please enter a task!",
        });
    }

    const findTask = tasks.find(
        (task) => taskId == task.taskId && task.username == req.user.username
    );

    if (findTask) {
        findTask.task = updatedTask;

        res.json({
            message: "Done! Updated",
        });
    } else {
        res.json({
            message: "You fool",
        });
    }
}

export async function deleteTodo(req, res) {
    const taskToBeDeleted = req.body.taskId;

    const taskIndex = tasks.findIndex((task) => {
        task.taskId == taskToBeDeleted;
    });

    if (taskIndex) {
        tasks.splice(taskIndex, 1);

        res.json({
            message: "Done! Task Deleted!",
        });
    }
}
