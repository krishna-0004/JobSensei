import React, { useEffect } from 'react';
import { LaptopMinimal } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Home = () => {

useGSAP(()=>{
  
  gsap.from("section div",{
    opacity:0,
    y:20,
    duration:1,
    stagger:0.5
  })



})
  
useEffect(() => {



  gsap.to("#gradientBg", {
    backgroundPosition: "200% center",
    ease: "none",
    repeat: -1,
    duration: 5,
    backgroundImage: "linear-gradient(270deg, #3b82f6, #8b5cf6, #ec4899)",
    backgroundSize: "400% 400%",
  });






}, []);
  return (
    <>

      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/Images/homevideo.mp4" type="video/mp4" />

        </video>

      

        {/* Content */}
        <div className="relative z-20 px-10 py-5 font-RS text-white">
          <div className="">
            <div className="flex justify-between items-center">
              <LaptopMinimal className='text-white size-20' />

              <Link to="/login" id='#log'><button className="px-10 py-2 font-bold text-white rounded-full border-2 border-violet-400 hover:bg-white/10 hover:backdrop-blur-3xl hover:text-shadow-white transition duration-150 ">Log In</button></Link>
            </div>

            <div className="h-[80vh] flex flex-col justify-center gap-4  w-1/2">

              <h1 className="text-6xl font-bold tracking-wider">JOB <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent ">Sensei</span></h1>

              <p className="leading-8 text-lg ">
                JobSensei is a smart job search and career guidance platform designed for users from Tier-2 and Tier-3 cities. It not only helps you find the right jobs based on your skills but also suggests the most relevant YouTube videos to guide your learning and career growth.
              </p>


              <Link to="/login" className="mt-20">
                <button
                  id="animatedBtn"
                  className="px-10 py-2 font-bold text-xl text-white rounded-full border-2 border-violet-400 relative overflow-hidden z-10 hover:scale-110 transition duration-150"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-lg opacity-40 animate-none z-0" id="gradientBg"></span>
                  <span className="relative z-10">Get Start</span>
                </button>
              </Link>

            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0" >
          <img src="/Images/homebg.png" alt="" className="w-4xl" />
        </div>
      </section>

    </>
  );
};

export default Home;
