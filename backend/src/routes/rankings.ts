import { Response } from "express";
import { prisma } from "../utils/prisma";
import { CustomRequest } from "../utils/types";
import { readFile } from "fs/promises";

export async function getCommunityRanking(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";

  const sqlFromFile = await readFile("./src/queries/CommunityRanking.sql", {
    encoding: "utf8",
  });

  const result = await prisma.$queryRawUnsafe(
    sqlFromFile,
    userName,
    req.params.id
  );
  res.json(result);
}

export async function getCommunityRankingPage(
  req: CustomRequest,
  res: Response
) {
  const userName = req.headers["x-user-name"] || "";

  const sqlFromFile = await readFile("./src/queries/CommunityRankingPage.sql", {
    encoding: "utf8",
  });

  const result = await prisma.$queryRawUnsafe(
    sqlFromFile,
    userName,
    req.params.id,
    Number(req.query.from),
    Number(req.query.to)
  );
  res.json(result);
}

export async function getCommunityRankingForPinnedUsers(
  req: CustomRequest,
  res: Response
) {
  const userName = req.headers["x-user-name"] || "";

  const sqlFromFile = await readFile(
    "./src/queries/CommunityRankingPinned.sql",
    {
      encoding: "utf8",
    }
  );

  const result = await prisma.$queryRawUnsafe(
    sqlFromFile,
    userName,
    req.params.id
  );
  res.json(result);
}

export async function getCommunityPreview(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";

  const sqlFromFile = await readFile("./src/queries/CommunityPreview.sql", {
    encoding: "utf8",
  });

  const result = await prisma.$queryRawUnsafe(
    sqlFromFile,
    userName,
    req.params.id
  );
  res.json(result);
}

export async function getAllCommunityPreviews(
  req: CustomRequest,
  res: Response
) {
  const userName = req.headers["x-user-name"] || "";

  const communities = await prisma.community.findMany({
    where: {
      name: {
        not: "Overall",
      },
      belongsToCommunity: {
        some: {
          userName: typeof userName == "string" ? userName : "",
        },
      },
    },
  });

  const result: { community: string; preview: unknown }[] = [];

  for (const community of communities) {
    const sqlFromFile = await readFile("./src/queries/CommunityPreview.sql", {
      encoding: "utf8",
    });

    const preview = await prisma.$queryRawUnsafe(
      sqlFromFile,
      userName,
      community.name
    );
    result.push({ community: community.name, preview: preview });
  }
  res.json(result);
}
