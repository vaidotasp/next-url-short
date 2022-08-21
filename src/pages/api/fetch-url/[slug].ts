import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
	const slug = req.query["slug"];

	if (!slug || typeof slug !== "string") {
		res.statusCode = 404;
		return;
	}

	const slugToOriginal = await prisma.url.findFirst({
		where: { hash: slug },
	});

	if (!slugToOriginal) {
		//not found, redirect to origin
		res.statusCode = 404;
		res.json({ message: "url not found" });
		return;
	}

	res.json({ url: slugToOriginal.originalUrl });
	return;
}
