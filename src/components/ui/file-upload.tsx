import { useState, useRef } from "react";
import { UploadCloud, X, Loader2, FileImage } from "lucide-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Button } from "./button";
import { toast } from "sonner";

interface FileUploadProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
}

export function FileUpload({ 
  onUploadSuccess, 
  folder = "uploads", 
  accept = "image/*", 
  maxSizeMB = 5,
  label = "Upload File"
}: FileUploadProps) {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);
      
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(p);
        },
        (error) => {
          console.error("Upload error:", error);
          toast.error("Upload failed: " + error.message);
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onUploadSuccess(downloadURL);
          setIsUploading(false);
          toast.success("File uploaded successfully");
        }
      );
    } catch (err: any) {
      toast.error("An error occurred during upload");
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-4">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept={accept} 
          onChange={handleFileChange} 
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full flex gap-2 items-center justify-center py-6 border-dashed border-white/20 bg-black/20 hover:bg-white/5 text-slate-300"
        >
          {isUploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-cyan-500" />
          ) : (
            <UploadCloud className="h-5 w-5 text-cyan-400" />
          )}
          {isUploading ? `Uploading... ${Math.round(progress)}%` : label}
        </Button>
      </div>
      
      {isUploading && (
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-cyan-500 h-1.5 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
