import React from "react";

type AvatarProps = {
  src: string;
  alt?: string;
};

const Avatar:React.FC<AvatarProps> = ({ src, alt }: AvatarProps) => {
  return (
    <div className="rounded-full overflow-hidden w-full pt-[100%] relative">
      <div className="absolute inset-0">
        <img src={src} alt={alt || src} />
      </div>
    </div>
  );
}

export default Avatar;
