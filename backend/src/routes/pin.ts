import { Response, Request } from "express";
import { prisma } from "../utils/prisma";

export async function createPin(req: Request, res: Response) {
  try {
    const result = await prisma.pin.create({
      data: {
        userName: req.params.username,
        pinnedUserName: req.body.pinnedUserName,
        communityName: req.body.communityName,
      },
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not create pin" });
  }
}

export async function deletePin(req: Request, res: Response) {
  try {
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
  } catch (error) {
    res.status(400).json({ error: "Could not delete pin" });
  }
}

export async function togglePin(req: Request, res: Response) {
  try {
    const isPinPresent = await prisma.pin.findFirst({
      where: {
        userName: req.params.username,
        pinnedUserName: req.body.pinnedUserName,
        communityName: req.body.communityName,
      },
    });

    isPinPresent == null
      ? await createPin(req, res)
      : await deletePin(req, res);
  } catch (error) {
    res.status(400).json({ error: "Could not toggle pin" });
  }
}
