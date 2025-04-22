import React from 'react';
import { Typography, Card, CardBody } from "@material-tailwind/react";
import config from '@/app/config';

interface FeatureCardProps {
  title: string;
  icon: React.ElementType;
  // icon:any;
  children: React.ReactNode;
}


export function FeatureCard({ icon:Icon, title, children }: FeatureCardProps) {
    return (
      <Card color="transparent" shadow={false} {...({} as React.ComponentProps<typeof Card>)}>
        <CardBody className="grid justify-center text-center" {...({} as React.ComponentProps<typeof CardBody>)}>
          <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-lg bg-gray-900 p-2.5 text-white shadow">
            <Icon className="h-5 w-5" />
            {/* <img className="h-5 w-5" src={`${config.apiUrl}storage/${icon}`}/> */}
          </div>
          <Typography variant="h5" color="blue-gray" className="mb-2" {...({} as React.ComponentProps<typeof Typography>)}>
            {title}
          </Typography>
          <Typography className="px-8 font-normal !text-gray-500" {...({} as React.ComponentProps<typeof Typography>)}>
            {children}
          </Typography>
        </CardBody>
      </Card>
    );
  }

export default FeatureCard;