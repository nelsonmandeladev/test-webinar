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

export function CourseCreationForm() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"lg"}>
                    Add new course
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[500px] xl:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        Create new Course
                    </DialogTitle>
                    <DialogDescription>
                        Use this form add new course
                    </DialogDescription>
                </DialogHeader>
                <form action="">
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-name" className="text-right">
                                Course name
                            </Label>
                            <Input
                                id="course-name"
                                placeholder="Master nextjs SEO"
                                name="name"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-date" className="text-right">
                                Course date
                            </Label>
                            <Input
                                id="course-date"
                                type="date"
                                name="date"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-subject" className="text-right">
                                Subject
                            </Label>
                            <Input
                                id="course-subject"
                                placeholder="Nextjs"
                                name="subject"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-location" className="text-right">
                                Location
                            </Label>
                            <Input
                                id="course-location"
                                placeholder="Yaounde"
                                name="location"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-notes" className="text-right">
                                Note
                            </Label>
                            <Input
                                id="course-notes"
                                placeholder="100"
                                name="notes"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-participant" className="text-right">
                                Total participants
                            </Label>
                            <Input
                                id="course-participant"
                                placeholder="20"
                                type="number"
                                name="participants"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-base-price" className="text-right">
                                Base price in USD
                            </Label>
                            <Input
                                id="course-base-price"
                                placeholder="100"
                                type="number"
                                name="price"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="course-trainer-price" className="text-right">
                                Trainer price in USD
                            </Label>
                            <Input
                                id="course-trainer-price"
                                placeholder="100"
                                type="number"
                                name="trainer_price"
                            />
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
