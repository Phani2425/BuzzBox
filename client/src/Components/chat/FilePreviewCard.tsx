import { Button } from "@/components/ui/button";
import { Attachment } from "@/Types/types";
import { FileText, Music, Video, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface FilePreviewCardProps {
  files: Attachment[];
  onRemove: (index: number) => void;
  onSubmit: () => void;
  isOpen: boolean;
}

const FilePreviewCard = ({ 
  files = [], 
  onRemove, 
  onSubmit,
  isOpen 
}: FilePreviewCardProps) => {
  if (!isOpen || !files?.length) return null;

  return (
    <div className="absolute bottom-full left-0 mb-2 w-80 p-2 glassmorphism rounded-lg shadow-lg">
      <div className="max-h-48 overflow-y-auto scrollbar-hide">
        {files.map((file, index) => (
          <div 
            key={index}
            className="flex items-center gap-2 p-2 hover:bg-white/5 dark:hover:bg-black/20 rounded-md group"
          >
            <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded bg-white/5 dark:bg-black/5">
              {file.type === 'image' && <ImageIcon className="h-4 w-4" />}
              {file.type === 'video' && <Video className="h-4 w-4" />}
              {file.type === 'audio' && <Music className="h-4 w-4" />}
              {file.type === 'document' && <FileText className="h-4 w-4" />}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-xs truncate">{file.file.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(file.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onRemove(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <Button 
          onClick={onSubmit}
          className="w-full mt-2 bg-gradient-to-r from-green-400 to-green-600 dark:from-[#00A3FF] dark:to-blue-600 text-white text-sm"
        >
          Send {files.length} {files.length === 1 ? 'File' : 'Files'}
        </Button>
      )}
    </div>
  );
};

export default FilePreviewCard;