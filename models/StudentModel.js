const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  courseTitle: String,
  studentId: String,
  absence: String,
  late: String,
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
  hw1: String,
  hw2: String,
  hw3: String,
  hw4: String,
  hw5: String,
  hw6: String,
  hw7: String,
  hw8: String,
  hw9: String,
  hw10: String,
  project1: String,
  project2: String,
  project3: String,
}, { timestamps: true });

const Post = mongoose.model('Student', StudentSchema);

module.exports = Post;