import React from 'react'
import { LaptopMinimal, User, LayoutDashboard, BriefcaseBusiness, GraduationCap, UserRoundPen, BookOpenCheck, LogOut      } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
    
        <section className="text-black w-1/6 font-RS p-6 m-2 md:h-[97vh] rounded-2xl bg-[#E8EAEE]">
            <nav className="flex flex-col gap-4">
                <div className="flex justify-start gap-6 items-center ">
                    <User className=' border-2 border-black rounded-2xl size-7 p-1 font-bold bg-white'/>

                    <h3 className="">User Name</h3>
                    
                </div>

                <ul className="mt-5 flex flex-col gap-4">
                  <li className="">
                   <Link className="flex justify-start items-center gap-6">
                   <span className=""><LayoutDashboard/></span>
                   <span className=''>Dashboard</span>
                   </Link>
                  </li>

                  <li className="">
                   <Link className="flex justify-start items-center gap-6">
                   <span className=""><BriefcaseBusiness /></span>
                   <span className=''>Jobs</span>
                   </Link>
                  </li>

                  <li className="">
                   <Link className="flex justify-start items-center gap-6">
                   <span className=""><GraduationCap /></span>
                   <span className=''>Mentors</span>
                   </Link>
                  </li>

                  <li className="">
                   <Link className="flex justify-start items-center gap-6">
                   <span className=""><UserRoundPen /></span>
                   <span className=''>Profile</span>
                   </Link>
                  </li>

                  <li className="">
                   <Link className="flex justify-start items-center gap-6">
                   <span className=""><BookOpenCheck /></span>
                   <span className=''>Mock Interview</span>
                   </Link>
                  </li>

                  



                </ul>

                <ul className='flex flrx'>
                <li className="">
                   <Link className="flex justify-start items-center gap-6">
                   <span className=""><LogOut /></span>
                   <span className=''>Sign Out</span>
                   </Link>
                  </li>
                </ul>


            </nav>
        </section>
    
    </>
  )
}
