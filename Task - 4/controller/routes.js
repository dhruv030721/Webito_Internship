const express = require('express')

const { GetMarks } = require('../controller/getStudentMarks.controller.js')

const router = express.Router();

router.get("/get_student_result/:student_id", GetMarks);


module.exports = router;