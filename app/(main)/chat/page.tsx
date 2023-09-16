import ActionButton from '@/components/action-button';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { SignInButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

const page = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return (
            <div>
                <h4>Please login to the slack platform</h4>
                <SignInButton />
            </div>
        );
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        },
        include: {
            members: {
                include: {
                    profile: true
                }
            }
        }
    });

    return (
        <div>
            {servers.length > 0 ? (
                <div className='px-4 mx-4 my-4'>
                    <h3 className="text-2xl font-bold">Your Servers</h3>
                    {servers.map((server) => (
                        <Link href={`/chat/servers/${server.id}`}>
                            <div key={server.id} className="bg-gray-400 p-4 rounded-lg shadow-md my-4 w-1/4 flex space-x-6 justify-center hover:bg-gray-300">
                                <h5>{server.id}</h5>
                                <h4 className="text-lg font-semibold ">{server.name}</h4>
                                <Image
                                    src={server.imageUrl}
                                    alt={`Server Image: ${server.name}`}
                                    width={50}
                                    height={70}
                                    className="rounded-2xl"
                                />
                            </div>
                            <div className="text-sm">
                                <h6 className="text-base font-semibold">Members:</h6>
                                <div className="rounded-md p-2">
                                    {server.members.map((member) => (
                                        <li key={member.id} className="inline-block mr-2 px-2 py-1 rounded-md bg-gray-300">
                                            {member.profile.name}
                                        </li>
                                    ))}
                                </div>
                            </div>
                        </Link>

                    ))}

                    <ActionButton />
                </div>
            ) : (
                <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <p className="text-lg mb-4">You are not connected to any server</p>
                        <ActionButton />
                    </div>
                </div>
            )}
        </div>
    );
};

export default page;
