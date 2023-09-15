"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { FileUpload } from "../file-upload";

const formSchema = z.object({
    serverId: z.string().length(24, {
        message: "Server ID length should be of length 24"
    })
});

export const InviteModel = () => {
    const { isOpen, onClose, type } = useModal();
    const router = useRouter();

    const isModalOpen = isOpen && type === "invite";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            serverId: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onsubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.patch(`/api/join/${value.serverId}`);

            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white rounded-lg p-6 w-96">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                        Join a Server
                    </DialogTitle>

                    <DialogDescription className="text-gray-600">
                        Join a server using serverID
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onsubmit)}>
                        <div>
                            <FormField
                                control={form.control}
                                name="serverId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold text-gray-700">
                                            Server ID
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 py-2 px-3"
                                                placeholder="Enter server ID"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="px-6 py-4">
                            <Button
                                variant="secondary"
                                disabled={isLoading}
                                className={`px-4 py-2 text-white ${isLoading
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                    } rounded-md transition duration-300`}
                            >
                                Submit
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}