import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export const resetDelta = () =>
  prisma.$queryRaw(Prisma.sql`
    Update
        "User"
    set
        delta = 0
  `);
