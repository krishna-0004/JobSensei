import React, { useEffect, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Login = () => {
  const loginWithGoogle = () => window.open('http://localhost:4000/auth/google', '_self');
  const loginWithLinkedIn = () => window.open('http://localhost4000/auth/linkedin', '_self');
  const loginWithGitHub = () => window.open('http://localhost:4000/auth/github', '_self');

  const googleRef = useRef();
  const githubRef = useRef();
  const linkedinRef = useRef();

  useEffect(() => {
    const animateGradient = (ref) => {
      gsap.to(ref.current, {
        backgroundPosition: "200% 0%",
        duration: 4,
        repeat: -1,
        ease: "linear",
      });
    };

    animateGradient(googleRef);
    animateGradient(githubRef);
    animateGradient(linkedinRef);
  }, []);

  const tl = gsap.timeline();

  useGSAP(() => {

    tl.from("#left ", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.1,

      stagger: 0.5,

    })


    tl.from("#logo div", {
      opacity: 0,
      y: 20,
      duration: 0.2,
      stagger: 0.5,

    })

    tl.from("#login div", {
      y:20,
      opacity:0,
      duration:0.5,
      stagger:0.2,
    })


  })




  return (



    <>

      <section className="overflow-hidden" >
        <div className="grid md:grid-cols-2 font-RS bg-black  ">
          <div
            className=" md:h-screen max-md:w-screen  md:block  bg-cover bg-center text-white p-10 md:pr-44"
            style={{ backgroundImage: `url(/Images/login2.png)` }}
            id="left"
          >
            <h1 className="font-bold text-center text-4xl ">Welcome To</h1>

            <div className="p-5  flex justify-center items-center flex-col gap-2 mt-20 ">

              <div id="logo" className="border-2 border-white p-6 rounded-full">
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="w-32 h-24 border-10 border-white rounded-2xl ">

                  </div>
                  <div className="w-28  border-6 rounded-br-full rounded-bl-full"></div>
                </div>
              </div>

              <h1 className="text-3xl font-bold">
                JobSensie
              </h1>
            </div>

            <div className="mt-10 flex justify-center items-center md:px-20">

              <p className="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti ipsum obcaecati molestias, odit rerum asperiores, magnam a voluptas distinctio sed officiis! Iste molestias mollitia aperiam et, dicta aliquid odit obcaecati!</p>


            </div>

          </div>
          <div className=" bg-black text-white flex flex-col justify-center items-center">



            <div className=" w-full md:max-w-md mx-auto bg-white/10 backdrop-blur-3xl rounded-3xl md:p-10 max-md:py-10 max-md:px-5 border border-white/20 shadow-lg " id="login">
              <div className="">
                <h1 className="text-4xl font-bold text-center">LogIn</h1>

                <div className="flex flex-col items-center justify-center gap-10 mt-10 ">


                  <div
                    ref={googleRef}
                    className="p-0.5 rounded-[2rem] bg-gradient-to-r from-red-500 via-blue-500 to-yellow-300 
                   bg-[length:200%_200%] bg-[position:0%_0%]"
                  >
                    <button
                      onClick={loginWithGoogle}
                      className="bg-black text-white flex justify-center items-center gap-4 py-2 px-10 
                     rounded-[2rem] font-semibold shadow-md"
                    >
                      <img src="/Images/google.png" alt="Google" className="w-8 h-8" />
                      <span>Continue With Google</span>
                    </button>
                  </div>

                  {/* GitHub */}
                  <div
                    ref={githubRef}
                    className="p-0.5 rounded-[2rem] bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-400 
                   bg-[length:200%_200%] bg-[position:0%_0%]"
                  >
                    <button
                      onClick={loginWithGitHub}
                      className="bg-black text-white flex justify-center items-center gap-4 py-2 px-10 
                     rounded-[2rem] font-semibold shadow-md"
                    >
                      <img src="/Images/github.png" alt="GitHub" className="w-8 h-8" />
                      <span>Continue With GitHub</span>
                    </button>
                  </div>

                  {/* LinkedIn */}
                  <div
                    ref={linkedinRef}
                    className="p-0.5 rounded-[2rem] bg-gradient-to-r from-blue-500 via-white to-yellow-300 
                   bg-[length:200%_200%] bg-[position:0%_0%]"
                  >
                    <button
                      onClick={loginWithLinkedIn}
                      className="bg-black text-white flex justify-center items-center gap-4 py-2 px-10 
                     rounded-[2rem] font-semibold shadow-md"
                    >
                      <img src="/Images/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
                      <span>Continue With LinkedIn</span>
                    </button>
                  </div>



                </div>
              </div>
            </div>
          </div>

        </div>
      </section>


    </>

  );
};

export default Login;
