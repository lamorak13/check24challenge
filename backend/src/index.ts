import express from "express";
const cors = require("cors");

import { signinUser, signupUser } from "./routes/auth";
import {
  betOnGame,
  finishGame,
  getAllGames,
  getGame,
  getInprogressGames,
  getUpcomingGames,
  startGame,
} from "./routes/games";
import { createPin, deletePin, togglePin } from "./routes/pin";
import {
  createCommunity,
  getUserCommunities,
  joinCommunity,
} from "./routes/communities";
import {
  getAllRankingPreviews,
  getPinnedRankings,
  getRanking,
  getRankingPage,
  getRankingPreview,
  getSearchedRankings,
} from "./routes/rankings";
import { scoreGoalForAway, scoreGoalForHome } from "./routes/admin";

import { setup } from "./setup/setup";
import { test_setup } from "./setup/test_setup";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/signup", signupUser);
app.post("/signin", signinUser);

app.get("/games", getAllGames);

app.get("/games/upcoming", getUpcomingGames);

app.get("/games/in_progress", getInprogressGames);

app.get("/games/:id", getGame);

app.put("/games/:id/start", startGame);

app.put("/games/:id/finish", finishGame);

app.post("/games/:id/bet", betOnGame);

app.post("/user/:username/pin", createPin);

app.delete("/user/:username/pin", deletePin);

app.put("/user/:username/pin", togglePin);

app.post("/communities/:communitName/join", joinCommunity);

app.post("/communities/create", createCommunity);

app.get("/communities", getUserCommunities);

app.get("/communities/:id/ranking", getRanking);

app.get("/communities/:id/ranking/page", getRankingPage);

app.get("/communities/:id/ranking/pinned", getPinnedRankings);

app.get("/communities/:id/ranking/search", getSearchedRankings);

app.put("/games/:id/score/home", scoreGoalForHome);

app.put("/games/:id/score/away", scoreGoalForAway);

app.get("/communities/:id/preview", getRankingPreview);

app.get("/communities/previews", getAllRankingPreviews);

app.listen(port, async () => {
  /* await setup(); */
  /* await test_setup(); */
  console.log(`Server is running on http://localhost:${port}`);
});
