import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyA3Zg4nSVaSGkt_8oVHJWM3ADWfG_H0YAE");

async function runAIValidation(title: string, description: string, type: string): Promise<boolean> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `I'm running a crowdfunding platform. Reject a campaign if campaign type is non-profit but title, description sounds like it is a commercial campaign. If campaign type is commercial, dont reject it. Given the following details about a campaign, should I allow it to be launched? 
                  Campaign Type: ${type}
                  Title: ${title}
                  Description: ${description} 
                  Please reply with 'Yes' to allow the campaign, or 'No' to reject it.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  // console.log(text);

  return text.trim().toLowerCase() === 'yes';
}

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
  
  if (type === 'Non-profit') {
    const shouldAllowCampaign = await runAIValidation(title, description, type);
    if (!shouldAllowCampaign) {
      // console.log(shouldAllowCampaign);
      return NextResponse.json(false);
    }
  }

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
