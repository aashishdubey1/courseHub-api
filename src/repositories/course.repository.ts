import type { Types } from "mongoose";
import type { ICourses } from "../models/Course.model";
import Courses from "../models/Course.model";
import type { IUser } from "../models/User.model";

export class CourseRepository {
  async createCourse(data: Partial<ICourses>) {
    return Courses.create(data);
  }

  async getCourseById(id: Types.ObjectId) {
    return Courses.findById(id);
  }

  async updateCourse(id: Types.ObjectId, data: Partial<IUser>) {
    return Courses.findByIdAndUpdate(id, data, { new: true });
  }

  async getAllCourse() {
    return Courses.find();
  }

  async deleteCourse(id: string) {
    return Courses.findByIdAndDelete(id);
  }
}
