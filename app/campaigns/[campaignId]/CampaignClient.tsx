'use client';

import Container from "@/app/components/Container";
import CampaignContribution from "@/app/components/campaigns/CampaignContribution";
import CampaignHead from "@/app/components/campaigns/CampaignHead";
import CampaignInfo from "@/app/components/campaigns/CampaignInfo";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeCampaign, SafeUser } from "@/app/types";
import { Contribution } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";

interface CampaignClientProps {
    contributions?: Contribution[];
    campaign: SafeCampaign & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
    noOfContributions?: number
}

const CampaignClient: React.FC<CampaignClientProps> = ({
    campaign,
    currentUser,
    noOfContributions
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();


    const [isLoading, setIsLoading] = useState(false);

    const onCreateContribution = useCallback((amount: Number) => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post('/api/contributions', {
            amount,
            campaignId: campaign?.id,
            campaignCreatorId: campaign?.userId
        })
            .then(() => {
                toast.success('Donation Received');
                // router.push('/trips');
                router.refresh();
            })
            .catch(() => {
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [campaign?.id, router, currentUser, loginModal, campaign?.userId])

    const category = useMemo(() => {
        return categories.find((item) => item.label === campaign.category);
    }, [campaign.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <div className="">
                        <CampaignHead
                            title={campaign.title}
                            imageSrc={campaign.imageSrc}
                            locationValue={campaign.locationValue}
                            id={campaign.id}
                            currentUser={currentUser}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <CampaignInfo
                            user={campaign.user}
                            type={campaign.type}
                            category={category}
                            description={campaign.description}
                            locationValue={campaign.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <CampaignContribution
                                onSubmit={(amount) => onCreateContribution(amount)}
                                disabled={isLoading}
                                startDate={campaign.startDate}
                                endDate={campaign.endDate}
                                currentAmount={campaign.currentAmount}
                                goalAmount={campaign.goalAmount}
                                noOfContributions={noOfContributions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default CampaignClient;