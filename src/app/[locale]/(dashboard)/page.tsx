import { Button } from "@/components";
import { CourseCreationForm } from "@/components/forms/course-creation-form";

const sampleCourses = [
  {
    id: 1,
    name: "React.js Fundamentals",
    date: "2024-10-15",
    subject: "React.js",
    location: "Stuttgart",
    participants: 15,
    notes: "Introduction to React.js",
    price: 250,
    trainer: {
      name: "Jane Doe",
      trainingSubjects: ["React.js"],
      location: "Stuttgart",
      email: "jane.doe@example.com",
    },
  },
  {
    id: 2,
    name: "Node.js Basics",
    date: "2024-10-22",
    subject: "Node.js",
    location: "Stuttgart",
    participants: 10,
    notes: "Introduction to Node.js",
    price: 200,
    trainer: null,
  },
];

const sampleTrainers = [
  {
    id: 1,
    name: "Jane Doe",
    trainingSubjects: ["React.js"],
    location: "Stuttgart",
    email: "jane.doe@example.com",
  },
  {
    id: 2,
    name: "John Smith",
    trainingSubjects: ["Node.js"],
    location: "Stuttgart",
    email: "john.smith@example.com",
  },
];

export default function Home() {
  return (
    <main className="">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-8">Courses</h1>
        <CourseCreationForm />
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
          {sampleCourses.map((course) => (
            <tr key={course.id} className="border-b">
              <td className="py-3 px-4">{course.name}</td>
              <td className="py-3 px-4">{course.date}</td>
              <td className="py-3 px-4">{course.subject}</td>
              <td className="py-3 px-4">{course.location}</td>
              <td className="py-3 px-4">
                {course.trainer ? (
                  <div>
                    <div className="font-semibold">{course.trainer.name}</div>
                    <div className="text-gray-600">{course.trainer.trainingSubjects.join(", ")}</div>
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
                  {course.trainer ? (
                    <Button variant="secondary">Remove Trainer</Button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <select className="border border-gray-300 px-4 py-2 rounded-lg">
                        <option value="">Select Trainer</option>
                        {sampleTrainers.map((trainer) => (
                          <option key={trainer.id} value={trainer.id}>
                            {trainer.name}
                          </option>
                        ))}
                      </select>
                      <Button>Assign Trainer</Button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
