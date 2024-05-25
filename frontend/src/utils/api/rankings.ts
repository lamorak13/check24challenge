import { UserRanking } from "../types/UserRanking";

export async function fetchCommunityRanking(
  communitName: string,
  userName: string
): Promise<UserRanking[]> {
  const response = await fetch(
    `http://localhost:5000/communities/${communitName}/ranking`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-user-name": userName,
      },
    }
  );
  return await response.json();
}

export async function fetchCommunityRankingPage(
  communitName: string,
  from: number,
  to: number
): Promise<UserRanking[]> {
  const response = await fetch(
    `http://localhost:5000/communities/${communitName}/ranking/page?from=${from}&to=${to}`,
    {
      method: "GET",
    }
  );
  return await response.json();
}

export async function fetchCommunityRankingPinnedUser(
  communitName: string,
  userName: string
) {
  const response = await fetch(
    `http://localhost:5000/communities/${communitName}/ranking/pinned`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-user-name": userName,
      },
    }
  );
  return await response.json();
}

export async function fetchCommunitySearchForUser(
  query: string,
  communitName: string
): Promise<UserRanking[]> {
  const response = await fetch(
    `http://localhost:5000/communities/${communitName}/ranking/search?name=${query}`,
    {
      method: "GET",
    }
  );
  return await response.json();
}

export async function fetchCommunityPreviews(
  userName: string
): Promise<{ community: string; preview: UserRanking[] }[]> {
  const response = await fetch("http://localhost:5000/communities/previews", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-name": userName,
    },
  });
  return await response.json();
}

export async function fetchCommunityPreview(
  userName: string,
  communityName: string
): Promise<UserRanking[]> {
  const response = await fetch(
    `http://localhost:5000/communities/${communityName}/preview`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-user-name": userName,
      },
    }
  );
  return await response.json();
}
