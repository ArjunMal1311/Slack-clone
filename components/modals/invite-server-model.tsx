"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";


export const InviteServerModel = () => {
    const { isOpen, onClose, type, data } = useModal();


    const isModalOpen = isOpen && type === "inviteServer";

    const { server } = data;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [serverID, setServerID] = useState("")

    const inviteUrl = `${server?.id}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    useEffect(() => {
        if (server) {
            setServerID(server.id)
        }
    }, [server])



    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white rounded-lg p-6 w-96">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                        Join a Server
                    </DialogTitle>

                    <DialogDescription className="text-gray-600">
                        Join a server using serverID
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center mt-2 gap-x-2">
                    <Input 
                        value={serverID}
                    />
                    <Button disabled={isLoading} onClick={onCopy} size="icon">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    )
}