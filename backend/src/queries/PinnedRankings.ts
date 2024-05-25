import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export const getPinnedRankinsgQuery = (
  userName: string,
  communityName: string
) =>
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
        exists (
            Select
                1
            from
                "Pin" p
            where
                p. "userName" = ${userName}
                and p. "pinnedUserName" = x. "name"
                and p. "communityName" = ${communityName}
        )
  `);
