import express from "express";
import { setup } from "./setup";
const cors = require("cors");

import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  const name = req.body.name;

  const result = await prisma.user.upsert({
    where: { name: name },
    update: {},
    create: {
      name: name,
    },
  });
  res.json(result);
});

app.post("/signin", async (req, res) => {
  const name = req.body.name;
  const result = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });
  result ? res.json(result) : res.status(400).json("No user found");
});

app.get("/games", async (req, res) => {
  const { status, team, date, bet } = req.query;
  const userName = req.headers["x-user-name"];

  const result = await prisma.game.findMany({
    /* where: {
      status: status ? status : undefined,
      kickoff: {
        lte: date ? date : undefined,
      },
      bet: {
        some: {
          userName: bet && typeof userName == "string" ? userName : undefined,
        },
      },
      OR: [
        { away: team ? team : undefined },
        { home: team ? team : undefined },
      ],
    }, */
    include: {
      bet: {
        where: {
          userName: typeof userName == "string" ? userName : "",
        },
      },
    },
    orderBy: { kickoff: "asc" },
  });
  res.json(result);
});

app.get("/games/upcoming", async (req, res) => {
  const userName = req.headers["x-user-name"];

  const result = await prisma.game.findMany({
    where: { status: "Upcoming" },
    include: {
      bet: {
        where: {
          userName: typeof userName == "string" ? userName : "",
        },
      },
    },
    orderBy: { kickoff: "asc" },
    take: 10,
  });

  res.json(result);
});

app.get("/games/in_progress", async (req, res) => {
  const result = await prisma.game.findMany({
    where: { status: "In_progress" },
    include: {
      bet: {
        where: {
          userName: "test",
        },
      },
    },
    orderBy: { kickoff: "asc" },
  });
  res.json(result);
});

app.get("/games/:id", async (req, res) => {
  const result = await prisma.game.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json(result);
});

app.get("/games/:id/start", async (req, res) => {
  const result = await prisma.game.update({
    where: {
      id: req.params.id,
      status: "Upcoming",
    },
    data: {
      status: "In_progress",
    },
  });
  res.json(result);
});

app.get("/games/:id/finish", async (req, res) => {
  const result = await prisma.game.update({
    where: {
      id: req.params.id,
      status: "In_progress",
    },
    data: {
      status: "Finished",
    },
  });
  res.json(result);
});

app.post("/games/:id/bet", async (req, res) => {
  const { away, home } = req.body.score;
  const user = req.body.user;
  const result = await prisma.bet.create({
    data: {
      awayscore: away,
      homescore: home,
      userName: user,
      gameId: req.params.id,
    },
  });

  res.json(result);
});

app.post("/user/:username/pin", async (req, res) => {
  const result = await prisma.pin.create({
    data: {
      userName: req.params.username,
      pinnedUserName: req.body.pinnedUserName,
      communityName: req.body.communityName,
    },
  });

  res.json(result);
});

app.delete("/user/:username/pin", async (req, res) => {
  const result = await prisma.pin.delete({
    where: {
      userName_pinnedUserName_communityName: {
        userName: req.params.username,
        pinnedUserName: req.body.pinnedUserName,
        communityName: req.body.communityName,
      },
    },
  });

  res.json(result);
});

app.post("/communities/:communitName/join", async (req, res) => {
  const userName = req.headers["x-user-name"];

  const result = await prisma.belongsToCommunity.upsert({
    where: {
      userName_communityName: {
        communityName: req.params.communitName,
        userName: typeof userName == "string" ? userName : "",
      },
    },
    update: {},
    create: {
      communityName: req.params.communitName,
      userName: typeof userName == "string" ? userName : "",
    },
  });
  res.json(result);
});

app.post("/communities/create", async (req, res) => {
  const userName = req.headers["x-user-name"];
  const { communitName } = req.body;

  await prisma.community.create({
    data: {
      name: communitName,
    },
  });

  const result = await prisma.belongsToCommunity.create({
    data: {
      communityName: communitName,
      userName: typeof userName == "string" ? userName : "",
    },
  });
  res.json(result);
});

app.get("/communities", async (req, res) => {
  const userName = req.headers["x-user-name"];

  const result = await prisma.community.findMany({
    where: {
      belongsToCommunity: {
        some: {
          userName: typeof userName == "string" ? userName : "",
        },
      },
    },
  });
  res.json(result);
});

app.get("/communities/:id/ranking", async (req, res) => {
  const userName = req.headers["x-user-name"];
  const sqlFromFile = await readFile("./src/queries/CommunityRanking.sql", {
    encoding: "utf8",
  });

  const result = await prisma.$queryRawUnsafe(
    sqlFromFile,
    userName,
    req.params.id
  );
  res.json(result);
});

app.listen(port, async () => {
  await setup();
  console.log(`Server is running on http://localhost:${port}`);
});
