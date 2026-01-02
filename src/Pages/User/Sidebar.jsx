import { useState } from "react";
import { motion } from "framer-motion";
import {
  Pencil,
  ListChecks,
  User,
  Camera,
  LogOut,
  BookmarkCheck,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ImageUploadModal from "@/components/ImageUploadModal";
import { userProfile } from "@/assets";
import { useDispatch, useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { logout } from "@/redux/reducers/UserSlice";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  {
    icon: <Pencil className="mr-2 h-4 w-4" />,
    label: "Profile",
    path: "/user/profile",
  },
  {
    icon: <ListChecks className="mr-2 h-4 w-4" />,
    label: "Your Bookings",
    path: "/user/bookings-list",
  },
  {
    icon: <BookmarkCheck className="mr-2 h-4 w-4" />,
    label: "Saved Posts",
    path: "/user/saved-posts",
  },
  {
    icon: <Settings className="mr-2 h-4 w-4" />,
    label: "App Settings",
    path: "/user/settings",
  },
];

export default function AccountSidebar() {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user?.profile || userProfile
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clearAuth } = useAuth();

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
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-1"
      >
        <div className="bg-black/20 backdrop-blur-md border border-primary-500/20 rounded-lg p-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Avatar className="w-28 h-28 border border-primary-500/20 p-2 mb-4">
                <AvatarImage
                  src={profileImage}
                  className="rounded-full object-cover"
                />
                <AvatarFallback>
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-4 right-1 rounded-full w-8 h-8"
                onClick={() => setIsModalOpen(true)}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <h2 className="text-2xl font-serif text-primary-200 mb-2">
              {user?.name}
            </h2>
            <p className="text-primary-400/80 mb-6">
              {user?.role == "User" ? "Member" : user?.role}
            </p>

            <div className="w-full">
              {navItems.map((item) => (
                <Link key={item.label} to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-primary-200 hover:text-primary-100 hover:bg-primary-500/20 mb-2",
                      location.pathname === item.path && "bg-primary-500/20"
                    )}
                  >
                    {item.icon} {item.label}
                  </Button>
                </Link>
              ))}
            </div>
            <Separator />
            <Button
              onClick={handleLogout}
              variant="ghost"
              className={cn(
                "mt-2 w-full justify-start text-red-600 hover:text-red-500 hover:bg-red-500/20"
              )}
            >
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </div>
        </div>
      </motion.div>

      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentImage={profileImage}
        onSuccess={(newImageUrl) => setProfileImage(newImageUrl)}
      />
    </>
  );
}
