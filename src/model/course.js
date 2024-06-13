const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  typeId: {
    type: Schema.Types.ObjectId,
    ref: 'CourseType',
    required: true,
  },
  universityId: {
    type: Schema.Types.ObjectId,
    ref: 'University',
    required: true,
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;