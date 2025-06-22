import { FastifyInstance } from "fastify";
import { postsService } from "./posts.service";

type GetPostParams = {
  id: string;
};

export async function postsRoutes(app: FastifyInstance) {
  const service = postsService(app);

  app.get("/api/posts", async (request, reply) => {
    const posts = await service.findAll();
    return { posts };
  });

  // GET one post
  app.get<{ Params: GetPostParams }>(
    "/api/posts/:id",
    async (request, reply) => {
      const id = Number(request.params.id);
      const post = await service.findById(id);
      if (!post) {
        return reply.code(404).send({ message: "Post not found." });
      }
      return post;
    }
  );
}
