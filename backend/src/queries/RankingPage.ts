import { prisma } from "../utils/prisma";

export const getRankingPageQuery = (
  communityName: string,
  from: number,
  to: number
) =>
  prisma.$queryRawUnsafe(
    `
    Select
        *
    from
        "User_Ranking_${communityName}" r
    where
        r. "row_num" between $1
        and $2
    order by
        "row_num"
`,
    from,
    to
  );
