import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// List of common first names
const firstNames = [
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Elijah",
  "Sophia",
  "Oliver",
  "Isabella",
  "Lucas",
  "Mia",
  "James",
  "Charlotte",
  "William",
  "Amelia",
  "Benjamin",
  "Harper",
  "Henry",
  "Evelyn",
  "Alexander",
];

// List of common last names
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "White",
];

// List of games
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

export async function test_setup() {
  // Create the "Hellrider" community if it doesn't exist
  const community = await prisma.community.upsert({
    where: { name: "Overall" },
    update: {},
    create: { name: "Overall" },
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
  for (let i = 0; i < 100; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    users.push(`${firstName} ${lastName} ${i}`);
    const points = Math.floor(Math.random() * 21); // Random points between 0 and 20
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName} ${i}`,
        points,
        belongsToCommunity: {
          create: { communityName: "Overall" },
        },
      },
    });
  }

  // Generate bets for each user
  for (const user of users) {
    // Select around 3 random games
    const randomGames: any = [];
    while (randomGames.length < 3) {
      const randomIndex = Math.floor(Math.random() * games.length);
      const randomGame = games[randomIndex];
      if (!randomGames.includes(randomGame)) {
        randomGames.push(randomGame);
      }
    }

    // Create a bet for each selected game
    for (const game of randomGames) {
      await prisma.bet.create({
        data: {
          homescore: Math.floor(Math.random() * 5), // Random homescore between 0 and 4
          awayscore: Math.floor(Math.random() * 5), // Random awayscore between 0 and 4
          gameId: await prisma.game
            .findFirst({
              where: {
                home: game.home,
                away: game.away,
                kickoff: new Date(game.kickoff),
              },
            })
            .then((g) => g!.id),
          userName: user,
        },
      });
    }
  }
}
