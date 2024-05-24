import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export const getRankingPreviewQuery = (
  userName: string,
  communityName: string
) =>
  prisma.$queryRaw(Prisma.sql`
    With ranks as (
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
    ),
    user_rank as (
        Select
            r. "row_num"
        from
            ranks r
        where
            r. "name" = ${userName}
    ),
    preview as (
        Select
            *
        from
            ranks r
        where
            r. "row_num" between (
                Select
                    *
                from
                    user_rank
            ) - 1
            and (
                Select
                    *
                from
                    user_rank
            ) + 1
            or r. "row_num" = (
                Select
                    count(*)
                from
                    ranks
            )
    ) (
        Select
            *
        from
            preview
    )
    Union
    (
        Select
            *
        from
            ranks
        limit
            7 - (
                Select
                    count(*)
                from
                    preview
            )
    )
    order by
        "row_num"
`);
