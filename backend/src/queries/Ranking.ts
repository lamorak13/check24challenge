import { prisma } from "../utils/prisma";

export const getRankingQuery = (userName: string, communityName: string) =>
  prisma.$queryRawUnsafe(
    `
    Select
        *
    from
        "User_Ranking_${communityName}" r
    where
        r. "row_num" < 4
        or r. "row_num" = (
            Select
                count(*)
            from
                "User_Ranking_${communityName}"
        )
        or r. "name" = $1
    order by
        "row_num"
`,
    userName
  );
