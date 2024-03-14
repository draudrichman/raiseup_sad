import { Campaign, Contribution, User } from "@prisma/client";

export type SafeCampaign = Omit<Campaign, "createdAt"> & {
  createdAt: string;
};

export type SafeContribution = Omit<
  Contribution, 
  "createdAt" | "startDate" | "endDate" | "campaign"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeCampaign;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
