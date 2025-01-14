'use client';

import {
  Bars3Icon,
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Drawer } from '../drawer';
import { MobileSearchBar } from '../search';

export const MobileHeader = () => {
  const [openSearchBar, setOpenSearchBar] = useState(false);

  return (
    <header className="shadow-header">
      <MobileSearchBar {...{ openSearchBar, setOpenSearchBar }} />
      <div className="container flex items-center justify-between md:py-1 gap-10">
        <div className="flex items-center gap-x-1">
          <Drawer>
            <button title='menu' type='button' className="py-2 px-3 transition duration-300 hover:bg-gray-100">
              <Bars3Icon className="w-7 h-7" />
            </button>
          </Drawer>
          <Link href="/" className="h-14 block aspect-video relative">
            <Image src="/aafiyah-logo.svg" fill alt="Aafiyah Logo" />
          </Link>
        </div>
        <div className="relative max-w-lg w-full hidden md:block">
          <input
            type="text"
            className="bg-gray-100 w-full border-gray-100 px-3 py-2 rounded focus:ring-0 focus:border-gray-300 focus:bg-white focus:outline-none"
            placeholder="Search anything you want"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 cursor-pointer">
            <MagnifyingGlassIcon className="w-6 h-6 stroke-[2px]" />
          </div>
        </div>
        <div className="flex items-center">
          <Link
            href="/"
            className="py-2 px-3 transition duration-300 hover:bg-gray-100 hidden md:inline-block"
          >
            <UserIcon className="w-6 h-6" />
          </Link>
          <Link
            href="/wishlist"
            className="py-2 px-3 transition duration-300 hover:bg-gray-100 hidden md:inline-block"
          >
            <HeartIcon className="w-6 h-6" />
          </Link>
          <button
            onClick={() => setOpenSearchBar(true)}
            type="button"
            title='search'
            className="py-2 px-3 transition duration-300 hover:bg-gray-100 md:hidden"
          >
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>
          <Link
            href="/cart"
            className="py-2 px-3 transition duration-300 hover:bg-gray-100 relative"
          >
            <ShoppingBagIcon className="w-6 h-6" />
            <small className="absolute top-0 left-8 text-white min-w-[20px] flex items-center justify-center bg-red-500 rounded-full">
              0
            </small>
          </Link>
        </div>
      </div>
    </header>
  );
};
