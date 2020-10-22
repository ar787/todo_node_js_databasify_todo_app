const  Todo = require("./models/Todo")

module.exports.get = async (req, res) => {  
    const todos = await Todo.find({})
    res.status(200).json({
        success: "true", 
        data:todos  
    })
}

module.exports.post = async (req, res) => {
    const todo = await new Todo({
            title: req.body.title
        })
    await todo.save()
    const todos = await Todo.find({})
    res.status(200).json({
        success: "true", 
        data:todos  
    })
} 

module.exports.delete = async(req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Deleted : ", docs); 
        }
    })
    const todos = await Todo.find({})
    res.status(200).json({
        success: "true", 
        data:todos  
    })
}

module.exports.put = async (req, res) => {

    const todo = await Todo.findByIdAndUpdate(req.params.id, {title: req.body.title}, function (err, docs) { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Updated User : ", docs); 
        } 
    })
    const todos = await Todo.find({})
    res.status(200).json({
        success: "true", 
        data:todos  
    })
}