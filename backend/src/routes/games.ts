import { Response, Request } from "express";
import { prisma } from "../utils/prisma";
import { CustomRequest } from "../utils/types";
import {
  sendGameFinishedUpdate,
  sendGameStartedUpdate,
} from "../utils/websocket";
import { readFile } from "fs/promises";
import { GameStatus } from "@prisma/client";

export async function getGames(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";
  const { team, kickoff, bet, status } = req.query;

  const isDate = (value: unknown): value is Date => {
    return value instanceof Date && !isNaN(+value);
  };
  const kickoffDate = new Date(kickoff as string);

  console.log(req.query, kickoffDate, isDate(kickoffDate));

  const result = await prisma.game.findMany({
    where: {
      kickoff: {
        gte: isDate(kickoffDate) ? kickoffDate : undefined,
      },
      status:
        (status as string) in GameStatus ? (status as GameStatus) : undefined,
      bet: {
        some: {
          userName: bet == "true" ? userName : undefined,
        },
      },
      OR: [
        {
          home: {
            contains: typeof team === "string" ? team : undefined,
          },
        },
        {
          away: {
            contains: typeof team === "string" ? team : undefined,
          },
        },
      ],
    },
    include: {
      bet: {
        where: {
          userName: userName,
        },
      },
    },
    orderBy: { kickoff: "asc" },
  });
  res.json(result);
}

export async function getUpcomingGames(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";

  const result = await prisma.game.findMany({
    where: { status: "Upcoming" },
    include: {
      bet: {
        where: {
          userName: userName,
        },
      },
    },
    orderBy: { kickoff: "asc" },
    take: 10,
  });

  res.json(result);
}

export async function getInprogressGames(req: Request, res: Response) {
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
}

export async function getGame(req: Request, res: Response) {
  const result = await prisma.game.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json(result);
}

export async function startGame(req: Request, res: Response) {
  const result = await prisma.game.update({
    where: {
      id: req.params.id,
      status: "Upcoming",
    },
    data: {
      status: "In_progress",
    },
  });
  sendGameStartedUpdate();
  res.json(result);
}

export async function finishGame(req: Request, res: Response) {
  await prisma.game.update({
    where: {
      id: req.params.id,
      status: "In_progress",
    },
    data: {
      status: "Finished",
    },
  });

  const sqlFromFile = await readFile("./src/queries/UpdateRanking.sql", {
    encoding: "utf8",
  });

  const result = await prisma.$queryRawUnsafe(sqlFromFile, req.params.id);

  sendGameFinishedUpdate();
  res.json(result);
}

export async function betOnGame(req: Request, res: Response) {
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
}
