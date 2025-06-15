import type { FastifyInstance } from "fastify";

export const postsService = (fastify: FastifyInstance) => {
  return {
    findById: async (id: number) => {
      fastify.log.info(`Fetching post with id ${id}`);
      const post = fastify.transactions.posts.getById(id);
      return post;
    },

    findAll: async () => {
      fastify.log.info(`Fetching all posts`);
      const posts = fastify.transactions.posts.getAll();
      return posts;
    },

    create: async (data: { img_url: string; caption: string }) => {
      fastify.log.info(`Creating post with caption ${data.caption}`);
      const newPost = fastify.transactions.posts.create(data);
      return newPost;
    },
  };
};
