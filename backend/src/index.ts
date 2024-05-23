import express from "express";
const cors = require("cors");

import { signinUser, signupUser } from "./routes/auth";
import {
  betOnGame,
  finishGame,
  getGame,
  getGames,
  getInprogressGames,
  getUpcomingGames,
  startGame,
} from "./routes/games";
import { deletePin, pinUser } from "./routes/pin";
import {
  createCommunity,
  getUserCommunities,
  joinCommunity,
} from "./routes/communities";
import {
  getAllCommunityPreviews,
  getCommunityPreview,
  getCommunityRanking,
  getCommunityRankingForPinnedUsers,
  getCommunityRankingPage,
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

app.get("/games", getGames);

app.get("/games/upcoming", getUpcomingGames);

app.get("/games/in_progress", getInprogressGames);

app.get("/games/:id", getGame);

app.get("/games/:id/start", startGame);

app.get("/games/:id/finish", finishGame);

app.post("/games/:id/bet", betOnGame);

app.post("/user/:username/pin", pinUser);

app.delete("/user/:username/pin", deletePin);

app.post("/communities/:communitName/join", joinCommunity);

app.post("/communities/create", createCommunity);

app.get("/communities", getUserCommunities);

app.get("/communities/:id/ranking", getCommunityRanking);

app.get("/communities/:id/ranking/page", getCommunityRankingPage);

app.get("/communities/:id/ranking/pinned", getCommunityRankingForPinnedUsers);

app.put("/games/:id/score/home", scoreGoalForHome);

app.put("/games/:id/score/away", scoreGoalForAway);

app.get("/communities/:id/preview", getCommunityPreview);

app.get("/communities/previews", getAllCommunityPreviews);

app.listen(port, async () => {
  /* await setup(); */
  /* await test_setup(); */
  console.log(`Server is running on http://localhost:${port}`);
});
