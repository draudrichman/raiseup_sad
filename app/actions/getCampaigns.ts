import prisma from "@/app/libs/prismadb";


export interface ICampaignsParams {
    userId?: string;
    locationValue?: string;
    type?: string;
    searchQuery?: string;
    category?: string;
}


export default async function getCampaigns(params: ICampaignsParams) {
    try {
        const { userId, locationValue, type, searchQuery, category } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (type) {
            query.type = type;
        }
        

        if (searchQuery) {
            query.OR = [
                { title: { contains: searchQuery, mode: 'insensitive' } },
                { description: { contains: searchQuery, mode: 'insensitive' } },
            ];
        }


        const campaigns = await prisma.campaign.findMany({
            where: query,
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