"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useModal } from "@/hooks/use-modal-store"
import { Server } from "@prisma/client"


interface ServerProps {
    server: Server
}

export default function ComboboxDemo({ server }: ServerProps) {
    const frameworks = [
        {
            value: "Invite",
            label: "Invite",
            onClick: () => onOpen("inviteServer", { server })
        },
        {
            value: "Update Server",
            label: "Update Server",
            onClick: () => onOpen("updateServer", { server })
        },
        {
            value: "Add Channel",
            label: "Add Channel",
        },
        {
            value: "Leave Server",
            label: "Leave Server",
            onClick: () => onOpen("deleteServer", { server })

        },
    ];

    const { onOpen } = useModal();


    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Server Options"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search" />
                    <CommandEmpty>No Option</CommandEmpty>
                    <CommandGroup>
                        {frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                onSelect={() => {
                                    if (framework.onClick) {
                                        framework.onClick();
                                    }
                                    setOpen(false);
                                }}
                            >
                                {framework.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
