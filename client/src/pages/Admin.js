import React, { useEffect, useState } from "react";
import "./Admin.css";
import { useHistory, withRouter } from "react-router-dom";
import API from "../api/api";

function Admin() {
  const [data, setData] = useState(null);
  const history = useHistory();

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

  const addPost = (e) => {
    history.push("/controller-page/add");
  };

  const editPost = (e) => {
    history.push(`/controller-page/edit/${e.target.id}`);
  };
  const deletePost = (e) => {
    API.delete(`/post/${e.target.id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    history.push("/blog");
  };
  return (
    <div>
      <button className="button" onClick={addPost}>
        Add +
      </button>
      {data &&
        data.map((post) => (
          <div key={post._id} className="post">
            <div className="post-info">
              <h3>{post.title}</h3>
              <span>Date</span>
              <p>{post.body.slice(0, 30)}</p>
            </div>
            <div className="buttons">
              <button id={post._id} className="button" onClick={editPost}>
                Edit
              </button>
              <button id={post._id} className="button" onClick={deletePost}>
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default withRouter(Admin);
