// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PostURLResponse } from "../types";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<PostURLResponse>
) {
	//1. validate that it is a real URL
	//2. check if URL is already shortened
	// -> if it is, retrieve it
	// -> if it is not, init shortening procedure, retrieve it
	//3. send back the shortened url

	res.status(200).json({ shortURL: "http://www.disney.com" });
}
