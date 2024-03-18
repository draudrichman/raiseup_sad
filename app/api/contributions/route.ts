import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    amount,
    campaignId,
    campaignCreatorId
   } = body;

   if (!campaignId || !amount) {
     return NextResponse.error();
    }
    
    const campaignAndContribution = await prisma.campaign.update({
    where: {
      id: campaignId
    },
    data: {
      contributions: {
        create: {
          userId: currentUser.id,
          amount: amount
        }
      },
      currentAmount:{
        increment: amount
      }
    }
  });

  const formatAmount = (amount: number) => {
    return amount.toLocaleString();
  };
  const formattedAmount = formatAmount(amount);


  await pusherServer.trigger(campaignCreatorId, "donation-notify", {
    message: `You have received a donation of ৳${formattedAmount} from ${currentUser.name}`
  });


  return NextResponse.json(campaignAndContribution);
}