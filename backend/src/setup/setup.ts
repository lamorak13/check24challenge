import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const games = [
  { home: "GER", away: "SCO", kickoff: "2024-06-14 19:00:00" },
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

export async function setup() {
  await prisma.community.upsert({
    where: { name: "Overall" },
    update: {},
    create: { name: "Overall" },
  });

  for (const game of games) {
    await prisma.game.create({
      data: {
        home: game.home,
        away: game.away,
        kickoff: new Date(game.kickoff),
      },
    });
  }
}
