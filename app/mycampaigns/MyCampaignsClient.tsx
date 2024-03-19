'use client';

import { SafeCampaign, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import CampaignCard from "@/app/components/campaigns/CampaignCard";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface MyCampaignsClientProps {
    campaigns: SafeCampaign[],
    currentUser?: SafeUser | null,
}

const MyCampaignsClient: React.FC<MyCampaignsClientProps> = ({
    campaigns,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onDelete = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/campaigns/${id}`)
            .then(() => {
                toast.success('Campaign deleted');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router]);
    return (
        <Container>
            <Heading
                title="Your Campaigns"
            // subtitle="List of your campaigns"
            />
            <div
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {campaigns.map((campaign: any) => (
                    <CampaignCard
                        key={campaign.id}
                        data={campaign}
                        actionId={campaign.id}
                        onAction={onDelete}
                        disabled={deletingId === campaign.id}
                        actionLabel="Delete campaign"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default MyCampaignsClient;