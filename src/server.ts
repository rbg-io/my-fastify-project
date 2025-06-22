import fastify from "fastify";
import dbPlugin from "./core/database/database.plugin";

const app = fastify({
  logger: true,
});

// Register DB plugin
app.register(dbPlugin);

app.get("/api/health", async (request, reply) => {
  return { status: "OK" };
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Server running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
