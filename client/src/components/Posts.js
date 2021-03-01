import React, { useContext } from "react";
import "./Posts.css";
import { Link, withRouter, useHistory } from "react-router-dom";
import API from "../api/api";
import moment from "moment";
import { UserContext } from "../context/UserContext";

function Posts({ data }) {
  const history = useHistory();
  const { isLogin } = useContext(UserContext);

  const addPost = (e) => {
    history.push("/blog/add");
  };

  const editPost = (e) => {
    history.push(`/blog/edit/${e.target.id}`);
  };
  const deletePost = (e) => {
    API.delete(`/post/${e.target.id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };
  const logout = () => {
    localStorage.removeItem("x-auth-token");
    window.location.reload();
  };

  return (
    <>
      {isLogin && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="btn green " onClick={addPost}>
            New
          </button>
          <button className="btn red " onClick={logout}>
            Log Out
          </button>
        </div>
      )}

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
                  <Link to={`/blog/posts/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>
                <p className="article-desc">{article.description} </p>
                <footer className="article-footer">
                  <p>
                    {moment(article.createdAt).startOf("now").fromNow()},{" "}
                    <Link to={`/blog/tag/${article.category}`}>
                      {" "}
                      {article.tag}
                    </Link>
                  </p>
                </footer>
                {isLogin && (
                  <div className="article-buttons">
                    <button
                      id={article._id}
                      className="btn orange"
                      onClick={editPost}
                    >
                      Edit
                    </button>
                    <button
                      id={article._id}
                      className="btn red btn-margin"
                      onClick={deletePost}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default withRouter(Posts);
