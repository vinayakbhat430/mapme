import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import AuthHeader from './authHeader';
import BackButton from './backButton';

interface CardWrapperProps {
    label:string;
    title:string;
    backbuttonHref:string;
    backButtonLabel:string;
    children: React.ReactNode
}

const CardWrapper: React.FC<CardWrapperProps> = ({label, title, backButtonLabel,backbuttonHref, children}) => {
  return (
    <Card className="xl:w-1/4 md:w-1/2 shadow-md">
        <CardHeader>
            <AuthHeader label={label} title={title}/>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        <CardFooter>
            <BackButton backButtonLabel={backButtonLabel} backbuttonHref={backbuttonHref}/>
        </CardFooter>
    </Card>
  )
}

export default CardWrapper