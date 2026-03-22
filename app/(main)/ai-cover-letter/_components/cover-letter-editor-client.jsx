"use client";

import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Edit, Monitor } from "lucide-react";

export default function CoverLetterEditorClient({ initialContent }) {
  const [content, setContent] = useState(initialContent || "");
  const [mode, setMode] = useState("preview");

  return (
    <div className="py-4">
      <Button
        variant="link"
        type="button"
        className="mb-2"
        onClick={() => setMode(mode === "preview" ? "edit" : "preview")}
      >
        {mode === "preview" ? (
          <>
            <Edit className="h-4 w-4 mr-1" />
            Edit Cover Letter
          </>
        ) : (
          <>
            <Monitor className="h-4 w-4 mr-1" />
            Show Preview
          </>
        )}
      </Button>

      <div className="border rounded-lg">
        <MDEditor
          value={content}
          onChange={setContent}
          preview={mode}
          height={700}
        />
      </div>
    </div>
  );
}
