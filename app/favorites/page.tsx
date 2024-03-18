import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteCampaigns from "@/app/actions/getFavoriteCampaigns";

import FavoritesClient from "./FavoritesClient";

const CampaignPage = async () => {
  const campaigns = await getFavoriteCampaigns();
  const currentUser = await getCurrentUser();

  if (campaigns.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite campaigns."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient
        campaigns={campaigns}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default CampaignPage;