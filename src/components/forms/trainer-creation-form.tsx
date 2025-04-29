import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"


const SUBJECTS = [
    {
        id: "reactjs",
        label: "ReactJS",
    },
    {
        id: "nextjs",
        label: "NextJS",
    },
    {
        id: "seo",
        label: "SEO",
    },
    {
        id: "python",
        label: "Python",
    },
    {
        id: "crypto",
        label: "Crypto",
    },
    {
        id: "web-design",
        label: "Web design",
    },
] as const

export function TrainerCreationForm() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"lg"}>
                    Add new trainer
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[500px] xl:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        Create new trainer
                    </DialogTitle>
                    <DialogDescription>
                        Use this form to add new trainer
                    </DialogDescription>
                </DialogHeader>
                <form action="">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="trainer-name" className="text-right">
                                Trainer name
                            </Label>
                            <Input
                                id="trainer-name"
                                placeholder="Janette doe"
                                name="name"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="trainer-email" className="text-right">
                                Trainer email
                            </Label>
                            <Input
                                id="trainer-email"
                                type="email"
                                name="email"
                                placeholder="janette@does.com"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="trainer-location" className="text-right">
                                Location
                            </Label>
                            <Input
                                id="trainer-location"
                                placeholder="Yaounde"
                                name="location"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="trainer-location" className="text-right">
                                Training subjects
                            </Label>
                            <div className="grid grid-cols-3 gap-4">
                                {SUBJECTS.map((subject) => (
                                    <div key={subject.id} className="flex items-center space-x-2">
                                        <Checkbox id={subject.id} />
                                        <Label htmlFor={subject.id}>{subject.label}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
