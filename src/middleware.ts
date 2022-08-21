import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	const shortSlug = req.nextUrl.pathname.split("/").pop();

	const hashFetch = await fetch(
		`${req.nextUrl.origin}/api/fetch-url/${shortSlug}`
	);

	const data = await hashFetch.json();

	if (data.status === 404 || !data?.url) {
		return NextResponse.redirect(req.nextUrl.origin);
	}

	if (data?.url) {
		return NextResponse.redirect(data.url);
	}
}

export const config = {
	matcher: "/:slug",
};
