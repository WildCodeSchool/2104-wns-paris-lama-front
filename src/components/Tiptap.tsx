/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react/button-has-type */
import React from "react";
import {
  ReactNodeViewRenderer,
  useEditor,
  BubbleMenu,
  FloatingMenu,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import LinkTiptap from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { v4 } from "uuid";
import Iframe from "./Iframe";
import MenuBar from "./TiptapToolbar";
import CodeBlockComponent from "./CodeBlockComponent";

const { lowlight } = require("lowlight");

const CustomDocument = Document.extend({
  content: "heading block*",
});

const Tiptap = ({
  editable,
  content,
  onChange,
}: {
  editable: boolean;
  content?: any;
  onChange?: any;
}): JSX.Element => {
  const id = v4();
  const editor = useEditor({
    editable,
    extensions: [
      CustomDocument,
      StarterKit,
      LinkTiptap,
      Underline,
      Iframe,
      Image,
      Highlight,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    content,
    onUpdate(instance: any) {
      // The content has changed.
      if (!editable)
        instance.editor.commands.setContent(instance.editor.getJSON());
      onChange(instance.editor.getJSON());
    },
  });
  React.useEffect(() => {
    if (content && editor && !editable) editor.commands.setContent(content);
  }, [content, editable, editor]);
  return (
    <div>
      {editable && <MenuBar id={id} editor={editor} />}
      {editor && editable && (
        <BubbleMenu
          className="flex gap-2 "
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-gray-800 p-2 " : "p-2 "}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-gray-800 p-2 " : "p-2 "}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-gray-800 p-2 " : "p-2 "}
          >
            Strike
          </button>
        </BubbleMenu>
      )}
      {/* {editor && editable && (
        <FloatingMenu
          className="flex gap-2 "
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </button>
        </FloatingMenu>
      )} */}

      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;