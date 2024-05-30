import { prisma } from "../utils/prisma";

export const joinCommunityQuery = (userName: string, communityName: string) =>
  prisma.$transaction([
    prisma.$executeRawUnsafe(
      `Insert into "belongsToCommunity" values ($1, $2)`,
      userName,
      communityName
    ),
    prisma.$executeRawUnsafe(
      `Refresh Materialized view concurrently "User_Ranking_${communityName}" with data `
    ),
  ]);
