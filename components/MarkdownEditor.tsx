"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useState } from "react";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownEditorProps {
  initialValue?: string;
  onChange?: (value?: string) => void;
  minHeight?: number;
}

const MarkdownEditor = ({
  initialValue = "",
  onChange,
  minHeight = 200,
}: MarkdownEditorProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue?: string) => {
    setValue(newValue || "");
    onChange?.(newValue);
  };

  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={handleChange}
        preview="edit"
        minHeight={minHeight}
        highlightEnable={true}
        enableScroll={true}
        textareaProps={{
          placeholder: "Start writing with Markdown...",
        }}
      />
    </div>
  );
};

export default MarkdownEditor;
