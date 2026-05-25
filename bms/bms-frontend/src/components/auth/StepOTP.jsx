import { useRef, useState } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

const StepOTP = ({ onNext }) => {
  const [otpArray, setOtpArray] = useState(new Array(4).fill(""));  //["", "", "", ""]
  const inputRef = useRef([]);
  const { verifyOtpRequest } = useAuth();

  const { displayTime, isExpired } = useCountdown({
    initialTimeInSeconds: 2 * 60,
  });

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otp = parseInt(otpArray.join(""), 10);
    verifyOtpRequest({otp, onNext});
  };

  const handleResendOtp = (e) => {
    e.preventDefault();
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) {//allows only single "digit" and empty string
      return;
    }

    const newOtp = [...otpArray];

    newOtp[index] = value;

    setOtpArray(newOtp);

    if (value && index < (otpArray.length - 1)) { // if digit entered , move to next input 
      inputRef.current[index + 1]?.focus();
    }
  };


  //backspace removal of otp functionality
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otpArray[index]) {
        const newOtp = [...otpArray];

        newOtp[index] = ""; 

        setOtpArray(newOtp);
      } else if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };


  //directly copy paste the otp on the blocks 
  const handlePaste = (e) => {
    e.preventDefault();

    const pastedOtp = e.clipboardData.getData("text").trim(); // take the data from clipboard

    if (!/^\d+$/.test(pastedOtp)) { // data should be digits only , else do not proceed further 
      return;
    }

    const otpDigits = pastedOtp.slice(0, 4).split(""); // ["1","2","3","4"]
    const newOtp = [...otpArray];
    otpDigits.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtpArray(newOtp);

    const focusIndex = otpDigits.length - 1;
    inputRef.current[focusIndex]?.focus();
  };


  //clear button , resets the otparray to array with empty string in it 
  const handleClearOtp = () => {
    setOtpArray(new Array(4).fill(""));
    inputRef.current[0]?.focus();
  };


  
  return (
    <div className="flex flex-col gap-3 px-10 py-6">
      <h2 className="text-center text-lg font-semibold">
        Enter the code we just mailed you
      </h2>
      <p className="text-center text-sm text-gray-500">
        If you don't have an account, we'll create one for you.
      </p>

      {/* OTP INPUT */}
      <div className="flex items-center justify-center">
        {otpArray.map((digit, index) => (
          <input
            key={index}
            ref={(ref) => (inputRef.current[index] = ref)}
            type="text"
            name="otp"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            inputMode="numeric"
            className="w-12 h-12 font-bold text-center rounded-md mx-1 border border-gray-200 text-white-500 outline-none"
          />
        ))}

        <button
          onClick={handleClearOtp}
          type="button"
          className="w-8 cursor-pointer h-8 border border-gray-200 items-center
        text-[#f74565] ml-1 font-bold rounded-md"
        >
          <IoClose size={24} className="inline" />
        </button>
      </div>

      {isExpired ? (
        <p className="text-center text-xs text-indigo-500 cursor-pointer">
          OTP expired. Please{" "}
          <a href="" className="underline" onClick={handleResendOtp}>
            resend OTP
          </a>
          .
        </p>
      ) : (
        <p className="text-center text-sm ">OTP expires in {displayTime}</p>
      )}

      <button
        type="submit"
        onClick={handleVerifyOtp}
        className="w-full cursor-pointer text-white bg-black py-2 rounded-md text-lg hover:bg-gray-800 transition"
      >
        Continue
      </button>

      <p className="text-[#c4c5c5] text-center m-auto text-[12px]">
        By entering your email id, you're agreeing to our{" "}
        <a href="" className="text-[#f74565]">
          Terms of Service
        </a>{" "}
        and
        <a href="" className="text-[#f74565]">
          Privacy Policy
        </a>
        . Thanks!
      </p>
    </div>
  );
};

export default StepOTP;
