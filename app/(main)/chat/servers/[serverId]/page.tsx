import ServerOptions from "@/components/server-options";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIDProps {
    params: {
        serverId: string
    }
}

const serverIdPage = async ({ params }: ServerIDProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,

            members: {
                some: {
                    profileId: profile.id
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: "general"
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })

    if (!server) {
        return redirect('/chat')
    }

    return (
        <>
            {server.channels.map((channel) => (
                <div>
                    {channel.name}
                </div>
            ))}


            <ServerOptions server={server} />
        </>
    )
}

export default serverIdPage