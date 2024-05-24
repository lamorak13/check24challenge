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
                            "points" desc,
                            "registration_date" asc
                    ) as Int
                ),
                Cast(row_number() over() as Int) row_num,
                Case
                    when exists (
                        Select
                            1
                        from
                            "Pin" p
                        where
                            p. "userName" = ${userName}
                            and p. "pinnedUserName" = u. "name"
                            and p. "communityName" = ${communityName}
                    ) then true
                    else false
                End as pinned
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
