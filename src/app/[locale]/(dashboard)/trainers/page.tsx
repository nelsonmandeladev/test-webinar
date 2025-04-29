import { listTrainingAction } from "@/actions/trainer-actions";
import { Button } from "@/components";
import { TrainerForm } from "@/components/forms/trainer-form";

export default async function Trainers() {

    const result = await listTrainingAction();
    const trainers = result?.response?.data ?? [];
    console.log({ trainers })

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-6">Trainers</h1>
                <TrainerForm />
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
                                Created at
                            </th>
                            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainers.map((trainer) => (
                            <tr key={trainer.id} className="border-b">
                                <td className="py-3 px-4">{trainer.name}</td>
                                <td className="py-3 px-4">
                                    {trainer?.training_subjects.join(", ")}
                                </td>
                                <td className="py-3 px-4">{trainer.location}</td>
                                <td className="py-3 px-4">
                                    <a
                                        href={`mailto:${trainer.email}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {trainer.email}
                                    </a>
                                </td>
                                <td className="py-3 px-4">{trainer.location}</td>
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
