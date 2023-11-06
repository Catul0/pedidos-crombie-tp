/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

function JoinUs(props: any) {
  const { imageUrl, paragraphText, linkPath, linkText } = props;

  return (
    <Link href={linkPath}>
      <div className='max-w-sm p-6 bg-white border border-gray-300 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700'>
        <img className='w-full h-40 object-cover rounded' src={imageUrl} alt=''/>
        <p className='mt-4 text-xl font-bold text-gray-900 dark:text-white'>{paragraphText}</p>
        <p className='mt-2 px-4 py-2 text-sm font-semibold text-green-600 bg-green-200 rounded-lg transition duration-300 transform hover:bg-green-500 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-green-600 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-2 dark:focus:ring-offset-2 dark:focus:ring-blue-800'>{linkText}
        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </p>
        
      </div>
    </Link>
  );
}

export default JoinUs;
