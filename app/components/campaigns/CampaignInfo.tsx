'use client';

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";

import dynamic from "next/dynamic";

import useCountries from "@/app/hooks/useCountries";

import Avatar from "../Avatar";
import CampaignCategory from "./CampaignCategory";
import { useState } from "react";

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface CampaignInfoProps {
    user: SafeUser,
    description: string;
    category: {
        icon: IconType,
        label: string;
        description: string;
    } | undefined
    locationValue: string;
    type: string;
}

const CampaignInfo: React.FC<CampaignInfoProps> = ({
    user,
    description,
    category,
    locationValue
}) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;

    const [expanded, setExpanded] = useState(false);
    const MAX_LENGTH = 200;


    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const truncatedDescription = description.slice(0, MAX_LENGTH);


    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div
                    className="text-xl font-semibold flex flex-row items-center gap-2">
                    <Avatar src={user?.image} />
                    <div>{user?.name} is organizing this fundraiser.</div>
                </div>
                <hr />
                <div className="my-3">
                    {category && (
                        <CampaignCategory
                            icon={category.icon}
                            label={category.label}
                            description={category.description}
                        />
                    )}
                </div>
                <hr />
                <Map center={coordinates} />
                <hr />
                <div className="text-lg font-light text-neutral-500 my-6 text-justify">
                    {expanded ? description : truncatedDescription}
                    {!expanded && description.length > MAX_LENGTH && (
                        <button className="text-blue-500 hover:underline" onClick={toggleExpanded}>
                            Read more
                        </button>
                    )}
                    {expanded && (
                        <button className="text-blue-500 hover:underline" onClick={toggleExpanded}>
                            Read less
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CampaignInfo;