import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";

interface FormationCardProps {
  title: string;
  category: string;
  description: string;
  meaning: string;
  militaryMeaning?: string;
  imageUrl?: string;
  index: number;
}

export function FormationCard({ 
  title, 
  category, 
  description, 
  meaning, 
  militaryMeaning, 
  imageUrl,
  index 
}: FormationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="h-full border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-white/50 backdrop-blur-sm overflow-hidden group">
        <div className="h-2 w-full bg-gradient-to-r from-primary/80 to-accent"></div>
        {imageUrl && (
          <div className="w-full bg-secondary/5 border-b border-border/50 relative group/image overflow-hidden">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-zoom-in relative aspect-[4/3] w-full">
                  <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover/image:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/5 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover/image:opacity-100 transition-opacity bg-white/90 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                      <ZoomIn className="w-3 h-3" /> 查看图解
                    </span>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent shadow-none">
                 <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    <img 
                      src={imageUrl} 
                      alt={title} 
                      className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl bg-white" 
                    />
                 </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
              {category}
            </Badge>
            <span className="text-4xl font-serif text-accent/20 font-bold absolute right-4 top-4 group-hover:text-accent/40 transition-colors">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <CardTitle className="text-xl md:text-2xl text-foreground font-serif mb-2">
            {title}
          </CardTitle>
          <CardDescription className="text-justify leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
            <h4 className="text-sm font-bold text-secondary mb-1 flex items-center gap-2">
              <span className="w-1 h-4 bg-secondary rounded-full"></span>
              文化寓意
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{meaning}</p>
          </div>
          
          {militaryMeaning && (
            <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/10">
               <h4 className="text-sm font-bold text-destructive/80 mb-1 flex items-center gap-2">
                <span className="w-1 h-4 bg-destructive/60 rounded-full"></span>
                军事隐喻
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{militaryMeaning}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
