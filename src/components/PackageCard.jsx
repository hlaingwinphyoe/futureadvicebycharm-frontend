import { packageImg2 } from "@/assets";
import { Link } from "react-router-dom";

export default function PackageCard({ item }) {
  return (
    <Link
      to={`/appointment`}
      className="cursor-pointer group transition-all duration-300 ease-linear relative h-60 md:h-72 w-full bg-secondary-500"
    >
      {/* <div className="h-[85%] absolute top-px left-11 w-[85%] border rounded-tr-[2rem]"></div> */}
      <div className="relative">
        <div className="z-10 absolute items-center h-full justify-center w-full hidden group-hover:flex bg-black bg-opacity-40"></div>
        <img
          src={item.image || packageImg2}
          alt="Emerge artwork"
          className="h-60 md:h-72 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="z-20 absolute left-4 bottom-4">
          <h2 className="text-2xl font-semibold mb-1 italic">{item.name}</h2>
          <p className="text-sm text-gray-300">
            {item.price} {item.currency}
          </p>
        </div>
        <div className="z-20 absolute bottom-4 right-3">
          <p className="text-sm text-gray-300">
            {item.th_price} {item.th_currency}
          </p>
        </div>
      </div>
    </Link>
  );
}
