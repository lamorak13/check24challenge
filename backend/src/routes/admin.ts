import { Response, Request } from "express";
import { prisma } from "../utils/prisma";
import { sendGameScoredUpdate } from "../utils/websocket";

export async function scoreGoalForHome(req: Request, res: Response) {
  try {
    const result = await prisma.game.update({
      where: {
        id: req.params.id,
        status: "In_progress",
      },
      data: {
        homescore: {
          increment: 1,
        },
      },
    });
    sendGameScoredUpdate();
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not update game score" });
  }
}

export async function scoreGoalForAway(req: Request, res: Response) {
  try {
    const result = await prisma.game.update({
      where: {
        id: req.params.id,
        status: "In_progress",
      },
      data: {
        awayscore: {
          increment: 1,
        },
      },
    });

    sendGameScoredUpdate();
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not update game score" });
  }
}
