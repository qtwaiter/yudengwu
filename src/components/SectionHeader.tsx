import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-12 relative py-8", className)}>
      {/* 装饰背景字 - 极为淡雅的背景 */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl font-serif opacity-5 text-primary pointer-events-none whitespace-nowrap z-0">
        {title}
      </span>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 font-serif tracking-widest">
          {title}
        </h2>
        {subtitle && (
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <span className="h-[1px] w-8 bg-accent/50"></span>
            <p className="text-sm md:text-base tracking-wider">{subtitle}</p>
            <span className="h-[1px] w-8 bg-accent/50"></span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
