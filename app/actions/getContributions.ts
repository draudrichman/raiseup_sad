import prisma from "@/app/libs/prismadb";

interface IParams {
  campaignId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getContributions(
  params: IParams
) {
  try {
    const { campaignId, userId, authorId } = params;

    const query: any = {};
        
    if (campaignId) {
      query.campaignId = campaignId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.campaign = { userId: authorId };
    }

    const contributions = await prisma.contribution.findMany({
      where: query,
      include: {
        campaign: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeContributions = contributions.map(
      (contribution) => ({
      ...contribution,
      createdAt: contribution.createdAt.toISOString(),
      campaign: {
          ...contribution.campaign,
          createdAt: contribution.campaign.createdAt.toISOString(),
          startDate: contribution.campaign.startDate.toISOString(),
          endDate: contribution.campaign.endDate.toISOString(),
      },
    }));

    return safeContributions;
  } catch (error: any) {
    throw new Error(error);
  }
}