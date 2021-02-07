import React, { useEffect, useState, useRef } from "react";
import "./Posts.css";
import { Link } from "react-router-dom";
import API from "../api/api";
import moment from "moment";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Posts({ tag }) {
  const [data, setData] = useState(null);
  const previousTag = usePrevious(tag);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!data || tag !== previousTag) {
          const fetchData = await API.get(`/post?q=${tag}`);
          setData(fetchData.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [data, tag, previousTag]);

  return (
    <div className="articles">
      {data &&
        data.map((article) => (
          <div key={article._id} className="article">
            <div className="article-image">
              <img
                className="article-img"
                src={article.image}
                alt={article.title}
              />
            </div>
            <div className="article-content">
              <h2 className="article-title">
                <Link to={`/blog/posts/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="article-desc">{article.description} </p>
              <footer className="article-footer">
                <p>
                  {moment(article.createdAt).startOf("now").fromNow()},{" "}
                  {article.tag}{" "}
                  {/*<Link to={`/blog/tag/${article.tag}`}> {article.tag}</Link>*/}
                </p>
              </footer>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Posts;
