import React, { useState, useMemo } from "react";
import { withRouter, useHistory, useParams } from "react-router-dom";
import "./Form.css";
import API from "../api/api";

function Form({ propsId }) {
  const history = useHistory();
  const { postId } = useParams();

  const [formDetail, setFormDetail] = useState({
    title: "",
    tag: "",
    image: "",
    body: "",
  });

  useMemo(() => {
    const getData = async () => {
      try {
        if (postId) {
          const fetchData = await API.get(`post/unique/${postId}`);
          console.log(fetchData);
          setFormDetail(fetchData.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [postId]);

  const handleChange = (e) => {
    setFormDetail({ ...formDetail, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postId) {
      API.post("/post", formDetail)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      API.put(`/post/${postId}`, formDetail)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    history.push("/blog");
  };

  return (
    formDetail && (
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={formDetail.title}
          id="title"
          placeholder="title.."
          onChange={handleChange}
        />

        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          value={formDetail.tag}
          id="tag"
          placeholder="tag..."
          onChange={handleChange}
        />

        <label htmlFor="image">Image</label>
        <input
          type="text"
          value={formDetail.image}
          id="image"
          placeholder="img..."
          onChange={handleChange}
        />

        <label htmlFor="body">Body</label>
        <textarea
          value={formDetail.body}
          id="body"
          placeholder="body..."
          onChange={handleChange}
        />

        <input type="submit" value="Yolla" />
      </form>
    )
  );
}

export default withRouter(Form);
