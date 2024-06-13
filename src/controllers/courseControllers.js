const { StatusCodes } = require('http-status-codes');
const Course = require('../model/course');
const validator = require('validator');

const getAllCourses = async (req, res) => {
  try {
    const { typeId, univeristyId } = req.query;
    checkResponseLength = (message, courses) => {
      if (courses.length <= 0) {
        res.status(StatusCodes.NOT_FOUND).json({
          message: message,
        });
      } else {
        res.status(StatusCodes.OK).json({
          count: courses.length,
          course: courses,
        });
      }
    };

    if (typeId && univeristyId) {
      let courses = await Course.find({
        typeId: typeId,
        universityId: { $in: univeristyId },
      }).select('_id name');
      checkResponseLength('No valid resource for specified ID', courses);
    } else if (univeristyId && !typeId) {
      let courses = await Course.find({ typeID: { $in: typeId } })
      .select('_id name universityID')
      .populate('universityId', 'name');
      checkResponseLength('No valid resource for specified IDs', courses);
    } else {
      const allCourses = await Course.find()
      .select('_id name typeId universityId')
      .populate('typeId', ' _id name')
      .populate('universityId', '_id name');
      checkResponseLength('No valid resource found', allCourses);
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

//function to get one course type
const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id)
      .select('_id name typeID universityId')
      .populate('typeId', '_id name')
      .populate('universityId', '_id name');
    if (course) {
      res.status(StatusCodes.OK).json({ course });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No valid resource for specified Id',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const createCourse = async (req, res) => {
  try {
    const { name, typeId, universityId } = req.body;
    const nameIsValid = validator.isAlphanumeric(name, ['en-US'], {
      ignore: ' ',
    });

    if (name && typeId && universityId && nameIsValid) {
      const newCourse = new Course({
        name: name,
        typeId: typeId,
        universityId: universityId,
      });

      const course = await newCourse.save();

      res.status(StatusCodes.CREATED).json({
        message: 'Course has been created successfully',
        createdCourse: {
          _id: course._id,
          name: course.name,
          typeId: course.typeId,
          universityId: course.universityId,
        },
      });
    } else if (!nameIsValid) {
      throw new Error('name can only contain alphanumeric values');
    } else {
      throw new Error('name or typeId or universityId not provided');
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Course has not been created',
    });
  }
}

const editCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, typeId, universityId } = req.body;

    const nameIsValid = validator.isAlphanumeric(name, ['en-US'], {
      ignore: ' ',
    });

    if ((name && nameIsValid) || typeId || universityId) {
      const editedCourse = await Course.findByIdAndUpdate(id, {
        $set: {
          name: name, 
          typeId: typeId, 
          universityId: universityId
        }
      });

      if (editedCourse) {
        res.status(StatusCodes.OK).json({
          message: 'Course has been edited successfully',
          editedCourse: {
            _id: editedCourse._id,
            name: editedCourse.name,
            typeId: editedCourse.typeId,
            universityId: editedCourse.universityId,
          },
        });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({
          message: 'No valid resource for specified id',
        });
      }
    } else if (!nameIsValid) {
      throw new Error('name can only contain alphanumeric values');
    } else {
      throw new Error('name or typeId or universityId not provided');
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Course has not been edited',
    });
  }
}

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (deletedCourse) {
      res.status(StatusCodes.OK).json({
        message: 'Course has been deleted successfully',
        deletedCourse: {
          _id: deletedCourse._id,
          name: deletedCourse.name,
          typeId: deletedCourse.typeId,
          universityId: deletedCourse.universityId,
        },
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        message: 'No valid resource for specified Id',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Course has not been deleted',
    });
  }
};

module.exports = {
  getAllCourses, 
  getCourse,
  createCourse,
  editCourse,
  deleteCourse, 
}