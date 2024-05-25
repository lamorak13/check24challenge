import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export const getSearchedRankingsQuery = (
  userName: string,
  communityName: string,
  query: string
) =>
  prisma.$queryRaw(Prisma.sql`
    Select
        u. "name",
        u. "points",
        Cast(
            rank() over(
                order by
                    "points" desc,
                    "registration_date" asc
            ) as Int
        ),
        Cast(row_number() over() as Int) row_num
    from
        "User" u
        join "belongsToCommunity" b on u. "name" = b. "userName"
    where
        b. "communityName" = ${communityName}
        and u. "name" like ${query}
`);
