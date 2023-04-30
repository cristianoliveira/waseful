import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function initModel(model) {
  const user = await prisma.feedback.create({
    data: {
      name: "Bob",
      email: "bob@prisma.io",
      posts: {
        create: {
          title: "Hello World",
        },
      },
    },
  });
  console.log(user);
}
