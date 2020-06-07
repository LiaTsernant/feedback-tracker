const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  courseTitle: String,
  studentId: String,
  photo: String,
  Week1: String, 
  Week2: String,
  Week3: String,
  Week4: String,
  Week5: String,
  Week6: String,
  Week7: String,
  Week8: String,
  Week9: String,
  Week10: String,
  Week11: String,
  Week12: String,
}, { timestamps: true });

const Post = mongoose.model('Student', StudentSchema);

module.exports = Post;
