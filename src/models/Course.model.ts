import { Document, Schema, model, type ObjectId } from "mongoose";

export interface ICourses extends Document {
  title: string;
  description: string;
  price: number;
  rating: number;
  ratingCount: number;
  instructor: ObjectId;
  studentsEnrolled: number;
}

const courseSchema = new Schema<ICourses>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minLength: 3,
      maxlength: 120,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minLength: 25,
      maxlength: 2000,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      max: 99999,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0.0,
      max: 5,
      default: 0,
    },
    ratingCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    studentsEnrolled: {
      type: Number,
      min: 0,
      default: 0,
      index: true,
    },
  },
  { timestamps: true }
);

const Courses = model<ICourses>("Course", courseSchema);

export default Courses;
