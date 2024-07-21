import React from 'react';
import { HiOutlineHeart, HiOutlineSearch, HiOutlineUser, HiOutlineShoppingCart } from "react-icons/hi";


export default function Header() {
    return (
      <header className="bg-white">
        <div className="mx-auto flex flex-col sm:flex-row justify-between items-center py-6 px-6 py-6">
          <div className="flex items-center mb-4 sm:mb-0">
          {/* <a href="/" className="text-gray-800" style={{ fontSize: 36, fontFamily: 'Open Sans' }}>kalles</a> */}
          <a href="/" className="text-xl font-extrabold text-gray-800" style={{ fontSize: 36 }}>kalles</a>
          </div>
  
          {/* Navigation Section */}
          <div className="flex-grow flex justify-center">
            <nav className="flex justify-center items-center space-x-4 sm:space-x-8">
              <a href="/" className="text-gray-800 hover:text-blue-300 py-2 sm:py-0">Home</a>
              <div className="relative group">
                <a href="/categories" className="text-gray-800 hover:text-blue-300 py-2 sm:py-0">Categories</a>
                <div className="absolute left-0 hidden mt-2 w-48 bg-white border border-gray-200 shadow-lg group-hover:block">
                  <a href="/categories/category1" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Dress</a>
                  <a href="/categories/category2" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Women</a>
                  <a href="/categories/category3" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Men</a>
                  <a href="/categories/category4" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Watch</a>
                  <a href="/categories/category5" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Shoes</a>
                </div>
              </div>
              <a href="/shop" className="text-gray-800 hover:text-blue-300 py-2 sm:py-0">New Arrival</a>
              <a href="/contact" className="text-gray-800 hover:text-blue-300 py-2 sm:py-0">Contact</a>
            </nav>
          </div>
  
          {/* Icons Section */}
          <div className="flex flex-row justify-center sm:justify-end items-center space-x-3 mt-3 sm:mt-0">
            <span className="text-3xl text-gray-800 hover:text-blue-300 sm:hidden">
              <HiOutlineSearch />
            </span>
            <span className="text-3xl text-gray-800 hover:text-blue-300 sm:hidden">
              <HiOutlineUser />
            </span>
  
            {/* Icons visible on larger screens */}
            <span className="text-2xl text-gray-800 hover:text-blue-300 hidden sm:inline-block">
              <HiOutlineSearch />
            </span>
            <span className="text-2xl text-gray-800 hover:text-blue-300 hidden sm:inline-block">
              <HiOutlineUser />
            </span>
            <span className="text-2xl text-gray-800 hover:text-blue-300 hidden sm:inline-block">
              <HiOutlineHeart />
            </span>
            <span className="text-2xl text-gray-800 hover:text-blue-300 hidden sm:inline-block">
              <HiOutlineShoppingCart />
            </span>
          </div>
        </div>
      </header>
      );
  };
  