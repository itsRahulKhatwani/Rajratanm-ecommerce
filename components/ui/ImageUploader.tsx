"use client";

import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  existingUrls?: string[];
  onUploadComplete: (urls: string[]) => void;
  multiple?: boolean;
  maxImages?: number;
}

export default function ImageUploader({
  existingUrls = [],
  onUploadComplete,
  multiple = true,
  maxImages = 5,
}: ImageUploaderProps) {
  const [urls, setUrls] = useState<string[]>(existingUrls);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingUrls.length > 0 && urls.length === 0) {
      setUrls(existingUrls);
    }
  }, [existingUrls, urls.length]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    if (multiple && urls.length + files.length > maxImages) {
      setError(`You can only upload up to ${maxImages} images.`);
      return;
    }

    setIsUploading(true);
    setError(null);

    const newUrls = [...urls];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });
        reader.readAsDataURL(file);
        const base64 = await base64Promise;

        const res = await fetch('/api/image-upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 })
        });
        
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        
        if (multiple) {
          newUrls.push(data.url);
        } else {
          newUrls[0] = data.url;
        }
      }
      
      setUrls(newUrls);
      onUploadComplete(newUrls);
    } catch (err) {
      setError('Upload failed. Try again.');
      console.error(err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = async (indexToRemove: number) => {
    const urlToRemove = urls[indexToRemove];
    const parts = urlToRemove.split('/');
    const fileWithExt = parts[parts.length - 1];
    const publicId = fileWithExt.split('.')[0]; 

    const newUrls = urls.filter((_, idx) => idx !== indexToRemove);
    setUrls(newUrls);
    onUploadComplete(newUrls);

    try {
      await fetch('/api/image-upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId })
      });
    } catch (err) {
      console.error('Failed to delete image from server', err);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        className="border-2 border-dashed border-[#C9A84C]/50 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#C9A84C]/5 transition-colors relative bg-[#0D2137]"
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-[#C9A84C] animate-spin mb-2" />
            <p className="text-[#C9A84C] text-sm">Uploading...</p>
          </div>
        ) : (
          <>
            <UploadCloud className="w-8 h-8 text-[#C9A84C] mb-2" />
            <p className="text-[#F5F0E8] font-medium">Click to upload or drag and drop</p>
            <p className="text-gray-400 text-sm mt-1">PNG, JPG, WEBP up to 10MB each</p>
          </>
        )}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/png, image/jpeg, image/webp" 
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={isUploading}
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {urls.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {urls.map((url, idx) => (
            <div key={idx} className="relative w-20 h-20 group">
              <img 
                src={url} 
                alt={`Upload ${idx}`} 
                className="w-full h-full object-cover rounded border border-[#C9A84C]/30"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(idx);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
