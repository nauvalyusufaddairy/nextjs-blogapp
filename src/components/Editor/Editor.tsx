"use client";
import { EditorProvider } from "@tiptap/react";
import React from "react";
export default function Editor({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) {
  return (
    <EditorProvider content={content} editable={false}>
      {" "}
    </EditorProvider>
  );
}
