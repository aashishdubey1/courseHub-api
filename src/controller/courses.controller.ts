import type { Request, Response } from "express";
import { CourseRepository } from "../repositories/course.repository";

const courseRepository = new CourseRepository();

export async function createCourse(req: Request, res: Response) {
  const course = await courseRepository.createCourse(req.body);

  if (!course)
    return res
      .status(505)
      .json({ success: false, message: "Error while creating course" });

  res.status(201).json({ success: true, message: " Course created", course });
}

export async function getAllCourses(req: Request, res: Response) {
  const courseList = await courseRepository.getAllCourse();
  res
    .status(200)
    .json({ success: true, message: "Courses fetched", courses: courseList });
}

export async function getCourseById(req: Request, res: Response) {
  const courseId = req.params.courseId as string;
  const course = await courseRepository.getCourseById(courseId);

  if (!course)
    return res.status(404).json({ success: false, message: "No course find" });

  res
    .status(200)
    .json({ success: true, message: "Course fetched success", course });
}

export async function updateCourse(req: Request, res: Response) {
  const courseId = req.params.courseId as string;

  const updatedCourse = await courseRepository.updateCourse(courseId, req.body);

  if (!updateCourse)
    return res
      .status(404)
      .json({ success: false, message: "Error while updating course" });

  res
    .status(200)
    .json({ success: true, message: "course updated", course: updateCourse });
}

export async function deleteCourse(req: Request, res: Response) {
  const courseId = req.params.courseId as string;

  const deletedCourse = await courseRepository.deleteCourse(courseId);

  if (!deletedCourse)
    res
      .status(404)
      .json({ success: false, message: "Error while deleting course" });

  res.status(200).json({ success: true, message: "Course Deleted" });
}
