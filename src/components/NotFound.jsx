import { notFoundImg } from "@/assets";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border bg-primary-950/5 border-primary-600/20 p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-2">404 - Page Not Found</h2>
        <p className="text-gray-400 mb-4">
          The page you are looking for does not exist.
        </p>
        <img
          src={notFoundImg}
          alt="404 Not Found"
          className="mb-4 max-w-full h-auto mx-auto"
          loading="lazy"
        />
        <div className="w-fit mx-auto">
          <Link to="/" className="astro-border-btn">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
