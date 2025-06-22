import { Database } from "bun:sqlite";
import { stat } from "fs";

// export async function withTransaction<T>(
//   fastify: FastifyInstance,
//   callback: () => T
// ): Promise<T> {
//   const db = fastify.db as Database.Database;
//   const transaction = db.transaction(callback);
//   return transaction();
// }

export const createTransactionHelpers = (db: Database) => {
  const statements = {
    // Post statements
    getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
    getAllPosts: db.prepare("SELECT * FROM posts"),
    createPost: db.prepare(
      "INSERT INTO posts (img_url, caption) VALUES (?, ?) RETURNING *"
    ),
  };

  const posts = {
    getById: (id: number) => {
      return statements.getPostById.get(id);
    },
    getAll: () => {
      return statements.getAllPosts.all();
    },
    create: (data: { img_url: string; caption: string }) => {
      return statements.createPost.get(data.img_url, data.caption);
    },
  };

  return {
    posts,
  };
};

// Export type helpers for full type safety
export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>;
