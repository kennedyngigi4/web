"use client"

import React from 'react';
import Link from 'next/link';
import { FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaQuestion, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Image from 'next/image';

const Footer = () => {

  return (
    <section className="flex flex-col bg-gray-900 py-10 px-10 md:px-[50px]">
      <a href="https://wa.me/message/VBGK2QIY5626P1" target="_blank" className="fixed flex justify-center items-center bottom-5 right-2 bg-green-500 p-2 rounded-4xl text-white shadow-2xl text-sm"><FaWhatsapp size="28" className="" /></a>
      <div className="grid md:grid-cols-3 grid-cols-1 text-white gap-8 max-md:ps-1">
        <div className="pb-10 flex flex-col justify-center space-y-5">
          <div>
            <Image src="/logo.png" alt="KENAUTOS HUB" width={200} height={50} />
            <h2 className="text-xl max-md:text-sm">Your Trusted Car Marketplace</h2>
          </div>

          <div className="flex flex-row space-x-3.5">
            <a href="https://www.facebook.com/kenautoske/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.instagram.com/kenautoshub/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://x.com/kenautos_ke" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href="https://www.tiktok.com/@kenautoshub" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          </div>
        </div>
        <div className="pb-10">
          <h1 className="text-xl font-semibold">Company</h1>
          <nav className="">
            <ul className="flex flex-col space-y-5">
              <li className="pt-2">
                <Link href="about-us">About Us</Link>
              </li>
              <li>
                <Link href="/car-blogs-news">News & Blogs</Link>
              </li>
              <li>
                <Link href="/partnership-relations">Investor / Partnership Relations</Link>
              </li>
              <li>
                <Link href="/terms-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="pb-10">
          <h1 className="text-xl font-semibold">Help & Support</h1>
          <nav className="">
            <ul className="flex flex-col space-y-5">
              <li className="pt-2">
                <Link href="/frequently-asked-questions" className="flex items-center"><FaQuestion className="mr-2" /> Frequently Asked Questions</Link>
              </li>
              <li>
                <a href="tel:+254 110 276 248" target="_blank" rel="noopenner noreferrer" className="flex items-center"><FaPhone className="mr-2" />  +254 110 276 248</a>
              </li>
              <li>
                <a href="https://wa.me/message/VBGK2QIY5626P1" target="_blank" rel="noopenner noreferrer" className="flex items-center"><FaWhatsapp className="mr-2" /> +254 110 276 248</a>
              </li>
              <li>
                <a href="mailto:support@kenautos.co.ke" target="_blank" rel="noopenner noreferrer" className="flex items-center"><FaEnvelope className="mr-2" /> support@kenautos.co.ke</a>
              </li>
              
            </ul>
          </nav>
        </div>
      </div>
      <div className="text-foreground flex md:flex-row flex-col max-md:text-center justify-evenly items-center">
        <p className="text-white flex flex-row max-md:flex-col space-y-3"><span>&copy; 2026 <span className="font-bold px-1">KENAUTOS HUB</span></span> All Rights Reserved</p>
        <div className="flex items-center justify-center">
          <p className="text-white">Powered by <a href="https://adflex.co.ke" target="_blank" rel="noopener noreferrer" className="font-extrabold text-orange-400 me-6">Adflex Solutions</a></p>
          
        </div>
      </div>
    </section>
  )
}

export default Footer