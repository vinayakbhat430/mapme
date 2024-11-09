import { useEffect } from "react";
import { useRouter } from "next/navigation";  // Correct import for Next.js app directory
import useRequest from "@/hooks/useRequest";

const SignOut = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'get',
    body: {},
    onSuccess: () => router.push("/"),  // onSuccess uses useRouter here
  });

  const router = useRouter();  // useRouter is used for navigation in Next.js app directory

  useEffect(() => {
    doRequest();
  }, [doRequest]);  // Corrected the dependency array for useEffect

  return <div>Signing you out...</div>;
};

export default SignOut;
