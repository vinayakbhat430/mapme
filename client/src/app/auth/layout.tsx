import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <section className="w-full">
      <div className="h-screen flex items-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
