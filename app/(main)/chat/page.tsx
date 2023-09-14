import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { SignInButton } from '@clerk/nextjs';

const page = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return (
            <div>
                <h4>Please login to the slack platform</h4>
                <SignInButton />
            </div>
        )
    }

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })
    return (
        <div>
            {server ? <></> :
                <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <p className="text-lg mb-4">You are not connected to any server</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-4">Create a Server</button>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">Join a Server</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default page