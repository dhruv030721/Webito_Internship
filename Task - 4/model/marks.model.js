const mongoose = require('mongoose')

const markSchema = mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    result: [
        {
            subject: {
                type: String
            },
            marks: {
                type: Number
            }
        }
    ]
})

module.exports = mongoose.model("Marks", markSchema);