'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/axiosConfig';

function Otp() {
  const email = useSelector((state) => state.registration.email);
  const router = useRouter();
  const inputRefs = useRef<HTMLInputElement[]>([]);

  if (!email) {
    router.push('/component/signup');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSeconds(30);

    try {
      const response = await axiosInstance.post('/verify-email', {
        otp: values.join(''),
        email: email,
      }
    
    );

    router.push('/');

    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
    }
  };

  const [seconds, setSeconds] = useState(30);
  const [values, setValues] = useState(Array(4).fill(''));

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [seconds]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newValues = values.map((val, i) => (i === index ? value : val));
    setValues(newValues);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      <div className="flex justify-center h-auto align-middle text-base sm:mt-[141px] mt-[10px] mb-[100px]">
        <div className="flex flex-col max-w-[408px] gap-[24px]">
          <p className="font-poppins text-4xl font-extrabold leading-[38.4px] text-center">
            Verify Email
          </p>
          <div className="text-[14px] text-slate-500">
            We've sent a verification code to the email address you provided.
            To complete the verification process, please enter the code here.
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col max-w-[408px] gap-[24px]">
            <div className="flex max-w-[408px] gap-[24px]">
              {values.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-[76px] border border-gray-300 p-2 rounded text-center text-[34px] height-[50px]"
                  type="text"
                  maxLength={1}
                  placeholder="0"
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>

            <div className="text-gray-800 text-[14px]">
              <center>
                <p>
                  You can request to{' '}
                  <span
                    className="text-indigo-600"
                    style={{
                      backgroundColor: seconds < 0 ? 'rgba(70, 64, 222, 1)' : 'rgba(70, 64, 222, 0.3)',
                    }}
                  >
                    <button className="border-none bg-white">Resend code in</button>
                  </span>
                </p>
                <p>
                  <span className="text-indigo-600">
                    00: {seconds < 10 ? `0${seconds}` : seconds}
                  </span>
                </p>
              </center>
            </div>

            <input
              type="submit"
              className="w-[408px] h-[50px] p-[12px_24px] gap-[10px] rounded-[80px] flex items-center justify-center"
              style={{
                backgroundColor: values.map((value) => value.trim()).join('').length === 4? 'rgba(70, 64, 222, 1)' : 'rgba(70, 64, 222, 0.3)',
                borderWidth: '1px',
                borderStyle: 'solid',
                color: 'white',
              }}
              value="Continue"
              disabled={  values.map((value) => value.trim()).join('').length !== 4}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Otp;
