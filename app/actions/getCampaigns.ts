import prisma from "@/app/libs/prismadb";

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export default async function getCampaigns() {
    try {
        const campaigns = await prisma.campaign.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        const shuffledCampaigns = campaigns.map((campaign) => ({
            ...campaign,
            createdAt: campaign.createdAt.toISOString(),
            startDate: campaign.startDate.toISOString(),
            endDate: campaign.endDate.toISOString()
        }))

        const SafeCampaigns = shuffleArray(shuffledCampaigns);

        return SafeCampaigns;
    } catch (error: any) {
        throw new Error(error);
    }
}