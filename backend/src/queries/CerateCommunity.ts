import { prisma } from "../utils/prisma";

export const createCommunityQuery = (userName: string, communityName: string) =>
  prisma.$transaction([
    prisma.$executeRawUnsafe(
      `Insert into "Community" values ($1)`,
      communityName
    ),
    prisma.$executeRawUnsafe(
      `Insert into "belongsToCommunity" values ($1, $2)`,
      userName,
      communityName
    ),
    prisma.$executeRawUnsafe(
      `
      Create Materialized View "User_Ranking_${communityName}" as

      Select u. "name", u. "points", u. "bets", u. "delta", b."communityName",
          Case when u. "bets" = 0 then 0.0 else (u. "points" / Cast(u. "bets" as float)) End as "ppb",
          Cast(rank() over(order by "points" desc) as Int),
          Cast(row_number() over(order by "points" desc, "registration_date" asc) as Int) row_num
      from "User" u
      join "belongsToCommunity" b on u. "name" = b. "userName"
      where b."communityName" = '${communityName}'

      With Data
    `
    ),
    prisma.$executeRawUnsafe(
      `Create unique index "User_Ranking_${communityName}_Index" on "User_Ranking_${communityName}" ("name")`
    ),
  ]);
