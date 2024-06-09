import { enhance } from "@zenstackhq/runtime";
import { NextRequestHandler } from "@zenstackhq/server/next";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import RestApiHandler from '@zenstackhq/server/api/rest'
// create an enhanced Prisma client with user context
async function getPrisma() {
  const session = await getServerAuthSession();
  return enhance(db, { user: session?.user });
}



const handler =  NextRequestHandler({
  getPrisma,
  useAppDir: true,
  handler: RestApiHandler({endpoint: 'http://localhost/api/model'})
});

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};