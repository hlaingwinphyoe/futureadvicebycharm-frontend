// components/ui/CustomModal.jsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function CustomModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  isLoading = false,
  onSubmit,
  submitLabel = "Save",
  showCancelButton = true,
  size = "default", // default, sm, lg, xl
}) {
  const sizeClasses = {
    sm: "sm:max-w-md",
    default: "sm:max-w-xl",
    lg: "sm:max-w-2xl",
    xl: "sm:max-w-4xl",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={sizeClasses[size]}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4">{children}</div>

        <DialogFooter className="gap-2">
          {showCancelButton && (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          {onSubmit && (
            <Button onClick={onSubmit} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {submitLabel}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
