const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const  app =express()

app.use(express.json())
app.use(cors())
// app.get("/", (req,res) => {
//     res.send("Hello Rufus")
// })

// let todos = [];

//connect mongodb
mongoose.connect('mongodb+srv://rufus090400:rufus090400@useraccount.iptnb.mongodb.net/Rufus?retryWrites=true&w=majority&appName=userAccount')
.then(() => {
    console.log('DB connected');
})
.catch((err)=> {
console.log(err);
})

//creating schema

const todoSchema =new mongoose.Schema({
    title: {
        required:true,
        type:String,
    },
    description:String
})

//create model
const todoModel = mongoose.model("todo",todoSchema)

// create a new todo items
app.post('/todos', async (req,res)=> {
const {title, description} = req.body 
// const newTodo = {
//     id:todos.length + 1,
//     title,
//     description
// };
// todos.push(newTodo)
// console.log(todos);
try {
    const newToDo = new todoModel({title,description})
    await newToDo.save()
    res.status(201).json({newToDo})

} catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
}
})

// Get all items 
app.get('/todos', async (re1,res) => {
    try {
      const todos=  await todoModel.find();
      res.json(todos)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message}) 
    }
})

//update a todo item
// :id parameter nu solluvanga params la id kodutha same koduknum
app.put('/todos/:id', async(req,res) => {
   try {
    const {title, description} = req.body;
    const id = req.params.id 
    const updateToDo = await todoModel.findByIdAndUpdate(
        id,
        {title, description},
        {new : true}
    )
    if(!updateToDo){
        return res.status(404).json({
            message:"Todo Not Found"})
    }
    res.json({updateToDo})
   } catch (error) {
    
   }
})


//Delete a todo item 
app.delete('/todos/:id',async(req,res)=> {
    try {
    const id = req.params.id;
    await todoModel.findOneAndDelete(id)
    res.status(204).end()
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

const port = 8000;
app.listen(port, (req,res) => {
    console.log("server connected "+port);
    
})