import { Button } from "@/components";
import { TrainerCreationForm } from "@/components/forms/trainer-creation-form";

const TRAINERS = [
    {
        id: "1",
        trainerName: "Jane Doe",
        trainerSubjects: ["React.js", "Next.js"],
        trainerLocation: "Stuttgart, Germany",
        trainerEmail: "jane.doe@example.com",
    },
]
export default function Trainers() {

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-6">Trainers</h1>
                <TrainerCreationForm />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="w-full bg-gray-100 border-b">
                            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                                Trainer Name
                            </th>
                            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                                Subjects
                            </th>
                            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                                Location
                            </th>
                            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                                Email
                            </th>
                            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {TRAINERS.map((trainer) => (
                            <tr key={trainer.id} className="border-b">
                                <td className="py-3 px-4">{trainer.trainerName}</td>
                                <td className="py-3 px-4">
                                    {trainer.trainerSubjects.join(", ")}
                                </td>
                                <td className="py-3 px-4">{trainer.trainerLocation}</td>
                                <td className="py-3 px-4">
                                    <a
                                        href={`mailto:${trainer.trainerEmail}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {trainer.trainerEmail}
                                    </a>
                                </td>
                                <td className="py-3 px-4 flex space-x-2">
                                    <Button variant={"outline"}>
                                        Edit
                                    </Button>
                                    <Button variant={"destructive"}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
