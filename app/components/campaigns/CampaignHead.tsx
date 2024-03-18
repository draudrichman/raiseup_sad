'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface CampaignHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null
}

const CampaignHead: React.FC<CampaignHeadProps> = ({
    title,
    locationValue,
    imageSrc,
    id,
    currentUser
}) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.label}, ${location?.region}`}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                    alt="Image"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton
                        campaignId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    );
}

export default CampaignHead;