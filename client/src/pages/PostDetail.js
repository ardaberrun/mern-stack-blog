import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import API from "../api/api";
import NotFound from "./404";
import "./PostDetail.css";
import moment from "moment";

function PostDetail() {
  const [detailPost, setDetailPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        if (!detailPost) {
          const fetchData = await API.get(`/post/${slug}`);
          if (!fetchData.data) {
            setDetailPost(404);
          } else {
            setDetailPost(fetchData.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [detailPost, slug]);

  return detailPost === 404 ? (
    <NotFound />
  ) : (
    detailPost && (
      <div>
        <Header />
        <div className="detail-container">
          <img
            className="detail-image"
            alt={detailPost.title}
            src={detailPost.image}
          />
          <h2 className="detail-title">{detailPost.title}</h2>
          <p className="detail-detail">
            {moment(detailPost.createdAt).startOf("now").fromNow()},{" "}
            {detailPost.tag}{" "}
            {/*<Link to={`/blog/tag/${article.tag}`}> {article.tag}</Link>*/}
          </p>
          <p className="detail-content">{detailPost.body}</p>
        </div>
        <Footer />
      </div>
    )
  );
}

export default PostDetail;