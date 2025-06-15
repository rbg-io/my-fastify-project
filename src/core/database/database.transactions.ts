import { FastifyInstance } from "fastify";
import Database from "better-sqlite3";

export async function withTransaction<T>(
  fastify: FastifyInstance,
  callback: () => T
): Promise<T> {
  const db = fastify.db as Database.Database;
  const transaction = db.transaction(callback);
  return transaction();
}
