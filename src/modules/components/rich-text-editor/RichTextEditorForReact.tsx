"use client";
import React from "react";
import useRichTextEditor from "rich-text-editor-for-react/hook";
import DisplayTheOutput from "rich-text-editor-for-react/display-output";
import RichTextEditor from "rich-text-editor-for-react";
import { Stack, Typography } from "@mui/material";

const EditorTitle = () => (
  <section title="Title">
    <Typography variant="h5" fontWeight="bold">
      Rich Text Editor For React
    </Typography>
  </section>
);

const EditorComponent = ({
  fetchOutput,
}: {
  fetchOutput: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <section title="Component">
    <RichTextEditor
      toolbarOptions={[
        "word_count",
        "clear_format",
        "undo",
        "redo",
        "font",
        "header",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "text_color",
        "highlight_color",
        "numbered_list",
        "bulleted_list",
        "align",
        "decrease_indent",
        "increase_indent",
        "direction",
        "blockquote",
        "code_block",
        "link",
        "image_base64",
        "embed_video",
        "format_media",
        "sub_script",
        "super_script",
      ]}
      customizeUI={{
        backgroundColor: "#fcfcfc",
        primaryColor: "blue",
      }}
      fetchOutput={fetchOutput}
    />
  </section>
);

const EditorOutput = ({ output }: { output: string }) => (
  <section title="Component Output">
    <section title="Subtitle">
      <Typography variant="h6">Output</Typography>
    </section>
    <section title="Display">
      <DisplayTheOutput
        html={output}
        backgroundColor="#fcfcfc"
        primaryColor="#20464b"
      />
    </section>
  </section>
);

export default function RichTextEditorForReact() {
  const { output, fetchOutput } = useRichTextEditor();

  return (
    <main>
      <article>
        <Stack>
          <section title="Demo Component">
            <EditorTitle />
            <EditorComponent fetchOutput={fetchOutput} />
          </section>
          <EditorOutput output={output} />
        </Stack>
      </article>
    </main>
  );
}
