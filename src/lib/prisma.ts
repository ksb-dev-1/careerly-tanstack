// import { PrismaClient } from "@/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL!,
// });

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient;
// };

// const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     adapter,
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;

// ---------------------------------------------------------------------

// import { PrismaClient } from "@/generated/prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const createPrismaClient = () => {
//   // Use type assertion to bypass the type check
//   return new PrismaClient({} as any).$extends(withAccelerate());
// };

// const globalForPrisma = globalThis as unknown as {
//   prisma: ReturnType<typeof createPrismaClient>;
// };

// const prisma = globalForPrisma.prisma ?? createPrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;

// ----------------------------------------------------------------

import { PrismaClient } from "@/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({} as any).$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
