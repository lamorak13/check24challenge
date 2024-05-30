import { prisma } from "../utils/prisma";

export const getRankingPreviewQuery = (
  userName: string,
  communityName: string
) =>
  prisma.$queryRawUnsafe(
    `
        With user_rank as (
            Select
                r. "row_num"
            from
                "User_Ranking_${communityName}" r
            where
                r. "name" = $1
        ),
        preview as (
            Select
                *
            from
                "User_Ranking_${communityName}" r
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
                        "User_Ranking_${communityName}"
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
                "User_Ranking_${communityName}" r
            where "row_num" <= case when (Select * from user_rank) between 1 and 4 then 6 else 7 - (Select count(*) from preview) end
        )
        order by
            "row_num"
    `,
    userName
  );
