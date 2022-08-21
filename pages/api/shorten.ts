// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PostURLRequest, PostURLResponse } from "../types";
import url from "node:url";
import { createHash } from "./hash";
import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function validateURL(urlStr: string) {
	try {
		new url.URL(urlStr);
		return true;
	} catch (e) {
		return false;
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<PostURLResponse | any>
) {
	const request: any | undefined = JSON.parse(req.body);
	let urlHash = "";
	//1. validate that it is a real URL
	console.log(request?.originalURL);
	if (request?.originalURL) {
		console.log(request.originalURL);
		if (!validateURL(request.originalURL)) {
			console.log("url invalid, friend");
			res.status(500).json({ errorMsg: "invalid URL" });
		}

		//check if long url has been shortened already
		const longUrl = await prisma.url.findFirst({
			where: { originalUrl: "https://www.disney.com" },
		});
		if (longUrl) {
			urlHash = longUrl.hash;
		}

		// hash it, store it and return it

		const newURLHash = nanoid(6);
		let hashExist = false;
		do {
			//check in prisma if we got the hash already
			const isURLHashed = await prisma.url.findFirst({
				where: { hash: newURLHash },
			});
			if (isURLHashed) {
				hashExist = true;
			} else {
				console.log("creating record");
				// shorten and insert
				let createHashRecord = await prisma.url.create({
					data: {
						hash: newURLHash,
						originalUrl: String(request.originalURL),
						userId: 1,
						user: {
							connect: { id: 1 },
						},
					},
				});
				console.log(createHashRecord);
			}
		} while (hashExist);

		console.log(longUrl);
	}

	//2. check if URL is already shortened
	// -> if it is, retrieve it
	// -> if it is not, init shortening procedure, retrieve it

	//3. send back the shortened url
	// console.log(`log: ${new Date()}`);
	// console.log(validateU/RL("www.google.com"));
	res.status(200).json({ shortURL: urlHash });
}
