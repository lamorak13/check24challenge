import { Response, Request } from "express";
import { prisma } from "../utils/prisma";
import { CustomRequest } from "../utils/types";
import { getRankingQuery } from "../queries/Ranking";
import { getRankingPageQuery } from "../queries/RankingPage";
import { getPinnedRankinsgQuery } from "../queries/PinnedRankings";
import { getSearchedRankingsQuery } from "../queries/SearchedRankings";
import { getRankingPreviewQuery } from "../queries/RankingPreview";

export async function getRanking(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";

  try {
    const result = await getRankingQuery(userName, req.params.id);

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not get ranking" });
  }
}

export async function getRankingPage(req: Request, res: Response) {
  try {
    const result = await getRankingPageQuery(
      req.params.id,
      Number(req.query.from),
      Number(req.query.to)
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not sget ranking page" });
  }
}

export async function getPinnedRankings(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";

  try {
    const result = await getPinnedRankinsgQuery(userName, req.params.id);

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not get pinned rankings" });
  }
}

export async function getSearchedRankings(req: Request, res: Response) {
  const searchParam = req.query.name;

  try {
    const result = await getSearchedRankingsQuery(
      req.params.id,
      typeof searchParam == "string" ? searchParam : ""
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not get searched ranking" });
  }
}

export async function getRankingPreview(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";

  try {
    const result = await getRankingPreviewQuery(userName, req.params.id);

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not get preview" });
  }
}

export async function getAllRankingPreviews(req: CustomRequest, res: Response) {
  const userName = req.headers["x-user-name"] || "";

  try {
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
      const preview = await getRankingPreviewQuery(userName, community.name);

      result.push({ community: community.name, preview: preview });
    }
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Could not get previews" });
  }
}
