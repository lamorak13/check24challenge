import { Response } from "express";
import { prisma } from "../utils/prisma";
import { CustomRequest } from "../utils/types";

export async function joinCommunity(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";

  try {
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
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not join community" });
  }
}

export async function createCommunity(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";
  const { communitName } = req.body;

  try {
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
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not craete community" });
  }
}

export async function getUserCommunities(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";

  try {
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
  } catch (error) {
    res.status(400).json({ error: "Could not get communities" });
  }
}
