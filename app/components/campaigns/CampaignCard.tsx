'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeCampaign, SafeContribution, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Button from "../Button";
import Image from "next/image";
import HeartButton from "../HeartButton";
import ProgressBar from "@ramonak/react-progress-bar";
import { FaClock } from "react-icons/fa6";



interface CampaignCardProps {
    data: SafeCampaign;
    contribution?: SafeContribution;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
};

const CampaignCard: React.FC<CampaignCardProps> = ({
    data,
    contribution,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser
}) => {

    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId)
    }, [disabled, onAction, actionId]);

    const amount = useMemo(() => {
        if (contribution) {
            return {
                contributionAmount: contribution.amount,
                goalAmount: data.goalAmount,
                currentAmount: data.currentAmount
            };
        }

        return {
            goalAmount: data.goalAmount,
            currentAmount: data.currentAmount,
            percentage: data.currentAmount / data.goalAmount * 100
        };
    }, [contribution, data.goalAmount, data.currentAmount]);

    const daysRemaining = useMemo(() => {
        const remainingTime = new Date(data.endDate).getTime() - new Date().getTime();
        const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        return remainingDays >= 0 ? remainingDays : -1;
    }, [data.endDate]);

   

    return (
        <div
            onClick={() => router.push(`/campaigns/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            {/* <div className="flex flex-col gap-2 w-full group-hover:scale-105 transition border-x border-y "> */}
            <div className="flex flex-col gap-2 w-full group-hover:scale-105 transition group-hover:border-x group-hover:border-y">
                <div className="aspect-square w-full relative overflow-hidden rounded-sm">
                    <Image
                        fill
                        className="object-cover h-full w-full "
                        src={data.imageSrc}
                        alt="Campaign Image"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            campaignId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="mx-3">
                    <div className="font-bold text-1xl text-green-600 -mb-1">
                        {location?.label}
                    </div>

                    <div className="font-bold text-lg truncate">
                        {data.title}
                    </div>

                    <div className="font-light text-neutral-500 mb-5">
                        {data.category}
                    </div>

                    <div className="flex justify-between">
                        <div className="font-semibold truncate">
                            ৳{amount.currentAmount.toLocaleString()} raised of ৳{amount.goalAmount.toLocaleString()}
                        </div>
                        <div className="text-right right-0">
                            {Math.floor(amount.percentage ?? 0)}%
                        </div>
                    </div>

                    <div>
                        <ProgressBar
                            completed={amount.percentage ?? 0}
                            baseBgColor="#e7e5e4"
                            bgColor="#34ca96"
                            isLabelVisible={false}
                            animateOnRender={true}
                            height="8px"
                            borderRadius="2px"
                        />
                    </div>
                    <div className="flex items-center text-neutral-500 mt-2 text-sm mb-5">
                        <FaClock size={16} className="m-0" />
                        <div className="ml-2 mt-0 mb-0">
                            {daysRemaining === -1 ? "Ended" : `${daysRemaining} days left`}
                        </div>
                    </div>


                </div>

                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    );
}

export default CampaignCard;