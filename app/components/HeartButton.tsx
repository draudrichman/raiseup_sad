'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { SafeUser } from "@/app/types";

import ClientOnly from "./ClientOnly";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
    campaignId: string
    currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
    campaignId,
    currentUser
}) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        campaignId,
        currentUser
    });


    return (
        <div
            onClick={toggleFavorite}
            className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart
                size={28}
                className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart
                size={24}
                className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
            />
        </div>
    );
}

export default HeartButton;