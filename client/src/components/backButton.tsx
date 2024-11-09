import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

interface BackButtonProps {
    backbuttonHref:string;
    backButtonLabel:string;
}

const BackButton: React.FC<BackButtonProps> = ({backButtonLabel, backbuttonHref}) => {
  return (
    <div>
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
            <Link href={backbuttonHref}>{backButtonLabel}</Link>
        </Button>
    </div>
  )
}

export default BackButton