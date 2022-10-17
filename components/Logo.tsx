import React from "react";
import Image from "next/image";
import ecommerceLogo from "../public/images/ecommerceLogo.svg";

const Logo = () => {
  return (
    <div className="flex justify-start lg:w-0 lg:flex-1">
      <a href="#">
        <Image
          className="h-8 w-auto sm:h-10"
          src={ecommerceLogo}
          alt=""
          quality={100}
          width={90}
          height={64}
        />
      </a>
    </div>
  );
};

export default Logo;
