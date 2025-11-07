import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

const TODO_ITEMS = [
    {
        id: 1,
        todoItem: "Learn React",
        priority: "High",
        Mood: "😒",
        isDone: false,
        createdAt: new Date().toDateString(),
    },
    {
        id: 2,
        todoItem: "Learn Node.js",
        priority: "Medium",
        Mood: "😁",
        isDone: false,
        createdAt: new Date().toDateString(),
    },
    {
        id: 3,
        todoItem: "Learn Express.js",
        priority: "Low",
        Mood: "😶‍🌫️",
        isDone: false,
        createdAt: new Date().toDateString(),
    }
];

app.get("/todos", (req,res)=>{
    res.json({
        success: true,
        data: TODO_ITEMS,
        message: "Todo item feched successfully",
    });
});



const PORT = process.env.PORT || 5003

app.listen(PORT, ()=>{
    console.log(`Server is runningon port ${PORT}`);
});