import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import "./MarkdownRenderer.css";

function MarkdownRenderer({ markdown }) {
  const renderers = {
    code: ({ language, value }) => {
      return <SyntaxHighlighter language={language} children={value} />;
    },
  };
  return (
    <ReactMarkdown
      className="markdown"
      renderers={renderers}
      children={markdown}
      allowDangerousHtml
    />
  );
}

export default MarkdownRenderer;
