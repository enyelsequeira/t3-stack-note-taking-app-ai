/* eslint-disable react/no-children-prop */

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";

type Props = {
  doc: string;
};

const Preview = ({ doc }: Props) => {
  return (
    <div className="w-full border-2 border-blue-900  bg-green-200/25">
      <ReactMarkdown
        className={"prose "}
        children={doc}
        remarkPlugins={[remarkGfm]}
        components={{
          image: ImagePreview,

          code({ node, inline, className, children, style, ...props }) {
            console.log({ props });
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={prism}
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

const ImagePreview = ({ src, alt }: any) => {
  console.log({ src, alt });

  return (
    <div className="w-full">
      <Image src={src} alt={"text"} width={200} height={200} />
    </div>
  );
};

export default Preview;
