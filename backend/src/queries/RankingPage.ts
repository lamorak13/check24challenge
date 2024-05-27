import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export const getRankingPageQuery = (
  communityName: string,
  from: number,
  to: number
) =>
  prisma.$queryRaw(Prisma.sql`
    Select
        *
    from
        (
            Select
                u. "name",
                u. "points",
                u. "bets",
                u. "delta",
                Case
                    when u. "bets" = 0 then 0.0
                    else (u. "points" / Cast(u. "bets" as float))
                End as "ppb",
                Cast(
                    rank() over(
                        order by
                            "points" desc
                    ) as Int
                ),
                Cast(
                    row_number() over(
                        order by
                            "points" desc,
                            "registration_date" asc
                    ) as Int
                ) row_num
            from
                "User" u
                join "belongsToCommunity" b on u. "name" = b. "userName"
            where
                b. "communityName" = ${communityName}
        ) x
    where
        x. "row_num" between ${from}
        and ${to}
`);
