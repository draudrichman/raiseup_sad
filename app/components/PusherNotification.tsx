'use client';

import { useEffect } from 'react';
import { pusherClient } from '../libs/pusher';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SafeUser } from '../types';
import { useRouter } from 'next/navigation';

interface PusherNotificationProps {
    currentUser?: SafeUser | null;
}

const PusherNotification: React.FC<PusherNotificationProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const playDonationSound = () => {
        const donationSound = new Audio('/sounds/sound2.mp3');
        donationSound.play().catch((error) => {
            console.error('Failed to play sound:', error);
        });
    };
    useEffect(() => {
        const channel = pusherClient.subscribe(currentUser?.id || "none");
        // const channel = pusherClient.subscribe("primary-channel");


        channel.bind('donation-notify', function (data: any) {

            // toast(currentUserID, {
            playDonationSound();
            toast(data.message, {
                position: "bottom-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            router.refresh();
        });

        return () => {
            channel.unbind_all();
            pusherClient.unsubscribe('my-channel');
        };
    }, [currentUser?.id, router]);

    return (
        <div>
            <ToastContainer
                position="bottom-right"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default PusherNotification;
