import React, { useContext } from "react";
import { PreviewContext } from "../context/PreviewContext";
import "./PostPreviewer.css";
import MarkdownRenderer from '../components/MarkdownRenderer';

function PostPreviewer() {
  const { postPreview } = useContext(PreviewContext);


  return (
    <div className="preview-container">
      <img
        className="preview-image"
        alt={postPreview.title}
        src={postPreview.image}
      />
      <h2 className="preview-title">{postPreview.title}</h2>
      <p className="preview-detail">
        a seconds ago,
        {postPreview.tag}
      </p>
      <MarkdownRenderer markdown={postPreview.body}/>
    </div>
  );
}

export default PostPreviewer;
