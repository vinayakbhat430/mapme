import axios, { AxiosInstance } from "axios";
import { GetServerSidePropsContext } from "next";

interface AxiosConfigProps {
  req?: GetServerSidePropsContext["req"];
}

const createAxiosInstance = ({ req }: AxiosConfigProps): AxiosInstance => {
  if (typeof window === "undefined") {
    // Server-side: use internal cluster URL
    return axios.create({
      baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req?.headers,
    });
  } else {
    // Client-side: use relative base URL
    return axios.create({
      baseURL: "/",
    });
  }
};

export default createAxiosInstance;

