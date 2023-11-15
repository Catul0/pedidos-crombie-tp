/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

function JoinUs(props: any) {
  const { imageUrl, paragraphText, linkPath, linkText } = props;

  return (
    <Link href={linkPath}>
      <div className="w-full md:max-w-md p-6 bg-white border border-gray-300 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700 transform hover:scale-105 transition-transform">
        <div className="relative overflow-hidden rounded-lg h-52">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={imageUrl}
            alt=""
          />
        </div>
        <div className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
          {paragraphText}
        </div>
        <div className="mt-2 flex items-center transition-transform transform hover:scale-105">
          <button className="px-4 py-2 text-sm font-semibold text-green-100 bg-green-500 rounded-lg transition-all hover:bg-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-green-600 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-2 dark:focus:ring-offset-2 dark:focus:ring-blue-800">
            {linkText}
          </button>
          <svg
            className="w-6 h-6 ml-2 text-gray-900 dark:text-white transition-transform transform hover:rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default JoinUs;
