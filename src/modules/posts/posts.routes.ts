import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { postsService } from "./posts.service";

export async function postsRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  const service = postsService(fastify);

  // GET /api/posts - Get all posts
  fastify.get("/api/posts", async (request, reply) => {
    try {
      const posts = await service.findAll();
      return { posts };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500);
      return { error: "Failed to fetch posts" };
    }
  });

  // GET /api/posts/:id - Get a specific post
  fastify.get<{ Params: { id: string } }>(
    "/api/posts/:id",
    async (request, reply) => {
      try {
        const id = parseInt(request.params.id);
        if (isNaN(id)) {
          reply.status(400);
          return { error: "Invalid post ID" };
        }

        const post = await service.findById(id);
        if (!post) {
          reply.status(404);
          return { error: "Post not found" };
        }

        return { post };
      } catch (error) {
        fastify.log.error(error);
        reply.status(500);
        return { error: "Failed to fetch post" };
      }
    }
  );

  // POST /api/posts - Create a new post
  fastify.post<{ Body: { img_url: string; caption: string } }>(
    "/api/posts",
    async (request, reply) => {
      try {
        const { img_url, caption } = request.body;

        if (!img_url || !caption) {
          reply.status(400);
          return { error: "img_url and caption are required" };
        }

        const newPost = await service.create({ img_url, caption });
        reply.status(201);
        return { post: newPost };
      } catch (error) {
        fastify.log.error(error);
        reply.status(500);
        return { error: "Failed to create post" };
      }
    }
  );
}
