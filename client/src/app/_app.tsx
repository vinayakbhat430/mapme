import { useRouter } from 'next/navigation';
import Navbar from "@/components/navbar";
import buildClient from "@/hooks/build-client";

interface AppComponentProps {
  currentUser: any;
  Component: React.ComponentType<any>;
  pageProps: any;
}

const AppComponent = ({ Component, pageProps, currentUser }: AppComponentProps) => {
  return (
    <>
      <Navbar currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </>
  );
};

// Correcting the typing of getInitialProps
AppComponent.getInitialProps = async (appContext:any) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/current-user');
  let pageProps = {};

  const router = useRouter();

  if (!data.currentUser) {
    router.push('/auth/login');
  }

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }

  return { pageProps, currentUser: data.currentUser };
};

export default AppComponent;
