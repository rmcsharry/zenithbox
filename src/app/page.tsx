"use client"

import Prompt from '@/components/Prompt';
import { useState } from 'react';

export default function Home() {


  return (
    <main>
      <div className="grid grid-cols-3 h-[calc(100vh-64px)] w-full">
        <div></div>
        <div>
          <h3 className="my-8 scroll-m-20 text-2xl font-semibold tracking-tight">Please enter the intial prompt below and hit save.</h3>
          <Prompt label="Initial Prompt"/>
          <p className="mt-6 italic">You can return to the home page to edit this at any time, and new chats will then use it.</p>
        </div>
        <div></div>
      </div>
    </main>
  );
}
