import { Game } from "../types/Game";
import { GameQuery } from "../types/GameQuery";
import { Score } from "../types/Score";

export async function fetchUpcomingGames(userName: string): Promise<Game[]> {
  const response = await fetch("http://localhost:5000/games/upcoming", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-name": userName,
    },
  });

  const games = await response.json();
  return games.map((g: any) => mapResultToGame(g));
}

export async function fetchInProgressGames(): Promise<Game[]> {
  const response = await fetch("http://localhost:5000/games/in_progress", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const games = await response.json();
  return games.map((g: any) => mapResultToGame(g));
}

export async function fetchAllGames(
  query: GameQuery,
  userName: string
): Promise<Game[]> {
  const searchParams = new URLSearchParams();
  searchParams.set("team", query.team);
  query.kickoff != "" && searchParams.set("kickoff", query.kickoff.toString());
  query.status != "" && searchParams.set("status", query.status);
  query.bet && searchParams.set("bet", "true");

  const response = await fetch("http://localhost:5000/games?" + searchParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-name": userName,
    },
  });

  const games = await response.json();
  return games.map((g: any) => mapResultToGame(g));
}

function mapResultToGame(g: any): Game {
  return {
    id: g.id,
    kickoff: new Date(g.kickoff),
    score:
      g.status != "Upcoming" ? { home: g.homescore, away: g.awayscore } : null,
    status: g.status,
    home: g.home,
    away: g.away,
    bet: g.bet.length
      ? {
          home: g.bet[0].homescore,
          away: g.bet[0].awayscore,
        }
      : null,
  };
}

export async function postUserBet(
  gameId: string,
  score: Score,
  userName: string
) {
  const response = await fetch(`http://localhost:5000/games/${gameId}/bet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: userName, score }),
  });

  return await response.json();
}
