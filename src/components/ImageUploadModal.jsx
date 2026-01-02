import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Upload } from "lucide-react";
import { http } from "@/utils/axios";
import CustomModal from "./CustomModal";
import { useToast } from "@/hooks/use-toast";

export default function ImageUploadModal({
  isOpen,
  onClose,
  currentImage,
  onSuccess,
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(currentImage);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Validate file type
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a JPEG or PNG image.",
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5000000) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
      });
      return;
    }

    setSelectedImage(file);
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", selectedImage);

      const response = await http.post(
        "/api/auth/users/avatar/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        description: "Profile picture updated successfully",
      });

      if (onSuccess) {
        onSuccess(response.data.image_url);
      }

      handleClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description:
          error.response?.data?.message ||
          "Failed to upload image. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setPreviewImage(currentImage);
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Profile"
      description="Update your profile picture."
      isLoading={isLoading}
      onSubmit={handleUpload}
      submitLabel="Save Changes"
      size="sm"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <Avatar className="w-32 h-32 border border-primary-500/20 p-2">
            <AvatarImage
              src={previewImage}
              className="rounded-full object-cover"
            />
            <AvatarFallback>
              <User className="w-16 h-16" />
            </AvatarFallback>
          </Avatar>
        </div>

        <Label
          htmlFor="picture"
          className="cursor-pointer py-4 px-6 border-2 border-dashed rounded-lg w-full text-center hover:border-primary-500 transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-6 h-6" />
            <span>Choose a file</span>
            <span className="text-sm text-muted-foreground">
              JPEG, PNG up to 5MB
            </span>
          </div>
          <Input
            id="picture"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={handleImageSelect}
          />
        </Label>
      </div>
    </CustomModal>
  );
}
