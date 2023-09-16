"use client"

import { useModal } from '@/hooks/use-modal-store';
import { Channel, Server } from '@prisma/client'
import React from 'react'

interface ChannelProps {
    channels: Channel[];
    server: Server
}

const ChannelOptions = ({ channels, server }: ChannelProps) => {
    const { onOpen } = useModal();

    return (
        <div>
            {channels.map((channel) => (
                <div className="bg-blue-500 p-2 rounded-md shadow-md w-1/5 mx-4 my-4">
                    <p className="text-white font-bold">{channel.name}</p>
                    <p className="text-gray-400">{channel.type}</p>
                    <button onClick={() => onOpen("editChannel", { channel, server })}>Edit Channel</button>
                </div>
            ))}
        </div>
    )
}

export default ChannelOptions