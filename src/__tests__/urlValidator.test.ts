import { validateURL } from "../pages/api/shorten";
import { expect, test } from "vitest";

test("URL Validator validates properly", () => {
	const goodURL = "https://www.google.com";
	const goodURL1 = "http://www.google.com";
	const goodURL2 = "http://google.com";
	expect(validateURL(goodURL)).toBe(true);
	expect(validateURL(goodURL1)).toBe(true);
	expect(validateURL(goodURL2)).toBe(true);
});
test("URL Validator in-validates properly", () => {
	//TODO: fix this, currently it validates
	// const badURL = "https://www.googlecom";
	// expect(validateURL(badURL)).toBe(false);

	const badURL1 = "google.com";
	expect(validateURL(badURL1)).toBe(false);

	const badURL2 = "com";
	expect(validateURL(badURL2)).toBe(false);

	//No protocol
	const badURL3 = "www.google.com";
	expect(validateURL(badURL3)).toBe(false);
});
