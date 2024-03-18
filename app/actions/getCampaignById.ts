import prisma from "@/app/libs/prismadb";

interface IParams {
    campaignId?: string;
}

export default async function getCampaignById(
  params: IParams
) {
  try {
    const { campaignId } = params;

    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },
      include: {
        user: true
      }
    });

    if (!campaign) {
      return null;
    }

    return {
      ...campaign,
      createdAt: campaign.createdAt.toString(),
      startDate: campaign.startDate.toString(),
      endDate: campaign.endDate.toString(),
      user: {
        ...campaign.user,
        createdAt: campaign.user.createdAt.toString(),
        updatedAt: campaign.user.updatedAt.toString(),
        emailVerified: campaign.user.emailVerified?.toString() || null,
      }
    };
  } catch (error: any) {
    throw new Error(error);
  }
}