import { Response, Request } from "express";
import { prisma } from "../utils/prisma";
import { createUserQuery } from "../queries/CreateUser";

export async function signupUser(req: Request, res: Response) {
  const name = req.body.name;

  if (name == "") {
    res.status(400).json({ error: "Could not create user" });
    return;
  }

  try {
    /*     const result = await prisma.user.upsert({
      where: { name: name },
      update: {},
      create: {
        name: name,
      },
    });

    await prisma.belongsToCommunity.create({
      data: {
        userName: name,
        communityName: "Overall",
      },
    }); */
    const [user] = await createUserQuery(name);
    console.log(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Could not create user" });
  }
}

export async function signinUser(req: Request, res: Response) {
  const name = req.body.name;

  try {
    const result = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });
    result ? res.json(result) : res.status(400).json("No user found");
  } catch (error) {
    res.status(400).json({ error: "Could not sign in user" });
  }
}
