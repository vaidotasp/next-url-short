import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const URLInput = () => {
	return (
		<>
			<input
				className="border-dashed border-2 border-fuchsia-300 w-96 p-1"
				type="text"
			/>
			<div className="flex flex-row gap-2 mt-2">
				<button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
					clear
				</button>
				<button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
					shorten
				</button>
			</div>
		</>
	);
};

const Home: NextPage = () => {
	return (
		<div className="flex flex-col gap-3 justify-start w-screen h-screen">
			<div className="p-3 items-center flex flex-col">
				<h2 className="text-3xl text-blue-500 self-center mt-6 mb-6">
					URL Shortener
				</h2>
				<URLInput />
			</div>
		</div>
	);
};

export default Home;
