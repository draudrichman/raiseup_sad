import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getCampaigns from "../actions/getCampaigns";
import MyCampaignsClient from "./MyCampaignsClient";

const MyCampaignPage = async () => {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
        return <EmptyState
        title="Unauthorized"
        subtitle="Please login"
        />
    }
    const campaigns = await getCampaigns({ userId: currentUser?.id});

  if (campaigns.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No campaigns found"
          subtitle="Looks like you have not launched any campaigns."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <MyCampaignsClient
        campaigns={campaigns}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default MyCampaignPage;