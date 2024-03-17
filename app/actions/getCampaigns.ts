import prisma from "@/app/libs/prismadb";

export default async function getCampaigns() {
    try {
        const campaigns = await prisma.campaign.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        const SafeCampaigns = campaigns.map((campaign) => ({
            ...campaign,
            createdAt: campaign.createdAt.toISOString(),
            startDate: campaign.startDate.toISOString(),
            endDate: campaign.endDate.toISOString()
        }))

        return SafeCampaigns;
    } catch (error: any) {
        throw new Error(error);
    }
}