import { Response, Request } from "express";
import { prisma } from "../utils/prisma";
import { CustomRequest } from "../utils/types";
import {
  sendGameFinishedUpdate,
  sendGameStartedUpdate,
} from "../utils/websocket";
import { GameStatus } from "@prisma/client";
import { updateRankingsQuery } from "../queries/UpdateRankings";

export async function getAllGames(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";
  const { team, kickoff, bet, status } = req.query;

  const isDate = (value: unknown): value is Date => {
    return value instanceof Date && !isNaN(+value);
  };
  const kickoffDate = new Date(kickoff as string);

  try {
    const result = await prisma.game.findMany({
      where: {
        kickoff: {
          gte: isDate(kickoffDate) ? kickoffDate : undefined,
        },
        status:
          (status as string) in GameStatus ? (status as GameStatus) : undefined,
        bet: {
          some:
            bet == "true"
              ? {
                  userName: userName,
                }
              : undefined,
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
  } catch (error) {
    res.status(400).json({ error: "Could not get games" });
  }
}

export async function getUpcomingGames(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";

  try {
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
  } catch (error) {
    res.status(400).json({ error: "Could not get upcoming games" });
  }
}

export async function getInprogressGames(req: Request, res: Response) {
  try {
    const result = await prisma.game.findMany({
      where: { status: "In_progress" },
      include: {
        bet: {
          where: {
            userName: "",
          },
        },
      },
      orderBy: { kickoff: "asc" },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not games in progress" });
  }
}

export async function getGame(req: Request, res: Response) {
  try {
    const result = await prisma.game.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not get game" });
  }
}

export async function startGame(req: Request, res: Response) {
  try {
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
  } catch (error) {
    res.status(400).json({ error: "Could not start game" });
  }
}

export async function finishGame(req: Request, res: Response) {
  try {
    await prisma.game.update({
      where: {
        id: req.params.id,
        status: "In_progress",
      },
      data: {
        status: "Finished",
      },
    });

    const result = await updateRankingsQuery(req.params.id);

    sendGameFinishedUpdate();
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not finish game" });
  }
}

export async function betOnGame(req: Request, res: Response) {
  const { away, home } = req.body.score;
  const user = req.body.user;

  try {
    const result = await prisma.bet.create({
      data: {
        awayscore: away,
        homescore: home,
        userName: user,
        gameId: req.params.id,
      },
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not create bet" });
  }
}
