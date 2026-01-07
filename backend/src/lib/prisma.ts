import "dotenv/config"
import { PrismaClient } from "@prisma/client"


const url = String(process.env["DATABASE_URL"]);

export const prisma = new PrismaClient({
    accelerateUrl: url,
})


