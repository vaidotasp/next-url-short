import type { NextApiRequest, NextApiResponse } from "next";
import { PostURLRequest, PostURLResponse } from "../types";
import url from "node:url";
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
	if (request?.originalURL) {
		if (!validateURL(request.originalURL)) {
			console.log("url invalid, friend");
			res.status(500).json({ errorMsg: "invalid URL" });
		}

		//check if long url has been shortened already
		const longUrl = await prisma.url.findFirst({
			where: { originalUrl: request.originalURL },
		});
		if (longUrl) {
			console.log("url is hashed, returning hash", longUrl.hash);
			urlHash = longUrl.hash;
			res.status(200).json({ shortURL: urlHash });
			return;
		}

		//new hash creation flow
		let newURLHash = nanoid(6);
		let hashExist = false;
		do {
			//check in prisma if we got the hash already
			const isHashUsed = await prisma.url.findFirst({
				where: { hash: newURLHash },
			});
			if (isHashUsed) {
				console.log("hash existing");
				// 6 length hash has a high probability of collision and we are inserting records one by one while also searching through hashes before, which is not performant. Ideally we want a available hash table that is at least 1M size from which we could pick out hashes.
				newURLHash = nanoid(6);
				hashExist = true;
			} else {
				console.log("creating record");
				// shorten and insert
				let createHashRecord = await prisma.url.create({
					data: {
						hash: newURLHash,
						originalUrl: String(request.originalURL),
						user: {
							connect: { id: 1 }, //for now we just tag all URLs on a single user
						},
					},
				});
				console.log(createHashRecord);
			}
		} while (hashExist);
		res.status(200).json({ shortURL: newURLHash });
		return;
	}

	res.status(200).json({ shortURL: urlHash });
}
