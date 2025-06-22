import fp from "fastify-plugin";
import { Database } from "bun:sqlite";
import {
  createTransactionHelpers,
  TransactionHelpers,
} from "./database.transactions";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    db: Database;
    transations: TransactionHelpers;
  }
}

async function databasePlugin(fastify: FastifyInstance) {
  const db = new Database("./database.db");
  fastify.log.info("SQLite database connection established.");

  // Initialize database tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const transactions = createTransactionHelpers(db);

  fastify.decorate("db", db);
  fastify.decorate("transactions", transactions);

  fastify.addHook("onClose", (insance, done) => {
    insance.db.close();
    insance.log.info("SQLie database connection closed.");
  });
}

export default fp(databasePlugin);
