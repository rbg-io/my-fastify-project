import "fastify";
import Database from "better-sqlite3";
import { TransactionHelpers } from "../core/database/database.transactions";

declare module "fastify" {
  interface FastifyInstance {
    db: Database.Database;
    transactions: TransactionHelpers;
  }
}
