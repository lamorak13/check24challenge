import { Response } from "express";
import { prisma } from "../utils/prisma";
import { CustomRequest } from "../utils/types";
import { createCommunityQuery } from "../queries/CerateCommunity";
import { joinCommunityQuery } from "../queries/JoinCommunity";

export async function joinCommunity(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";
  console.log("Username: ", userName);

  try {
    const result = await joinCommunityQuery(userName, req.params.communitName);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Could not join community" });
  }
}

export async function createCommunity(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";
  const { communityName } = req.body;

  if (communityName == "") {
    res.status(400).json({ error: "Could not craete community" });
    return;
  }
  try {
    const result = await createCommunityQuery(userName, communityName);

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
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
