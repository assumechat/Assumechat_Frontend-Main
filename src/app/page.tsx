"use client"
import { useRef, useEffect } from 'react';
import Head from 'next/head';
import HeroSection from '@/components/Home/HeroSection';
import HowItWorksSection from '@/components/Home/HowitWorks';
import ExperienceSection from '@/components/Home/EXPSection';
import cards from '@/Data/Howitworks';
import privactcard from "@/Data/Privary"
import TestimonialsSection from '@/components/Home/Testimonials';
import FnQsection from '@/components/Home/FnQs';
import Universities from '@/components/Home/Universities';
import HowItWorks from '@/components/Home/what-is-trust-game';
import CommunityStories from '@/components/Home/OurCommunitySection';
export default function LandingPage() {

  

  return (
    <>
      <HeroSection />
      <HowItWorks/>
      <CommunityStories/>
      <TestimonialsSection/>
      <FnQsection/>
    </>
  );
}
