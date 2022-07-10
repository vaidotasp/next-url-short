// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PostURLRequest, PostURLResponse } from "../types";
import url from "node:url";

function validateURL(urlStr: string) {
	try {
		new url.URL(urlStr);
		return true;
	} catch (e) {
		return false;
	}
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<PostURLResponse | Error>
) {
	//1. validate that it is a real URL
	const request: any | undefined = JSON.parse(req.body);
	console.log(request?.originalURL);
	if (request?.originalURL) {
		console.log(request.originalURL);
		if (!validateURL(request.originalURL)) {
			console.log("url invalid, friend");
			res.status(500).json(new Error("Invalid URL"));
		}

		console.log("url valid");
	}
	//2. check if URL is already shortened
	// -> if it is, retrieve it
	// -> if it is not, init shortening procedure, retrieve it
	//3. send back the shortened url
	// console.log(`log: ${new Date()}`);
	// console.log(validateU/RL("www.google.com"));
	res.status(200).json({ shortURL: "http://www.disney.com" });
}
