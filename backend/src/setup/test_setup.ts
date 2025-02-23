import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const bettingGame = {
  home: "GER",
  away: "SCO",
  kickoff: "2024-06-14 19:00:00",
};

// List of games
const games = [
  { home: "HUN", away: "SUI", kickoff: "2024-06-15 13:00:00" },
  { home: "ESP", away: "CRO", kickoff: "2024-06-15 16:00:00" },
  { home: "ITA", away: "ALB", kickoff: "2024-06-15 19:00:00" },
  { home: "TBD", away: "NED", kickoff: "2024-06-16 13:00:00" },
  { home: "SLO", away: "DEN", kickoff: "2024-06-16 16:00:00" },
  { home: "SRB", away: "ENG", kickoff: "2024-06-16 19:00:00" },
  { home: "ROU", away: "TBD", kickoff: "2024-06-17 13:00:00" },
  { home: "BEL", away: "SVK", kickoff: "2024-06-17 16:00:00" },
  { home: "AUT", away: "FRA", kickoff: "2024-06-17 19:00:00" },
  { home: "TUR", away: "TBD", kickoff: "2024-06-18 16:00:00" },
  { home: "POR", away: "CZE", kickoff: "2024-06-18 19:00:00" },
  { home: "CRO", away: "ALB", kickoff: "2024-06-19 13:00:00" },
  { home: "GER", away: "HUN", kickoff: "2024-06-19 16:00:00" },
  { home: "SCO", away: "SUI", kickoff: "2024-06-19 19:00:00" },
  { home: "SLO", away: "SRB", kickoff: "2024-06-20 13:00:00" },
  { home: "DEN", away: "ENG", kickoff: "2024-06-20 16:00:00" },
  { home: "ESP", away: "ITA", kickoff: "2024-06-20 19:00:00" },
  { home: "SVK", away: "TBD", kickoff: "2024-06-21 13:00:00" },
  { home: "TBD", away: "AUT", kickoff: "2024-06-21 16:00:00" },
  { home: "NED", away: "FRA", kickoff: "2024-06-21 19:00:00" },
  { home: "TBD", away: "CZE", kickoff: "2024-06-22 13:00:00" },
  { home: "TUR", away: "POR", kickoff: "2024-06-22 16:00:00" },
  { home: "BEL", away: "ROU", kickoff: "2024-06-22 19:00:00" },
  { home: "SCO", away: "HUN", kickoff: "2024-06-23 19:00:00" },
  { home: "SUI", away: "GER", kickoff: "2024-06-23 19:00:00" },
  { home: "ALB", away: "ESP", kickoff: "2024-06-24 19:00:00" },
  { home: "CRO", away: "ITA", kickoff: "2024-06-24 19:00:00" },
  { home: "NED", away: "AUT", kickoff: "2024-06-25 16:00:00" },
  { home: "FRA", away: "TBD", kickoff: "2024-06-25 16:00:00" },
  { home: "ENG", away: "SLO", kickoff: "2024-06-25 19:00:00" },
  { home: "DEN", away: "SRB", kickoff: "2024-06-25 19:00:00" },
  { home: "SVK", away: "ROU", kickoff: "2024-06-26 16:00:00" },
];

export async function test_setup() {
  // Create the "Hellrider" community if it doesn't exist
  await prisma.community.upsert({
    where: { name: "Overall" },
    update: {},
    create: { name: "Overall" },
  });

  await prisma.$executeRaw`
      Create Materialized View "User_Ranking_Overall" as

      Select u. "name", u. "points", u. "bets", u. "delta", u. "registration_date",
          Case when u. "bets" = 0 then 0.0 else (u. "points" / Cast(u. "bets" as float)) End as "ppb",
          Cast(rank() over(order by "points" desc) as Int),
          Cast(row_number() over(order by "points" desc, "registration_date" asc) as Int) row_num
      from "User" u
      join "belongsToCommunity" b on u. "name" = b. "userName"
      where b."communityName" = 'Overall'

      With Data
    `;

  await prisma.$executeRaw`Create unique index "User_Ranking_Overall_Index" on "User_Ranking_Overall" ("name")`;

  await prisma.$executeRaw`
    CREATE OR REPLACE FUNCTION RefreshAllMaterializedViewsConcurrently(schema_arg TEXT DEFAULT 'public')
    RETURNS INT AS $$
        DECLARE
            r RECORD;
        BEGIN
            RAISE NOTICE 'Refreshing materialized view in schema %', schema_arg;
            FOR r IN SELECT matviewname FROM pg_matviews WHERE schemaname = schema_arg
            LOOP
                RAISE NOTICE 'Refreshing %.%', schema_arg, r.matviewname;
                EXECUTE 'REFRESH MATERIALIZED VIEW CONCURRENTLY "' || schema_arg || '"."' || r.matviewname || '"';
            END LOOP;

            RETURN 1;
        END
    $$ LANGUAGE plpgsql;
  `;

  let betGame = await prisma.game.create({
    data: {
      home: bettingGame.home,
      away: bettingGame.away,
      kickoff: new Date(bettingGame.kickoff),
    },
  });
  // Create games
  for (const game of games) {
    await prisma.game.create({
      data: {
        home: game.home,
        away: game.away,
        kickoff: new Date(game.kickoff),
      },
    });
  }

  // Generate users
  const users = [];
  for (let i = 0; i < 2000000; i++) {
    const name = `${Math.random().toString(36).substring(2, 20)} ${i}`;
    users.push(name);
    await prisma.user.create({
      data: {
        name: name,
        belongsToCommunity: {
          create: { communityName: "Overall" },
        },
      },
    });
  }

  // Generate bets for each user
  for (const user of users) {
    await prisma.bet.create({
      data: {
        homescore: Math.floor(Math.random() * 5), // Random homescore between 0 and 4
        awayscore: Math.floor(Math.random() * 5), // Random awayscore between 0 and 4
        gameId: betGame!.id,
        userName: user,
      },
    });
  }
}
