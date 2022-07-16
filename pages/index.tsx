import type { NextPage } from "next";
import { useState } from "react";
import { useMutation } from "react-query";
import { PostURLRequest, PostURLResponse } from "./types";

async function postURL(url: string): Promise<PostURLResponse> {
	const payload: PostURLRequest = { originalURL: url };
	const res = await fetch("/api/hello", {
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

interface URLInputProps {
	value: string;
	setUrlVal: (val: string) => void;
}
const URLInput = ({ value = "", setUrlVal }: URLInputProps) => {
	function handleUrlInputChange(val: string) {
		setUrlVal(val);
	}

	return (
		<input
			className="border-dashed border-2 border-fuchsia-300 w-96 p-1"
			type="text"
			placeholder="url"
			value={value}
			onChange={(e) => handleUrlInputChange(e.target.value)}
		/>
	);
};

const Output = () => {
	return <div>output</div>;
};

const Home: NextPage = () => {
	const [urlVal, setUrlVal] = useState("");
	const [validationErr, setValidationErr] = useState("");

	const mutation = useMutation(postURL, {
		onError: (err) => {
			console.log(err.message);
		},
	});

	function handleShorten() {
		const trimVal = urlVal.trim();
		mutation.mutate(trimVal);
		setValidationErr("");
	}

	return (
		<div className="flex flex-col gap-3 justify-start w-screen h-screen">
			<div className="p-3 items-center flex flex-col">
				<h2 className="text-3xl text-blue-500 self-center mt-6 mb-6">
					URL Shortener
				</h2>
				<URLInput value={urlVal} setUrlVal={(val: string) => setUrlVal(val)} />
				<div className="flex flex-row gap-2 mt-2">
					<button
						onClick={() => {
							setUrlVal("");
							setValidationErr("");
						}}
						className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
					>
						clear
					</button>
					<button
						type="submit"
						onClick={handleShorten}
						className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
					>
						shorten
					</button>
				</div>
				<div>
					{!!validationErr ? <div>Err: {validationErr}</div> : <Output />}
				</div>
			</div>
		</div>
	);
};

export default Home;
