import { prisma } from "../utils/prisma";

export const getSearchedRankingsQuery = (
  communityName: string,
  query: string
) =>
  prisma.$queryRawUnsafe(
    `
    Select
        *
    from
        "User_Ranking_${communityName}" r
    where
        r. "name" like $1
    order by
        "row_num"
`,
    query
  );
