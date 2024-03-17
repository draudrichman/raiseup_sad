import { Campaign, Contribution, User } from "@prisma/client";

export type SafeCampaign = Omit<Campaign, "createdAt" | "startDate" | "endDate"> & {
  createdAt: string;
  startDate: string;
  endDate: string;
};

export type SafeContribution = Omit<Contribution, "createdAt" | "campaign"> & {
  createdAt: string;
  listing: SafeCampaign;
};

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
