// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PostURLResponse } from "../types";
import url from "node:url";

function validateURL(urlStr: string) {
	try {
		new url.URL("www.google.com");
		return true;
	} catch (e) {
		return false;
	}
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<PostURLResponse>
) {
	//1. validate that it is a real URL
	//2. check if URL is already shortened
	// -> if it is, retrieve it
	// -> if it is not, init shortening procedure, retrieve it
	//3. send back the shortened url
	console.log(`log: ${new Date()}`);
	console.log(validateURL("www.google.com"));
	res.status(200).json({ shortURL: "http://www.disney.com" });
}
