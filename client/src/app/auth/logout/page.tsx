"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";  // Correct import for Next.js app directory
import useRequest from "@/hooks/useRequest";

const SignOut = () => {
  const router = useRouter(); 
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'get',
    body: {},
    onSuccess: () => router.push("/auth/login"),
    onError: () => router.push("/auth/login"),
  });


  useEffect(() => {
    doRequest();
  }, []);

  return <div>Signing you out...</div>;
};

export default SignOut;
