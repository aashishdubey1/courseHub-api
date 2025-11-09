import type { Request, Response } from "express";
import { EntrollmentsRepository } from "../repositories/enrollerments.repository";
import { isValidObjectId, Types } from "mongoose";
import { CourseRepository } from "../repositories/course.repository";

const enrollmentRepository = new EntrollmentsRepository();
const courseRepository = new CourseRepository();

export async function enrollCourse(req: Request, res: Response) {
  const userId = req.user?.userId as string;
  const courseId = req.params.courseId as string;

  console.log({ userId, courseId });

  if (!isValidObjectId(userId) || !isValidObjectId(courseId)) {
    res.status(400).json({
      success: "false",
      message: "Invalid ID format for user or course.",
    });
  }

  const studentObjectId = new Types.ObjectId(userId);
  const courseObjectId = new Types.ObjectId(courseId);

  const isCourseExists = await courseRepository.getCourseById(courseObjectId);

  if (!isCourseExists)
    return res
      .status(404)
      .json({ success: false, message: "Course not exists" });

  const enrollment = await enrollmentRepository.findOneByStudentAndCourse({
    studentId: studentObjectId,
    courseId: courseObjectId,
  });

  if (enrollment)
    return res
      .status(400)
      .json({ success: false, message: "Already enrolled in course" });

  const newEnrollment = await enrollmentRepository.createEnrollment({
    studentId: studentObjectId,
    courseId: courseObjectId,
  });

  if (!newEnrollment)
    return res
      .status(500)
      .json({ success: false, message: "Error while enrolling course" });

  res.status(200).json({ success: true, data: newEnrollment });
}

export async function getAllEnrolledCourse(req: Request, res: Response) {
  const studentId = req.user?.userId as string;

  const studentObjectId = new Types.ObjectId(studentId);

  const enrolledCourses = await enrollmentRepository.getAllEnrolled(
    studentObjectId
  );

  const courses = enrolledCourses.map((record, i) => record.courseId);

  res.status(200).json({ success: false, courses });
}

export async function unenrollCourse(req: Request, res: Response) {
  const courseId = req.params.courseId;
  const studentId = req.user?.userId;

  const courseObjectId = new Types.ObjectId(courseId);
  const studentObjectId = new Types.ObjectId(studentId);

  const isCourseExists = await courseRepository.getCourseById(courseObjectId);

  if (!isCourseExists)
    return res
      .status(404)
      .json({ success: false, message: "course not exist" });

  try {
    const unerolledFromCourse = await enrollmentRepository.unenrollFromCourse(
      studentObjectId,
      courseObjectId
    );
    res
      .status(200)
      .json({ success: true, message: "Successfully unenrolled from course." });
  } catch (error: any) {
    console.error("Unenrollment failed:", error);
    if (error.message && error.message.includes("Enrollment not found")) {
      return res.status(404).json({
        success: false,
        message: "You are not currently enrolled in this course.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred during unenrollment.",
    });
  }

  res.status(200).json({ success: true, message: "Unenrolled from course" });
}
