import { SafeCampaign, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import CampaignCard from "@/app/components/campaigns/CampaignCard";

interface FavoritesClientProps {
    campaigns: SafeCampaign[],
    currentUser?: SafeUser | null,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    campaigns,
    currentUser
}) => {
    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="List of campaigns you favorited!"
            />
            <div
                className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {campaigns.map((campaign: any) => (
                    <CampaignCard
                        currentUser={currentUser}
                        key={campaign.id}
                        data={campaign}
                    />
                ))}
            </div>
        </Container>
    );
}

export default FavoritesClient;