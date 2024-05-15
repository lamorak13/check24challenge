import express from "express";
import { setup } from "./setup";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const result = await prisma.game.findMany({ orderBy: { kickoff: "desc" } });
  res.json(result);
});

app.listen(port, async () => {
  /*   await setup(); */
  console.log(`Server is running on http://localhost:${port}`);
});
