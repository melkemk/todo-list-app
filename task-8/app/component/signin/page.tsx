'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

const Separator = () => {
  return (
    <div className="flex items-center my-6">
      <div className="flex-grow border-t border-slate-300"></div>
      <span className="mx-4 text-slate-600">Or Sign Up with Email</span>
      <div className="flex-grow border-t border-slate-300"></div>
    </div>
  );
};

function Signin() {
  const router = useRouter()
  // console.log(Cookies.get('user'))
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { data: session } = useSession(); 
  // console.log(session,'from signin');
  const onSubmit = async (data: { email: any; password: any; }) => {
    // console.log(data);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
  
      if (result?.ok) {
       
        router.push('/');
      } else {
        throw new Error(result?.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  

  return (
    <div>
      <div className="flex justify-center h-auto align-middle text-base sm:mt-[141px]  mt-[1px] mb-[100px]">
        <div className="flex flex-col max-w-[408px] gap-[24px]">
          <h1 className="font-poppins text-4xl font-extrabold leading-[38.4px] text-center">
            Welcome Back,
          </h1>
          
          <form action="" className="flex flex-col max-w-[408px] gap-[24px]" onSubmit={handleSubmit(onSubmit)}>

            <div className="w-[408px] h-max    gap-[8px] text-slate-600 flex flex-col">
              <div style={{ fontWeight: "600", fontStyle: "Epilogue" }}>
                Email Address
              </div>
              <input
                className="w-[408px] border border-gray-300 p-2 rounded"
                type="email"
                placeholder="Enter Email Address"
                {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            
            </div>

            <div className="w-[408px] h-max    gap-[8px] text-slate-600 flex flex-col">
              <div style={{ fontWeight: "600", fontStyle: "Epilogue" }}>
                Password
              </div>
              <input
                className="w-[408px] border border-gray-300 p-2 rounded"
                type="password"
                placeholder="Enter Password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

           

            <input
              type="submit"
              className="w-[408px] h-[50px] p-[12px_24px] gap-[10px] rounded-[80px] flex items-center justify-center text-center"
              style={{
                backgroundColor: "rgba(70, 64, 222, 1)",
                borderWidth: "1px",
                borderStyle: "solid",
                color: "white",
              }}
              value="Continue"
            />
          </form>
          <div className="text-gray-800">
            Already have an account?{" "}
            <span className="text-indigo-600">Login </span>
          </div>
         
        </div>
      </div>
    </div>
  ); 
} 
 
export default Signin; 