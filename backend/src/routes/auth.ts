import { Response, Request } from "express";
import { prisma } from "../utils/prisma";

export async function signupUser(req: Request, res: Response) {
  const name = req.body.name;

  const result = await prisma.user.upsert({
    where: { name: name },
    update: {},
    create: {
      name: name,
    },
  });
  res.json(result);
}

export async function signinUser(req: Request, res: Response) {
  const name = req.body.name;
  const result = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });
  result ? res.json(result) : res.status(400).json("No user found");
}
