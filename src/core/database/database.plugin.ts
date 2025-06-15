import fp from "fastify-plugin";
import Database from "better-sqlite3";

export default fp(async (fastify, otps) => {
  // Create database instance
  const db = new Database("db.sqlite");

  // Decorate fastify instance with db
  fastify.decorate("db", db);

  // Graceful shutdown
  fastify.addHook("onClose", async () => {
    db.close();
  });
});
