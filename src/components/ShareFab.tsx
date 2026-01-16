import { Share2, Link as LinkIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function ShareFab() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("链接已复制到剪贴板");
  };

  const handleShareSystem = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "青田鱼灯舞 · 手记与图解",
          text: "探索青田鱼灯舞的文化内涵与阵法精髓",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white">
                <Share2 className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mb-2 w-48 bg-white/95 backdrop-blur-md">
              <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
                <LinkIcon className="mr-2 h-4 w-4" />
                复制链接
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleShareSystem} className="cursor-pointer">
                <Share2 className="mr-2 h-4 w-4" />
                系统分享
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
