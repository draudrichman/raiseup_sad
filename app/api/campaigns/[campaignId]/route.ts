import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  campaignId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { campaignId } = params;

  if (!campaignId || typeof campaignId !== 'string') {
    throw new Error('Invalid ID');
  }

  const campaign = await prisma.campaign.deleteMany({
    where: {
      id: campaignId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(campaign);
}