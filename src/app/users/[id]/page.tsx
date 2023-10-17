"use client"
import React from 'react';
import UserProfile from '@/components/user/UserProfile';

export default function UsersProfile({ params }: { params: { id: string } }) {
    return(
      <div>
        <UserProfile params={params} />
      </div>
    ) 
}