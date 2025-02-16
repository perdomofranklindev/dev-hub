import React from "react";
import Link from "next/link";
import { TipTapRichTextEditor } from "./TipTapRichTextEditor";
import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";

export const TipTapRichTextEditorSection = () => {
  return (
    <main>
      <article>
        <Stack>
          <section title="Title">
            <Typography variant="h5" fontWeight="bold">
              Tip Tap
            </Typography>
          </section>
          <section title="Demo Component">
            <TipTapRichTextEditor />
          </section>
          <section title="References">
            <Typography>References:</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <Link href="https://tiptap.dev/docs/examples/basics/default-text-editor">
                      https://tiptap.dev/docs/examples/basics/default-text-editor
                    </Link>
                  }
                />
              </ListItem>
            </List>
          </section>
        </Stack>
      </article>
    </main>
  );
};
