import React, { useMemo, useContext } from "react";
import { withRouter, useHistory, useParams, Link } from "react-router-dom";
import "./Form.css";
import API from "../api/api";
import { PreviewContext } from "../context/PreviewContext";

function Form() {
  const history = useHistory();
  const { postId } = useParams();
  const { postPreview, setPostPreview } = useContext(PreviewContext);

  useMemo(() => {
    const getData = async () => {
      try {
        if (postId && postId !== postPreview.id) {
          console.log("girdi");
          const fetchData = await API.get(`post/unique/${postId}`);
          const { title,description, tag, image, body } = fetchData.data;
          setPostPreview({ id: postId, title,description, tag, image, body });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [postId, postPreview]);

  const handleChange = (e) => {
    setPostPreview({ ...postPreview, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postId) {
      API.post("/post", postPreview)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      API.put(`/post/${postId}`, postPreview)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    history.push("/blog");
  };


  return (
    postPreview && (
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={postPreview.title}
          id="title"
          placeholder="title.."
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          value={postPreview.description}
          id="description"
          placeholder="Description.."
          onChange={handleChange}
        />

        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          value={postPreview.tag}
          id="tag"
          placeholder="tag..."
          onChange={handleChange}
        />

        <label htmlFor="image">Image</label>
        <input
          type="text"
          value={postPreview.image}
          id="image"
          placeholder="img..."
          onChange={handleChange}
        />

        <label htmlFor="body">Body</label>
        <textarea
          value={postPreview.body}
          id="body"
          placeholder="body..."
          onChange={handleChange}
        />

        <Link to="/preview">
          <input type="submit" value="Önizle" />
        </Link>
        <input type="submit" value="Yolla" />
      </form>
    )
  );
}

export default withRouter(Form);
