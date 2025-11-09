import { startSession, type ObjectId, type Types } from "mongoose";
import Enrollement from "../models/Enrollments.models";
import Courses from "../models/Course.model";

interface IStudentAndCourse {
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
}

export class EntrollmentsRepository {
  async findOneByStudentAndCourse({ studentId, courseId }: IStudentAndCourse) {
    return Enrollement.findOne({ studentId, courseId });
  }

  async createEnrollment({ studentId, courseId }: IStudentAndCourse) {
    const session = await startSession();

    let newEnrollment = null;

    try {
      session.startTransaction();
      newEnrollment = await Enrollement.create([{ studentId, courseId }], {
        session,
      });

      const courseUpdateResult = await Courses.findByIdAndUpdate(
        courseId,
        {
          $inc: { studentsEnrolled: 1 },
        },
        { session, new: true }
      );

      if (!courseUpdateResult) {
        throw new Error("Course not found or failed to update counter.");
      }

      await session.commitTransaction();
      return newEnrollment[0];
    } catch (error) {
      await session.abortTransaction();
      console.error("Transaction failed, rolling back:", error);
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getAllEnrolled(studentId: Types.ObjectId) {
    return Enrollement.find({ studentId }).populate("courseId").exec();
  }

  async unenrollFromCourse(
    studentId: Types.ObjectId,
    courseId: Types.ObjectId
  ) {
    const session = await startSession();

    try {
      session.startTransaction();
      const enrollmentResult = await Enrollement.deleteOne(
        { studentId, courseId },
        { session }
      );

      if (enrollmentResult.deletedCount === 0) {
        throw new Error(
          `Enrollment not found for student ${studentId} and course ${courseId}.`
        );
      }

      await Courses.findByIdAndUpdate(
        courseId,
        {
          $inc: {
            studentsEnrolled: -1,
          },
        },
        session
      );

      session.commitTransaction();
      return true;
    } catch (error) {
      session.abortTransaction();
      console.error("Transaction failed, rolling back:", error);
      throw error;
    } finally {
      session.endSession();
    }
  }
}
