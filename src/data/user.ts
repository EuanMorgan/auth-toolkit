import { db, eq, schema } from "~/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, id),
    });

    return user;
  } catch (error) {
    return null;
  }
};
