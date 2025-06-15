import fastify from "fastify";

const app = fastify({
  logger: true,
});

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
