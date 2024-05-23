import { Response } from "express";
import { prisma } from "../utils/prisma";
import { CustomRequest } from "../utils/types";

export async function joinCommunity(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";

  const result = await prisma.belongsToCommunity.upsert({
    where: {
      userName_communityName: {
        communityName: req.params.communitName,
        userName: userName,
      },
    },
    update: {},
    create: {
      communityName: req.params.communitName,
      userName: userName,
    },
  });
  res.json(result);
}

export async function createCommunity(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";
  const { communitName } = req.body;

  await prisma.community.create({
    data: {
      name: communitName,
    },
  });

  const result = await prisma.belongsToCommunity.create({
    data: {
      communityName: communitName,
      userName: userName,
    },
  });
  res.json(result);
}

export async function getUserCommunities(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";

  const result = await prisma.community.findMany({
    where: {
      belongsToCommunity: {
        some: {
          userName: userName,
        },
      },
    },
  });
  res.json(result);
}
