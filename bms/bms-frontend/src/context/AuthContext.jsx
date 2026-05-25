import { createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../apis";
import { verifyOTP } from "../apis";
import { activate } from "../apis";
import { logout } from "../apis";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [interval, setInterval] = useState(null);
  const [authData, setAuthData] = useState();
  const [auth, setAuth] = useState(false);

  //mutations
  const sendOtpRequestMutation = useMutation({
    mutationFn: (email) => sendOTP({ email }), // api request sent to send otp to the email provided by user
  });

  const verifyOtpRequestMutation = useMutation({
    mutationFn: (requestData) => verifyOTP(requestData), // api request to verify otp
  });

  const activateUserMutation = useMutation({
    mutationFn: (requestData) => activate(requestData),
  });

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
  });

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    if(step!==1){
        setStep(1);
    }
  };

  const sendOtpRequest = async ({ email, onNext}) => {
    // called from ui
    sendOtpRequestMutation.mutate(email, {
      //triggers api call
      onSuccess: (res) => {
        console.log(res.data);
        setAuthData(res.data); // so that we can use the hash and email in the next step to verify otp
        toast.success("OTP sent to your email");
        onNext();
      },
      onError: (err) => {
        console.log(err);
        toast.error(
          err?.response?.error?.message ||
            "Something went wrong while sending OTP",
        );
      },
    })
  };

  const verifyOtpRequest = async ({ otp, onNext }) => {
    const { hash, email } = authData; // we have setted it in the previous step in sentotprequest
    const reqData = {
      otp,
      hash,
      email,
    };

    verifyOtpRequestMutation.mutate(reqData, {
      onSuccess: (res) => {
        setAuthData(null); //remove the setted auth data now becuase its purpose is served to verify otp and now we dont need it
        console.log(res.data);
        setUser(res.data.user);
        setAuth(true);
        if (!res.data.user?.activateUser) {
          // user profile is incomplete , so we need to show the activate user form
          // toast.success("OTP verified successfully, Now complete the profile");
          onNext();
        } else {
          //else user profile is complete so we can directly log in the user and show success toast and close the modal
          setStep(1);
          toggleModal();
          toast.success("User Logged In Succesfully");
        }
      },
      onError: (err) => {
        console.log(err);
        toast.error(
          err?.response?.error?.message ||
            "Something went wrong while verifying OTP",
        );
      },
    });
  };

  //Used for completing profile
  const activateUserRequest = async (data) => {
    const { name, phone } = data;
    const id = user?._id; // we have setted user data in the previous step when otp is verified successfully, so we can get the id from there to complete the profile of the user
    const reqData = { id, ...data }; // combines id,name,phone

    activateUserMutation.mutate(reqData, {
      onSuccess: (res) => {
        console.log(res.data);
        setUser(res.data.user);
        setStep(1);
        toggleModal();
        toast.success("Profile activated successfully");
      },
      onError: (err) => {
        console.log(err);
        toast.error(
          err?.response?.error?.message ||
            "Something went wrong while activating user",
        );
      },
    });
  };

  const logoutRequest = () => {
    logoutMutation.mutate(null, {
      onSuccess: (data) => {
        console.log(data);
        setAuth(false);
        setUser(null); // logout so , remove user data from context
        window.location.href = "/";
      },
      onError: (error) => {
        console.log(error);
        toast.error(
          error?.response?.error?.message || "Something went wrong in logout",
        );
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        step,
        setStep,
        showModal,
        toggleModal,
        sendOtpRequest,
        authData,
        user,
        setUser,
        verifyOtpRequest,
        activateUserRequest,
        logoutRequest,
        auth,
        setAuth,
        otpLoader: sendOtpRequestMutation.isPending,
        verifyOtpLoader: verifyOtpRequestMutation.isPending,
        activateUserLoader: activateUserMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
