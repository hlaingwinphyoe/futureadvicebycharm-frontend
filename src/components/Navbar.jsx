import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, User, UserCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { logout } from "@/redux/reducers/UserSlice";
import { fullLogo, star, userProfile } from "@/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { isAuthenticated, clearAuth } = useAuth();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    // { name: "About", path: "/about" },
    { name: "Packages", path: "/packages" },
    { name: "Blogs", path: "/blogs" },
    { name: "Zodiacs", path: "/zodiacs" },
    { name: "Feedback", path: "/feedback" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path.includes("#")) {
      return location.hash === path.split("#")[1];
    }
    return location.pathname === path;
  };

  const goProfile = () => {
    navigate("/user/profile");
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      clearAuth();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-lg border-b border-primary-500/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif text-white">
            <img
              src={fullLogo}
              className="h-10"
              alt="Future Advice by Charm Logo"
              loading="lazy"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium relative transition duration-300 group ${
                  isActive(item.path)
                    ? "text-primary-300"
                    : "text-gray-200 hover:text-primary-300"
                }`}
              >
                {item.name}
                {/* <span
                  className={`absolute left-0 -bottom-1 h-0.5 w-full bg-primary-200 transition-transform duration-300 ${
                    isActive(item.path) ? "scale-x-100" : "scale-x-0"
                  } group-hover:scale-x-100`}
                ></span> */}
              </Link>
            ))}
            <div className="flex items-center space-x-6">
              <Link
                to="/appointment"
                className="astro-secondary-btn uppercase text-xs"
              >
                Book Now
              </Link>
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        src={user?.profile || userProfile}
                        className="rounded-full object-cover"
                      />
                      <AvatarFallback>
                        <User className="w-12 h-12" />
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={goProfile}>
                      <UserCircle />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="text-red-500" />
                      <span className="text-red-500">Log Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login" className="astro-border-btn px-5">
                  Login
                  <img src={star} alt="Star" className="h-4" loading="lazy" />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-200 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-lg border-b border-primary-500/20"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-primary-300"
                      : "text-gray-200 hover:text-primary-300"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col justify-center items-start space-y-5">
                <Link
                  to="/appointment"
                  className="astro-secondary-btn uppercase text-xs"
                >
                  Book Now
                </Link>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar>
                        <AvatarImage
                          src={user?.profile || userProfile}
                          className="rounded-full object-cover"
                        />
                        <AvatarFallback>
                          <User className="w-12 h-12" />
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={goProfile}>
                        <UserCircle />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="text-red-500" />
                        <span className="text-red-500">Log Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/login" className="astro-border-btn px-5">
                    Login
                    <img src={star} alt="Star" className="h-4" loading="lazy" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
