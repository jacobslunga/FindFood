import Link from "next/link";
import { FC } from "react";

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-white text-black font-sat-regular text-4xl">
      <h1>404 - Sidan kunde inte hittas</h1>
      <Link
        href="/"
        className="bg-clip-text text-transparent mt-10 font-sat-medium bg-gradient-to-br from-primary to-secondary"
      >
        Gå till startsidan
      </Link>
    </div>
  );
};

export default NotFound;
