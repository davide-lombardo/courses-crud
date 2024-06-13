const express = require('express');
const {
    createCourseType,
    deleteCourseType,
    getAllCourseTypes,
    getCourseType,
    modifyCourseType
} = require('../controllers/courseTypeControllers');

const router = express.Router();

router.get('/', getAllCourseTypes);
router.post('/', createCourseType);
router.delete(':id', deleteCourseType);
router.patch("/:id", modifyCourseType);
router.get("/:id", getCourseType);

module.exports = router;