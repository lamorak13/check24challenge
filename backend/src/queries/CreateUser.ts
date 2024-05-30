import { prisma } from "../utils/prisma";

export const createUserQuery = (userName: string) =>
  prisma.$transaction([
    prisma.$queryRawUnsafe(
      `Insert into "User" values ($1) returning "name", "points", "registration_date"`,
      userName
    ),
    prisma.$executeRawUnsafe(
      `Insert into "belongsToCommunity" values ($1, 'Overall')`,
      userName
    ),
    prisma.$executeRawUnsafe(
      `Refresh Materialized view concurrently "User_Ranking_Overall" with data`,
      userName
    ),
  ]);
