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
		const newURLHash = nanoid(6);
		let hashExist = false;
		do {
			//check in prisma if we got the hash already
			const isURLHashed = await prisma.url.findFirst({
				where: { hash: newURLHash },
			});
			if (isURLHashed) {
				console.log("hash existing");
				hashExist = true;
			} else {
				console.log("creating record");
				// shorten and insert
				let createHashRecord = await prisma.url.create({
					data: {
						hash: newURLHash,
						originalUrl: String(request.originalURL),
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

	res.status(200).json({ shortURL: urlHash });
}
