import { createHmac } from "crypto";
import { nanoid } from "nanoid";

export function createHash() {
	console.log(nanoid(6));
	const str = "www.google.com";
	const key = "abcd";
	let hash = "";

	console.log("encode", str);

	const hmac = createHmac("md5", key);
	hmac.update(str);
	hash = hmac.digest("hex");

	console.log("res", hash);
}
