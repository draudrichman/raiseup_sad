'use client';

import ProgressBar from "@ramonak/react-progress-bar";
import { useMemo, useState } from "react";
import { FaClock } from "react-icons/fa6";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../Button";

interface CampaignContributionProps {
    onSubmit: (contributionAmount: number) => void;
    disabled?: boolean;
    startDate: string;
    endDate: string;
    currentAmount: number;
    goalAmount: number;
}

const CampaignContribution: React.FC<CampaignContributionProps> = ({
    onSubmit,
    disabled,
    startDate,
    endDate,
    currentAmount,
    goalAmount
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            contributionAmount: '',
        }
    });

    const percentage = useMemo(() => {
        return currentAmount / goalAmount * 100
            ;
    }, [goalAmount, currentAmount]);

    const daysRemaining = useMemo(() => {
        const remainingTime = new Date(endDate).getTime() - new Date().getTime();
        const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
        return remainingDays >= 0 ? remainingDays : -1;
    }, [endDate]);

    return (
        <div className="flex flex-col gap-2 w-full group-hover:scale-105 transition border-x border-y">
            <div className="mx-3 mt-5">
                <div className="flex justify-between">
                    <div className="font-semibold">
                        ৳{currentAmount.toLocaleString()} raised of ৳{goalAmount.toLocaleString()}
                    </div>
                    <div className="text-right right-0">
                        {Math.floor(percentage ?? 0)}%
                    </div>
                </div>

                <div>
                    <ProgressBar
                        completed={percentage ?? 0}
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
                <div className="p-4">
                    <Input
                        id="contributionAmount"
                        label=""
                        formatPrice
                        type="number"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <div className="mt-4">
                        <Button
                            disabled={disabled}
                            label="Donate"
                            onClick={handleSubmit(() => onSubmit(Number(watch('contributionAmount'))))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignContribution;