"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': [2, 3, false] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote'],
      ['clean']
    ]
  };

  return (
    <div className="rich-text-editor-container border border-[#C9A84C]/30 rounded overflow-hidden">
      <ReactQuill 
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
      />
      <style dangerouslySetInnerHTML={{__html: `
        .rich-text-editor-container .ql-container, 
        .rich-text-editor-container .ql-toolbar {
          background-color: #0D2137;
          border-color: rgba(201, 168, 76, 0.3) !important;
        }
        .rich-text-editor-container .ql-editor {
          color: #F5F0E8;
          min-height: 200px;
        }
        .rich-text-editor-container .ql-toolbar button {
          color: #C9A84C;
        }
        .rich-text-editor-container .ql-toolbar .ql-stroke {
          stroke: #C9A84C !important;
        }
        .rich-text-editor-container .ql-toolbar .ql-fill {
          fill: #C9A84C !important;
        }
        .rich-text-editor-container .ql-toolbar .ql-picker {
          color: #C9A84C !important;
        }
      `}} />
    </div>
  );
}
