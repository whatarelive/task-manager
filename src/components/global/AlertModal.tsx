import { type FC, memo } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

interface Props {
    title: string;
    message: string;
    children: React.ReactNode;
}

export const AlertModal: FC<Props> = memo(({ title, message, children }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" size="icon" className="items-center">
                    <Trash2 className="w-6 h-6"/>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{ title }</DialogTitle>
                    <DialogDescription>
                        { message } 
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-2 justify-end">
                    { children }
                    
                    <DialogClose variant="outline">
                        Cancelar
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
})
