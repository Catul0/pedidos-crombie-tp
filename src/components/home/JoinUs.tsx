/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

function JoinUs(props: any) {
  const { imageUrl, paragraphText, linkPath, linkText } = props;

  return (
    <Link href={linkPath}>
      <div className='w-[400px] relative group'>
        <img className='w-[400px] h-[250px] rounded' src={imageUrl} alt=''/>
        <p className='text-black text-2xl font-bold'>{paragraphText}</p>
        <p className='text-black text-1xl font-bold group-hover:underline'>{linkText}</p>
      </div>
    </Link>
  );
}

export default JoinUs;
