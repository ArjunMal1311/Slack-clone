import ChannelOptions from "@/components/channel-options";
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
            channels: {}
        }
    })

    if (!server) {
        return redirect('/chat')
    }

    return (
        <>

            <div className="mx-4 my-4">
                <ChannelOptions channels = {server.channels} />
            </div>

            <div className="mx-4 my-4">
                <ServerOptions server={server} />
            </div>
        </>
    )
}

export default serverIdPage