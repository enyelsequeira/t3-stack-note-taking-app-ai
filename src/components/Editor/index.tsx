import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";

import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { lowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ActionIcon, ScrollArea } from "@mantine/core";
import { useRef } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import Typography from "@tiptap/extension-typography";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";

type Props = {
  description: string;
  onChange: (...event: any[]) => void;
  edit?: boolean;
};
const Editor = ({ description, onChange, edit }: Props) => {
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToTop = () =>
    viewport && viewport?.current?.scrollTo({ top: 0, behavior: "smooth" });

  const editor = useEditor({
    editable: edit,
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Typography,
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    content: description,
  });
  return (
    <RichTextEditor
      editor={editor}
      classNames={{
        root: "max-w-6xl w-full lg:mt-5 flex flex-col mx-auto rounded-md overflow-hidden",
      }}
    >
      <RichTextEditor.Toolbar sticky className="border-b-2 border-black/50">
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.CodeBlock />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <ScrollArea
        viewportRef={viewport}
        h={700}
        styles={(theme) => ({
          scrollbar: {
            "&, &:hover": {
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },

            '&[data-orientation="vertical"] .mantine-ScrollArea-thumb': {
              backgroundColor: theme.colors.blue[8],
            },
          },

          corner: {
            opacity: 1,
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <RichTextEditor.Content className="min-h-[400px] bg-white" />
      </ScrollArea>
      <ActionIcon
        sx={(theme) => {
          // console.log({ theme });
          return {
            // position: "absolute",
          };
        }}
        onClick={scrollToTop}
        color={"blue.5"}
        size={"lg"}
        className="flex  justify-center self-end"
      >
        <IconArrowUp size="1.125rem" />
      </ActionIcon>
    </RichTextEditor>
  );
};

export default Editor;
