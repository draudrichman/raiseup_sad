import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request, 
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { 
    title,
    description,
    imageSrc,
    type,
    category,
    goalAmount,
    currentAmount,
    startDate,
    endDate,
    location,
   } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  // console.log("here");

  const campaign = await prisma.campaign.create({
    data: {
      title,
      description,
      imageSrc,
      type,
      category,
      goalAmount: parseInt(goalAmount, 10),
      currentAmount: parseInt(currentAmount, 10),
      startDate,
      endDate,
      locationValue: location.value,
      userId: currentUser.id
    }
  });

  return NextResponse.json(campaign);
}
