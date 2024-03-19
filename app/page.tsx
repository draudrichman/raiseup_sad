import Container from "@/app/components/Container";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import getCampaigns, { ICampaignsParams } from "./actions/getCampaigns";
import CampaignCard from "./components/campaigns/CampaignCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps {
  searchParams: ICampaignsParams
}

const Home = async ({ searchParams }: HomeProps) => {
  const campaigns = await getCampaigns(searchParams);
  const currentUser = await getCurrentUser();

  if (campaigns.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }


  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {campaigns.map((campaign) => {
            return (
              <CampaignCard
                currentUser={currentUser}
                key={campaign.id}
                data={campaign}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;