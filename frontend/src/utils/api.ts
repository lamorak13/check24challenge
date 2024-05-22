import { Community } from "./types/Community";
import type { Game } from "./types/Game";
import { GameStatus } from "./types/GameStatus";
import { Score } from "./types/Score";
import { UserRanking } from "./types/UserRanking";

export async function fetchUpcomingGames(userName: string): Promise<Game[]> {
  const response = await fetch("http://localhost:5000/games/upcoming", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-name": userName,
    },
  });
  const games = await response.json();

  return games.map((g: any): Game => {
    return {
      id: g.id,
      kickoff: new Date(g.kickoff),
      score: { home: g.homescore, away: g.awayscore },
      status: g.status,
      home: g.home,
      away: g.away,
      bet: g.bet.length
        ? {
            home: g.bet[0].homescore,
            away: g.bet[0].awayscore,
          }
        : undefined,
    };
  });
}

export async function fetchInProgressGames(): Promise<Game[]> {
  const response = await fetch("http://localhost:5000/games/in_progress", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const games = await response.json();

  return games.map((g: any): Game => {
    return {
      id: g.id,
      kickoff: new Date(g.kickoff),
      score: { home: g.homescore, away: g.awayscore },
      status: g.status,
      home: g.home,
      away: g.away,
      bet: g.bet.length
        ? {
            home: g.bet[0].homescore,
            away: g.bet[0].awayscore,
          }
        : undefined,
    };
  });
}

export async function fetchAllGames(
  username: string,
  status?: GameStatus,
  team?: string,
  date?: Date,
  bet?: boolean
): Promise<Game[]> {
  const queryParams = new URLSearchParams();
  status && queryParams.set("status", status);
  team && queryParams.set("status", team);
  date && queryParams.set("status", date.toString());
  bet && queryParams.set("status", String(bet));

  const response = await fetch("http://localhost:5000/games/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-name": username,
    },
  });
  const games = await response.json();

  return games.map((g: any): Game => {
    return {
      id: g.id,
      kickoff: new Date(g.kickoff),
      score: { home: g.homescore, away: g.awayscore },
      status: g.status,
      home: g.home,
      away: g.away,
      bet: g.bet.length
        ? {
            home: g.bet[0].homescore,
            away: g.bet[0].awayscore,
          }
        : undefined,
    };
  });
}

export async function signInUser(username: string) {
  const response = await fetch("http://localhost:5000/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: username }),
  });

  const result = await response.json();
  return result;
}

export async function signUpUser(username: string) {
  const response = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: username }),
  });

  const result = await response.json();
  return result;
}

export async function postUserBet(
  gameId: string,
  score: Score,
  username: string
) {
  const response = await fetch(`http://localhost:5000/games/${gameId}/bet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: username, score }),
  });

  const result = await response.json();
  return result;
}

export async function createCommunity(username: string, communitName: string) {
  const response = await fetch(`http://localhost:5000/communities/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-name": username,
    },
    body: JSON.stringify({ communitName }),
  });

  const result = await response.json();
  return result;
}

export async function fetchCommunities(username: string): Promise<Community[]> {
  const response = await fetch(`http://localhost:5000/communities/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-name": username,
    },
  });
  const result = await response.json();
  return result;
}

export async function joinCommunity(username: string, communitName: string) {
  const response = await fetch(
    `http://localhost:5000/communities/${communitName}/join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-name": username,
      },
    }
  );

  const result = await response.json();
  return result;
}

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

  const result = await response.json();
  return result;
}

export async function pinUser(
  userName: string,
  pinnedUserName: string,
  communityName: string
) {
  const response = await fetch(`http://localhost:5000/user/${userName}/pin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ communityName, pinnedUserName }),
  });

  const result = await response.json();
  return result;
}

export async function deletePin(
  userName: string,
  pinnedUserName: string,
  communityName: string
) {
  const response = await fetch(`http://localhost:5000/user/${userName}/pin`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ communityName, pinnedUserName }),
  });

  const result = await response.json();
  return result;
}
