import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export const getRankingQuery = (userName: string, communityName: string) =>
  prisma.$queryRaw(Prisma.sql`
    Select
        *
    from
        (
            Select
                u. "name",
                u. "points",
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
        x. "row_num" < 4
        or x. "row_num" = (
            Select
                count(*)
            from
                "User"
        )
        or x. "name" = ${userName}
`);
