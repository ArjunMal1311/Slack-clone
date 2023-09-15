"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "./ui/button";

const ActionButton = () => {

    const { onOpen } = useModal();

    return (
        <div className="space-x-4">
            <Button onClick={() => onOpen("createServer")}>Create a Server</Button>
            <Button onClick={() => onOpen("invite")}>Join Server</Button>
        </div>
    )
}

export default ActionButton