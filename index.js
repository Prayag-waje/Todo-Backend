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

app.post("/todos", (req,res)=>{
    // console.log('Request Body', req.body);
    const {TodoItem, priority, Mood} = req.body;

    const todoobf = {
        id: TODO_ITEMS[TODO_ITEMS.length - 1].id + 1,
        todoItem: TodoItem,
        priority: priority,
        Mood: Mood,
        isDone: false,
        createdAt: new Date().toDateString(),
    }

    TODO_ITEMS.push(todoobf);

    res.json({
        success: true,
        data: TODO_ITEMS,
        message: "Todo item added successfully"
    });
});

app.get("/todos/:id", (req, res)=>{
    
    const {id} = req.params;

    const todoItem = TODO_ITEMS.find((item)=>{
        if(item.id == id) return item;
    });

    if(todoItem){
        res.json({
            success: true,
            data: todoItem,
            message: "Todo item fetched successfully",
        });
    } else{
        res.json({
            success:  false,
            message: "Todo item not found",
        })
    }
})

app.delete("/todos/:id", (req,res)=>{
    const {id} = req.params;

    const index = TODO_ITEMS.findIndex((item)=>{
        if(item.id == id) return true;
    });

    if(index === -1){
        res.json({
            success: false,
            message: "Todo item not found",
        });
    } else{
        TODO_ITEMS.splice(index, 1);
        res.json({
            success: true,
            data: TODO_ITEMS,
            message: "Todo item deleted successfully",
        });
    }       
})

app.get("/todos/search", (req,res)=>{
    const {item, priority} = req.query;

    const filterItem = TODO_ITEMS.filter((itemObj)=>{
        if (itemObj.todoItem.toLowerCase().includes(item.toLowerCase()) && 
            itemObj.priority.toLowerCase() == priority.toLowerCase()){
            return true;
        }
        return true;
    });
    res.json({
        success:true,
        data: filterItem,
        message: "filtered todo item fetched seccussfully",
    })
})



app.get("/health", (erq, res)=>{
    res.json({
        success: true,
        message: "Server is healthy",
    })
})

const PORT = process.env.PORT || 5003

app.listen(PORT, ()=>{
    console.log(`Server is runningon port ${PORT}`);
});