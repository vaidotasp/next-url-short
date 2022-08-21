import { useMutation, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useState } from "react";
import { postURL } from "../utils/services";

interface ResponseData {
	shortURL: string;
}

interface URLInputProps {
	value: string;
	setUrlVal: (val: string) => void;
}
const URLInput = ({ value, setUrlVal }: URLInputProps) => {
	function handleUrlInputChange(val: string) {
		setUrlVal(val);
	}

	return (
		<input
			className="border-dashed border-2 border-fuchsia-300 w-96 p-1"
			type="text"
			placeholder="eg. https://www.google.com"
			value={value}
			onChange={(e) => handleUrlInputChange(e.target.value)}
		/>
	);
};

const Output = ({ shortURL }: ResponseData) => {
	return <div>output {shortURL}</div>;
};

const ShortTable = () => {
	const { isLoading, error, data } = useQuery(
		["urls"],
		() => {
			return fetch("/api/get-all").then((r) => r.json());
		},
		{
			select: (data) => JSON.parse(data),
		}
	);

	if (isLoading) return <p>Loading...</p>;

	const Cells = () => {
		return data.map(({ hash, originalUrl }: any, i: number) => {
			return (
				<tr key={i}>
					<td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
						{i + 1}
					</td>
					<td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
						{originalUrl}
					</td>
					<td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
						{hash}
					</td>
				</tr>
			);
		});
	};

	return (
		<div className="">
			<h2 className="text-3xl text-purple-600 self-center mt-10 text-center">
				Shortened URLs
			</h2>
			<div className="">
				<div className="shadow-sm overflow-hidden my-8">
					<table className="table-auto border-collapse w-full text-sm">
						<thead>
							<tr>
								<th
									className="border-b
							dark:border-slate-600
							font-medium
							p-4
							pl-8
							pt-0
							pb-3
							text-slate-400
							dark:text-slate-200
							text-left"
								>
									#
								</th>
								<th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
									longURL
								</th>
								<th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
									shortURL
								</th>
							</tr>
						</thead>
						<tbody className="bg-white dark:bg-slate-800">
							<Cells />
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
const Home: NextPage = () => {
	const [urlVal, setUrlVal] = useState("");
	const [validationErr, setValidationErr] = useState("");
	const [data, setData] = useState<ResponseData>();

	const mutation = useMutation(postURL, {
		onSuccess: (data) => {
			console.log(data);
			setData(data);
		},
		onError: (err: Error) => {
			console.log(err.message);
			setValidationErr(err.message);
		},
	});

	function handleShorten(e: React.SyntheticEvent) {
		e.preventDefault();
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
				<form onSubmit={(e: React.SyntheticEvent) => handleShorten(e)}>
					<URLInput
						value={urlVal}
						setUrlVal={(val: string) => setUrlVal(val)}
					/>
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
							className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
						>
							shorten
						</button>
					</div>
				</form>
				<div>
					{!!validationErr ? (
						<div>Err: {validationErr}</div>
					) : (
						data && <Output shortURL={data.shortURL} />
					)}
				</div>
				<ShortTable />
			</div>
		</div>
	);
};

export default Home;
