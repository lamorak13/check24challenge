import express from "express";
import { setup } from "./setup";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = 5000;

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
  const { status, team, date, bet, username } = req.body;
  const result = await prisma.game.findMany({
    where: {
      status: status ? status : true,
      kickoff: {
        lte: date,
      },
      bet: {
        some: {
          userName: bet ? username : true,
        },
      },
      OR: [{ away: team ? team : true }, { home: team ? team : true }],
    },
  });
  res.json(result);
});

app.get("/games/upcoming", async (req, res) => {
  const result = await prisma.game.findMany({
    where: { status: "Upcoming" },
    orderBy: { kickoff: "desc" },
    take: 10,
  });
  res.json(result);
});

app.get("/games/in_progress", async (req, res) => {
  const result = await prisma.game.findMany({
    where: { status: "In_progress" },
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

app.post("user/:username/pin", async (req, res) => {
  const result = await prisma.pin.create({
    data: {
      userName: req.params.username,
      pinnedUserName: req.body.pinnedUserName,
    },
  });

  res.json(result);
});

app.delete("user/:username/pin", async (req, res) => {
  const result = await prisma.pin.delete({
    where: {
      userName_pinnedUserName: {
        userName: req.params.username,
        pinnedUserName: req.body.pinnedUserName,
      },
    },
  });

  res.json(result);
});

app.listen(port, async () => {
  /* await setup(); */
  console.log(`Server is running on http://localhost:${port}`);
});
