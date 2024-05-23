import { Response, Request } from "express";
import { prisma } from "../utils/prisma";
import { sendGameScoredUpdate } from "../utils/websocket";

export async function scoreGoalForHome(req: Request, res: Response) {
  const result = await prisma.game.update({
    where: {
      id: req.params.id,
    },
    data: {
      homescore: {
        increment: 1,
      },
    },
  });

  sendGameScoredUpdate();
  res.json(result);
}

export async function scoreGoalForAway(req: Request, res: Response) {
  const result = await prisma.game.update({
    where: {
      id: req.params.id,
    },
    data: {
      awayscore: {
        increment: 1,
      },
    },
  });

  sendGameScoredUpdate();
  res.json(result);
}
