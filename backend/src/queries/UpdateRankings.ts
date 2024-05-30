import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export const updateRankingsQuery = (gameId: string) =>
  prisma.$transaction([
    prisma.$executeRaw(Prisma.sql`
    with cp as (
        Select
            Case
                when g. "awayscore" = b. "awayscore"
                and g. "homescore" = b. "homescore" then 8
                when (g. "awayscore" - g. "homescore") = (b. "awayscore" - b. "homescore")
                and not(g. "homescore" = g. "awayscore") then 6
                when sign(g. "awayscore" - g. "homescore") = sign(b. "awayscore" - b. "homescore") then 4
                else 0
            End as points,
            b. "userName" as name
        from
            "Bet" b,
            "Game" g
        where
            g. "id" = uuid(${gameId})
            and b. "gameId" = g. "id"
    )
    Update
        "User" u
    set
        points = u. "points" + cp. "points",
        delta = u. "delta" + cp. "points",
        bets = u. "bets" +  1
    from
        cp
    where
        u. "name" = cp. "name"
    `),
    prisma.$queryRawUnsafe(`select RefreshAllMaterializedViewsConcurrently()`),
  ]);
