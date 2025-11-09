import { Schema, model, Document, Types } from "mongoose";

export interface IEnrollments extends Document {
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
  purchaseDate: Date;
}

const enrollmentSchema = new Schema<IEnrollments>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    purchaseDate: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const Enrollement = model<IEnrollments>("Enrollment", enrollmentSchema);

export default Enrollement;
