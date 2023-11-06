/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

function JoinUs(props: any) {
  const { imageUrl, paragraphText, linkPath, linkText } = props;

  return (
    <Link href={linkPath}>
      <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow-md dark:bg-gray-800 dark:border-gray-700'>
        <img className='w-[400px] h-[250px] rounded' src={imageUrl} alt=''/>
        <p className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{paragraphText}</p>
        <p className='inline-flex items-center px-3 py-3 text-sm font-medium text-center text-green-600 bg-green-200 rounded-lg hover:bg-green-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>{linkText}
        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        </p>
        
      </div>
    </Link>
  );
}

export default JoinUs;
