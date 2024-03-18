import getCampaignById from "@/app/actions/getCampaignById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import CampaignClient from "./CampaignClient";

interface IParams {
    campaignId?: string;
}

const CampaignPage = async ({ params }: { params: IParams }) => {
    const campaign = await getCampaignById(params);
    const currentUser = await getCurrentUser();

    if (!campaign) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <CampaignClient
                campaign={campaign}
                currentUser={currentUser}
                // contributions={contributions}
            />
        </ClientOnly>
    );
}

export default CampaignPage;