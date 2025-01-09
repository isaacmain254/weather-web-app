import Image from "next/image";
import React, { ReactNode } from "react";

interface WeatherCardProps {
  title: string;
  isImage?: boolean;
  content: string;
  footerContent: string | ReactNode;
  // key?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  isImage,
  content,
  footerContent,
  // key,
}) => {
  return (
    <div className="card">
      <div className="h-full card-body flex flex-col items-center">
        <p className="card-header font-medium text-base">{title}</p>
        <div>
          {isImage ? (
            <Image
              src={content}
              alt="Weather content"
              className="weather-image"
              width={160}
              height={160}
            />
          ) : (
            <p className="text-content2 font-semibold text-lg py-5">
              {content}
            </p>
          )}
        </div>
        <div className="card-footer w-full flex justify-center">
          {typeof footerContent === "string" ? (
            <p className="text-center text-sm">{footerContent}</p>
          ) : (
            footerContent
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
