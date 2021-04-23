import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear the database
  await prisma.user.deleteMany();

  // Create 3 users
  await prisma.user.create({
    data: { id: 1, email: "hello-1@example.com", name: "First" },
  });
  await prisma.user.create({
    data: {
      id: 2,
      email: "hello-2@example.com",
      name: "Second",
      data: { hello: "second" },
    },
  });
  await prisma.user.create({
    data: {
      id: 3,
      email: "hello-3@example.com",
      name: "Third",
      data: { hello: "third" },
    },
  });

  // Get all users
  console.log("All users", await prisma.user.findMany());
  // Logs an array of all 3 users

  // Get all users which have JSON data not equal to this string
  console.log(
    "All users with JSON data",
    await prisma.user.findMany({ where: { data: { not: "example-string" } } })
  );
  // Logs an array of users with ID 2 and 3

  // Get all users with ID 2
  console.log(
    "All users with ID 2",
    await prisma.user.findMany({ where: { id: 2 } })
  );
  // Logs an array of a single user with ID 2

  // Get all users which have JSON data not equal to this string and their ID is 2
  console.log(
    "All users with JSON data and their ID is 2",
    await prisma.user.findMany({ where: { data: { not: "example-string" }, id: 2 } })
  );
  // SHOULD DO THIS: Logs an array of a single user with ID 2
  // ACTUALLY DOES THIS: Logs an array of both users with ID 2 and 3

  // Same example as above, but using `AND` explicitly
  console.log(
    "All users with JSON data and their ID is 2",
    await prisma.user.findMany({ where: { AND: { data: { not: "example-string" }, id: 2 } } })
  );
  // Same problem

  // Same example as above, but using `AND` explicitly using an array
  console.log(
    "All users with JSON data and their ID is 2",
    await prisma.user.findMany({ where: { AND: [{ data: { not: "example-string" } }, { id: 2 }] } })
  );
  // Same problem
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
