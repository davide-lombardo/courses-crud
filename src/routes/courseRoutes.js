const express = require('express');
const router = express.Router();

const {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  editCourse
} = require('../controllers/courseControllers');

router.get('/', getAllCourses);
router.post('/', createCourse);
router.get('/:id', getCourse);
router.delete('/:id', deleteCourse);
router.patch('/:id', editCourse);

module.exports = router;