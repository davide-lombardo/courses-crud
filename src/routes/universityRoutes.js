const express = require('express');
const router = express.Router();
const {
    getAllUniversities,
    createUniversity,
    deleteUniversity,
    modifyUniversity,
    getUniversity
} = require('../controllers/universityControllers');


router.get("/", getAllUniversities);
router.post("/", createUniversity);
router.patch("/:id", modifyUniversity);
router.delete("/:id", deleteUniversity);
router.get("/:id", getUniversity);



module.exports = router;