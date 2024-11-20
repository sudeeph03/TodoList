import express from "express";
import {
    signInUser,
    signUpUser,
    getTodos,
    newTodo,
    updateTodo,
    deleteTodo,
    checkUser,
} from "./dbroutes.js";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        users: users,
    });
});

app.post("/signup", signUpUser);

app.post("/signin", signInUser);

app.use(checkUser);

app.get("/todos", getTodos);

app.post("/todos", newTodo);

app.put("/todos", updateTodo);

app.delete("/todos", deleteTodo);

app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});
