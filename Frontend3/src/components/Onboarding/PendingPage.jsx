import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';



const PendingPage = () => {


    useGSAP(()=>{
      gsap.from("p",{
        opacity:0,
        y:30,
        duration:2,
        delay:0.5,
        stagger:0.3
      })
    })

  return (
    <>
    
      <section className="">
        <div className="h-screen flex flex-col gap-4 justify-center items-center bg-[#F0F9FF] font-bold text-center">
       
      <p className='text-3xl' >Your profile is under review</p>
      <p className='text-xl'>
        Thank you for submitting your details. Our admin team will review your profile shortly.
        You’ll be notified once your profile is approved.
      </p>
      <p className='text-xl'>Please check back later or watch your email for updates.</p>
   
        </div>
      </section>
    
    </>
  );
};

export default PendingPage;
