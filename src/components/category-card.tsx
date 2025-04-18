import React from 'react';
import Image from "next/image";

import { Card, CardBody, Typography } from "@material-tailwind/react";

interface CategoryCardProps {
    img: string;
    title: string;
    desc: string;
    icon: React.ElementType;
  }
  
  function CategoryCard({ img, title, desc, icon: Icon }: CategoryCardProps) {
    return (
      <Card className="relative grid min-h-[12rem] w-full overflow-hidden" {...({} as React.ComponentProps<typeof Card>)}>
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 h-full w-full bg-black/30" />
        <CardBody className="relative flex flex-col justify-between" {...({} as React.ComponentProps<typeof CardBody>)}>
          <Icon className="h-8 w-8 text-white" />
          <div>
            <Typography variant="h5" className="mb-1" color="white" {...({} as React.ComponentProps<typeof Typography>)}>
              {title}
            </Typography>
            <Typography color="white" className="text-xs font-bold opacity-50" {...({} as React.ComponentProps<typeof Typography>)}>
              {desc}
            </Typography>
          </div>
        </CardBody>
      </Card>
    );
  }
export default CategoryCard