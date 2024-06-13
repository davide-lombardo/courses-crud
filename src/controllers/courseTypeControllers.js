const CourseType = require('../model/course-type');
const { StatusCodes } = require('http-status-codes');
const validator = require('validator');

const getCourseType = async (req, res) => {
  try {
    const { id } = req.params;
    const courseType = await CourseType.findById(id).select("_id name");
    if (courseType) {
      res.status(StatusCodes.OK).json(courseType);
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No valid resource for specified ID" });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const modifyCourseType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const nameIsValid = validator.isAlphanumeric(name, ["en-US"], {
      ignore: " ",
    });
    if (name && nameIsValid) {
      const modifiedCourseType = await CourseType.findByIdAndUpdate(id, {
        $set: { name: req.body.name },
      });
      if (modifiedCourseType) {
        res.status(StatusCodes.OK).json({
          message: "Course type has been modified",
          modifiedCourseType: {
            _id: modifiedCourseType._id,
            name: modifiedCourseType.name,
          },
        });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({
          message: "No valid resource for specified ID",
        });
      }
    } else if (!nameIsValid) {
      throw new Error("New name can only contain alpha numeric values");
    } else {
      throw new Error("New name not provided");
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Course type has not been modified",
    });
  }
};


const deleteCourseType = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourseType = await CourseType.findByIdAndDelete(id);
    if (deletedCourseType) {
      res.status(StatusCodes.OK).json({
        message: "Course type has been deleted successfully",
        deletedCourseType: {
          _id: deletedCourseType._id,
          name: deletedCourseType.name,
        },
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No valid resource for specified ID",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Course type has not been deleted",
    });
  }
};

const getAllCourseTypes = async (req, res) => {
  try {
    const allCourseType = await CourseType.find().select("_id name");
    if (allCourseType.length <= 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "No resources found",
      });
    } else {
      res.status(StatusCodes.OK).json({
        count: allCourseType.length,
        courseType: allCourseType,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const createCourseType = async (req, res) => {
  try {
    const { name } = req.body;
    const nameIsValid = validator.isAlphanumeric(name, ["en-US"], {
      ignore: " ",
    });
    if (name && nameIsValid) {
      const newCourseType = new CourseType({
        name: name,
      });
      const courseType = await newCourseType.save();
      res.status(StatusCodes.CREATED).json({
        message: "Course type created successfully",
        createdCourseType: { _id: courseType._id, name: courseType.name },
      });
    } else if (!nameIsValid) {
      throw new Error("name can only contain alpha numeric values");
    } else {
      throw new Error("name not provided");
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Course type has not been created",
    });
  }
};

module.exports = {
  getAllCourseTypes,
  getCourseType,
  createCourseType, 
  modifyCourseType, 
  deleteCourseType
}