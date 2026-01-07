import "dotenv/config";
import { defineConfig } from "prisma/config";

const url = String(process.env["DATABASE_URL"]);

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url,
  },

  migrations: {
    path: "prisma/migrations",
  },

});
