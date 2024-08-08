'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../axiosConfig'; 
import { useDispatch, useSelector } from 'react-redux';
import { setFullName, setEmail, setPassword } from '../../redux/registrationSlice';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const Separator = () => {
  return ( 
    <div className="flex items-center my-6">
      <div className="flex-grow border-t border-slate-300"></div>
      <span className="mx-4 text-slate-600">Or Sign Up with Email</span>
      <div className="flex-grow border-t border-slate-300"></div>
    </div>
  );
};


function Signup() {

  const { data: session } = useSession();
  const router = useRouter();
  const [userexist,setUserexist] = useState(false)
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  useEffect(() => {
    if (session?.user?.email) {
      dispatch(setEmail(session.user.email));
      router.push('/component/otp');
    }
  }, [ dispatch, router]);
  
  const onSubmit = async (data) => {

    console.log(data)
    try {
      const response = await axiosInstance.post('/signup', {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(response,102)
      dispatch(setFullName(data.name));
      dispatch(setEmail(data.email));
      dispatch(setPassword(data.password));
      router.push('/component/otp');
    } catch (error) {
      setUserexist(true)
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  const password = watch('password');

   
  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-center h-auto align-middle text-base mt-[34px] mb-[64px]">
        <div className="flex flex-col max-w-[408px] gap-[24px]">
          <p className="font-poppins text-4xl font-extrabold leading-[38.4px] text-center">
            Sign Up Today!
          </p>
          <div onClick={handleGoogleSignIn}
            className="flex w-[408px] h-[50px] p-[12px_16px] gap-[10px] border-t border-r border-b border-l justify-center"
            style={{ borderColor: "rgba(214, 221, 235, 1)" }}
          >
            <Image
              src="/IcongoogleIcon.svg"
              alt="Google Icon"
              width={20}
              height={20}
            />
            <div className="text-indigo-600"   >Sign Up with Google</div>
          </div>
          <Separator />
          <form
            className="flex flex-col max-w-[408px] gap-[24px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-[408px] h-max gap-[8px] text-slate-600 flex flex-col">
              <div style={{ fontWeight: "600", fontStyle: "Epilogue" }}>
                Full Name
              </div>
              <input
                className="w-[408px] border border-gray-300 p-2 rounded"
                type="text"
                placeholder="Enter your full name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="w-[408px] h-max gap-[8px] text-slate-600 flex flex-col">
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

            <div className="w-[408px] h-max gap-[8px] text-slate-600 flex flex-col">
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

            <div className="w-[408px] h-max gap-[8px] text-slate-600 flex flex-col">
              <div style={{ fontWeight: "600", fontStyle: "Epilogue" }}>
                Confirm Password
              </div>
              <input
                className="w-[408px] border border-gray-300 p-2 rounded"
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: 'Confirm password is required',
                  validate: value => value === password || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
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
{userexist && <p className="text-red-500">user already exist <span className="text-indigo-600">Login </span>
  instead</p>}

          </form>
          <div className="text-gray-800">
            Already have an account?{" "}
            <span className="text-indigo-600">Login </span>
          </div>
          <div className="text-[14px] text-slate-500">
            By clicking 'Continue', you acknowledge that you have read and
            accepted our{" "}
            <span className="text-indigo-600"> Terms of Service </span> and{" "}
            <span className="text-indigo-600"> Privacy Policy. </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
