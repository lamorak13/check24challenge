import { Response, Request } from "express";
import { prisma } from "../utils/prisma";

export async function pinUser(req: Request, res: Response) {
  const result = await prisma.pin.create({
    data: {
      userName: req.params.username,
      pinnedUserName: req.body.pinnedUserName,
      communityName: req.body.communityName,
    },
  });

  res.json(result);
}

export async function deletePin(req: Request, res: Response) {
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
}
