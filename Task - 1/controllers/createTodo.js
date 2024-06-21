// import todo model
const Todo = require("../models/Todo");

// define route handler
exports.createTodo = async(req, res) => {
    try{
        // Extract title and description from request body
        const {title, description} = req.body;
        // Create a new todo obj and insert in database
        const response = await Todo.create({title, description}); 
        // Send a json response with a sucess flag
        res.status(200).json(
            {
                success:true,
                data:response,
                message: "Entry Created Successfully"
            }
        );
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success: false,
            data:"Internal server error",
            message:err.message,
        })
    }
    }
    