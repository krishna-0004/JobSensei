import React from 'react'
import { SquarePlay, BookType, CircleCheck, Headphones, Languages, BriefcaseBusiness, FileUser, Search  } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function IntanDashboard() {
  return (
    <>

      <section className="m-4">
        <div className="">
          <h1 className="text-3xl font-bold mt-8">Welcome, Name </h1>

          <p className="text-sm mt-2">AI Career Paths</p>
        </div>

        <div className="grid grid-cols-4">

          <div className="col-span-3">
            <div className="mt-6">
              <h2 className="font-bold ">Recommended Videos For You</h2>

              <div className="grid grid-cols-5 items-center mt-4">
                <Link to="">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="p-2 bg-sky-200 rounded-4xl">
                      <SquarePlay className='size-14' />
                    </div>
                    <h2 className="font-bold ">Title</h2>
                  </div>
                </Link>

                <Link to="">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="p-2 bg-sky-200 rounded-4xl">
                      <SquarePlay className='size-14' />
                    </div>
                    <h2 className="font-bold ">Title</h2>
                  </div>
                </Link>

                <Link to="">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="p-2 bg-sky-200 rounded-4xl">
                      <SquarePlay className='size-14' />
                    </div>
                    <h2 className="font-bold ">Title</h2>
                  </div>
                </Link>

                <Link to="">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="p-2 bg-sky-200 rounded-4xl">
                      <SquarePlay className='size-14' />
                    </div>
                    <h2 className="font-bold ">Title</h2>
                  </div>
                </Link>

                <Link to="">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="p-4 bg-sky-200 rounded-4xl">
                       <p className="text-xl font-bold">More</p>
                    </div>

                  </div>
                </Link>
              </div>
            </div>

            <div className="my-4">
                <div className="bg-sky-200 p-6 rounded-3xl">
                    <div className="flex justify-start items-center gap-4">
                      <BriefcaseBusiness/>
                      <h1 className='font-bold'>Tranding Jobs</h1> 
                    </div>

                    <div className="mt-2">
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               
                <div class="job-card bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition duration-300 hover:shadow-md">
                    <div class="p-3">
                        <div class="flex items-center mb-2">
                            
                            <div class="ml-4">
                                <h3 class="font-medium text-gray-900">Sales Executive</h3>
                                <p class="text-sm text-gray-500">Local Retail Chain</p>
                            </div>
                        </div>
                        <div class="mb-4">
                            
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
                                ₹15k - ₹20k/month
                            </span>
                        </div>
                       
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Communication</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Sales</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Customer Service</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">Match: 82%</span>
                            
                        </div>
                    </div>
                </div>
                
               
                <div class="job-card bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition duration-300 hover:shadow-md">
                    <div class="p-3">
                        <div class="flex items-center mb-2">
                            
                            <div class="ml-4">
                                <h3 class=" font-medium text-gray-900">Junior Web Developer</h3>
                                <p class="text-sm text-gray-500">Digital Agency</p>
                            </div>
                        </div>
                        <div class="mb-4">
                           
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
                                ₹18k - ₹25k/month
                            </span>
                        </div>
                        
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">HTML</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">CSS</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">JavaScript</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">Match: 76%</span>
                            
                        </div>
                    </div>
                </div>
                
               
                <div class="job-card bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition duration-300 hover:shadow-md">
                    <div class="p-3">
                        <div class="flex items-center mb-2">
                           
                            <div class="ml-4">
                                <h3 class=" font-medium text-gray-900">Content Writer</h3>
                                <p class="text-sm text-gray-500">Education Startup</p>
                            </div>
                        </div>
                        <div class="mb-4">
                           
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
                                ₹12k - ₹18k/month
                            </span>
                        </div>
                       
                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Writing</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Research</span>
                            <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Local Language</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">Match: 88%</span>
                            
                        </div>
                    </div>
                </div>
            </div>
                    </div>
                </div>
            </div>

            <div className="">
                <h3 className="font-bold">Skill Building</h3>

                <div className="mt-2">
                  <div className="grid grid-cols-5 items-center ">
                   
                    <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center gap-2 p-4 bg-sky-200 rounded-full">
                      <h3 className="font-bold">Learning</h3>
                      <BookType className='size-8'/>
                    </div>
                    </div>

                    <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center gap-2 p-4 bg-sky-200 rounded-full">
                      <h3 className="font-bold">Language</h3>
                      <Languages  className='size-8'/>
                    </div>
                    </div>

                    <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center gap-2 p-4 bg-sky-200 rounded-full">
                      <h3 className="font-bold">Skill</h3>
                      <Headphones  className='size-8'/>
                    </div>
                    </div>

                    <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-center items-center gap-2 p-4 bg-sky-200 rounded-full">
                      <h3 className="font-bold">Career</h3>
                      <CircleCheck  className='size-8'/>
                    </div>
                    </div>


                  </div>
                </div>
            </div>

          </div>

          <div className=" px-6">
                <div className="">
                  <div className="bg-sky-500 text-white p-4 py-10  rounded-3xl flex justify-center flex-col items-center gap-4">
                    <div className="">
                      <FileUser className='size-10' />
                    </div>
                        <h2 className="text-center">Job-Winning Resume</h2>
                        
                  </div>

                  

                  <div className="mt-10">
                        <div className="flex justify-between items-center">
                        <div className="flex justify-start gap-4">
                        <Search />
                        <h1 className="font-bold">Find Jobs </h1>

                        </div>

                        <div className="">
                          <button className="text-sm bg-gray-300 p-2 rounded-3xl">See All</button>
                        </div>
                        </div>

                        <div className="flex flex-col ">
                          <div className="bg-sky-200 p-2 rounded-4xl flex flex-col justify-start ">
                              <p className="">Jobs</p>
                              <img src="/Images/google.png" alt="google" className="w-6" />
                              <p className="">Google</p>
                          </div>
                        </div>
                  </div>
                </div>
          </div>

        </div>
      </section>


    </>
  )
}
