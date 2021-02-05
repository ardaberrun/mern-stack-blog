import React, { useEffect, useState } from "react";
import "./Posts.css";
import { Link } from "react-router-dom";
import API from "../api/api";
import moment from "moment";

function Posts({ tag }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!data) {
          const fetchData = await API.get("/post");
          setData(fetchData.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [data]);

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
              <p className="article-desc">{article.body.slice(0, 100)} ...</p>
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
