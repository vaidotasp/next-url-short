import { PostURLRequest, PostURLResponse } from "./types";

export async function postURL(url: string): Promise<PostURLResponse> {
	const payload: PostURLRequest = { originalURL: url };
	const res = await fetch("/api/shorten", {
		method: "POST",
		body: JSON.stringify(payload),
	});
	if (!res.ok) {
		const errResponse = await res.json();
		console.log(errResponse);
		const errMsg =
			res.status === 500 && errResponse.errorMsg
				? errResponse.errorMsg
				: "network error";
		console.log(errMsg);
		throw new Error(errMsg);
	}
	return res.json();
}
