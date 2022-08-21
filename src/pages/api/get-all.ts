import type { NextApiRequest, NextApiResponse } from "next";
import { PostURLResponse } from "../types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<PostURLResponse | any>
) {
	console.log("go?");
	const allURLs = await prisma.url.findMany();

	if (allURLs) {
		res.statusCode = 200;
		res.json(JSON.stringify(allURLs));
		return;
	}

	res.statusCode = 404;
	res.json({ message: "server error" });
	return;
}
