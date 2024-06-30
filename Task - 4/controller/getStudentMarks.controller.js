const { default: mongoose } = require('mongoose');
const marks = require('../model/marks.model.js');

exports.GetMarks = async (req, res) => {
    try {
        const { student_id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(student_id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID!"
            });
        }

        const studentID = new mongoose.Types.ObjectId(student_id);

        const Result = await marks.aggregate([
            {
                $match: { "student_id": studentID }
            },
            {
                $lookup: {
                    from: "students",
                    localField: "student_id",
                    foreignField: "_id",
                    as: "student_details"
                }
            },
            {
                $unwind: "$student_details"
            },
            {
                $unwind: "$result"
            },
            {
                $group: {
                    _id: "$student_id",
                    total_marks: { $sum: "$result.marks" },
                    count: { $sum: 1 },
                    name: { $first: "$student_details.name" }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    total_marks: 1,
                    avg_marks: { $divide: ["$total_marks", "$count"] },
                    percentage: { $round: [{ $divide: ["$total_marks", "$count"] }, 2] }
                }
            },
            {
                $addFields: {
                    name: "$name"
                }
            }, {
                $unset: ["avg_marks", "total_marks"]
            }
        ]);

        console.log(Result);

        if (Result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No marks found for the student ID."
            });
        }

        return res.status(200).json({
            success: true,
            data: Result[0]
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error!"
        });
    }
}
