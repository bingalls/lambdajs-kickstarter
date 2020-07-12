import { Context } from "aws-lambda";
import { PrismaClient, PromoCreateInput } from "@prisma/client";

const prisma = new PrismaClient();

function response(code: number, json: object): object {
  return {
    statusCode: code,
    headers: { "Content-Type": "application/json" },
    body: json,
  };
}

exports.handler = async (
  event: PromoCreateInput,
  context: Context,
  callback: Function
) => {
  await prisma.connect();
  const regex = /[^- a-z0-9]/gi; // sanitize disallowed chars
  try {
    return response(
      200,
      await prisma.promo.create({
        data: {
          date: new Date(event.date),
          organizer: event.organizer?.replace(regex, ""),
          venue: event.venue?.replace(regex, ""),
        },
      })
    );
  } catch (exc) {
    console.error(exc);
    return response(500, { error: "Could not save data" });
  } finally {
    prisma.disconnect();
  }
};
