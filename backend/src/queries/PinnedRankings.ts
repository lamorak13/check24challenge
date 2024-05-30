import { prisma } from "../utils/prisma";

export const getPinnedRankinsgQuery = (
  userName: string,
  communityName: string
) =>
  prisma.$queryRawUnsafe(
    `
    Select
        *
    from
        "User_Ranking_${communityName}" r
    where
        exists (
            Select
                1
            from
                "Pin" p
            where
                p. "userName" = $1
                and p. "pinnedUserName" = r. "name"
                and p. "communityName" = $2
        )
    order by
        "row_num"
  `,
    userName,
    communityName
  );
