"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default function Intro() {

  return (
    <section
      id="home"
      className="mb-20 text-center sm:mb-0 scroll-mt-[120rem]"
    >
      <motion.h1
        className="mb-6 mt-3 w-full text-5xl font-bold !leading-[1] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-lg sm:text-3xl italic tracking-widest">Where world meets!!</span>
        <div className="flex justify-center text-7xl space-y-4 mt-5 mb-5 sm:text-9xl">
          SLACK
        </div>
      </motion.h1>

      <motion.div
        className="flex flex-col items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >

        <motion.div className="flex space-x-4">
          <Link
            href="/chat"
            className="group bg-gradient-to-r from-[#ff7f50] via-[#ffaf40] to-[#ff7f50] text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:from-[#ffaf40] hover:to-[#ff7f50] active:scale-105 transition shadow-lg"
          >
            Chat{" "}
            <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
          </Link>

          <Link
            className="group bg-[#f0f0f0] hover:bg-[#e0e0e0] text-gray-900 px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition shadow-lg cursor-pointer border-2 border-[#f0f0f0] dark:bg-[#1a1a1a] dark:text-white dark:border-white dark:hover:bg-[#0d0d0d] dark:hover:border-white"
            href="/about-us"
            download
          >
            About Us{" "}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
