import { Context } from "aws-lambda";
import { PrismaClient, PromoCreateInput } from "@prisma/client";
require("dotenv").config();

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
  try {
    return response(200, await prisma.promo.findMany({}));
  } catch (error) {
    return response(500, { error: "Could not load data" });
  } finally {
    prisma.disconnect();
  }
};
