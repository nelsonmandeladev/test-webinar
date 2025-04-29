import { listCoursesAction } from "@/actions/course-actions";
import { listTrainingAction } from "@/actions/trainer-actions";
import { Button } from "@/components";
import { AssignRemoveTrainerForm } from "@/components/forms/assign-remove-trainer-form";
import { CourseForm } from "@/components/forms/course-form";
import { format } from "date-fns"


export default async function Home() {
  const result = await listCoursesAction();
  const courses = result?.response?.data ?? [];

  const trainerResult = await listTrainingAction();
  const trainers = trainerResult?.response?.data ?? []
  return (
    <main className="">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-8">Courses</h1>
        <CourseForm />
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="w-full bg-gray-100 border-b">
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">Course Name</th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">Date</th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">Subject</th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">Location</th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">Trainer</th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} className="border-b">
              <td className="py-3 px-4">{course.name}</td>
              <td className="py-3 px-4">{format(course.date, "dd-MMM-yyyy")}</td>
              <td className="py-3 px-4">{course.subject}</td>
              <td className="py-3 px-4">{course.location}</td>
              <td className="py-3 px-4">
                {course.trainer ? (
                  <div>
                    <div className="font-semibold">{course.trainer.name}</div>
                    <div className="text-gray-600">{course.trainer.training_subjects.join(", ")}</div>
                    <div>
                      <a href={`mailto:${course.trainer.email}`} className="text-blue-500 hover:underline">
                        {course.trainer.email}
                      </a>
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-500">No trainer assigned</span>
                )}
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Button variant="outline">Edit</Button>
                  <Button variant="destructive">Delete</Button>
                  <AssignRemoveTrainerForm
                    course={course}
                    trainers={trainers}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
