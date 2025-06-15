import fp from "fastify-plugin";
import Database from "better-sqlite3";
import {
  createTransactionHelpers,
  TransactionHelpers,
} from "./database.transactions";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    db: Database.Database;
    transations: TransactionHelpers;
  }
}

async function databasePlugin(fastify: FastifyInstance) {
  const db = new Database("./database.db");
  fastify.log.info("SQLite database connection established.");

  const transactions = createTransactionHelpers(db);

  fastify.decorate("db", db);
  fastify.decorate("transactions", transactions);

  fastify.addHook("onClose", (insance, done) => {
    insance.db.close();
    insance.log.info("SQLie database connection closed.");
  });
}

export default fp(databasePlugin);
