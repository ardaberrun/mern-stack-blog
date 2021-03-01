import React, { useState, useEffect, useContext } from "react";
import "./About.css";
import API from "../api/api";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";

function About() {
  const [about, setAbout] = useState(null);
  const [edit, setEdit] = useState(false);
  const { isLogin } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    const getAboutData = async () => {
      try {
        if (!about) {
          const fetchData = await API.get(`/about`);
          setAbout(fetchData.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getAboutData();
  }, [about]);

  const handleChange = (e) => {
    setAbout({ ...about, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`/about/${about._id}`, about, {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setEdit(false));
  };

  return (
    about && (
      <div className="about" onDoubleClick={() => isLogin && setEdit(true)}>
        {edit ? (
          <>
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                value={about.title}
                id="title"
                placeholder="title.."
                onChange={handleChange}
              />

              <label htmlFor="image">Image</label>
              <input
                type="text"
                value={about.image}
                id="image"
                placeholder="img..."
                onChange={handleChange}
              />

              <label htmlFor="body">Body</label>
              <textarea
                value={about.body}
                id="body"
                placeholder="body..."
                onChange={handleChange}
              />

              <input type="submit" value="Değiştir" />
            </form>
          </>
        ) : (
          <>
            <div className="image-div">
              <img src={about.image} className="about-image" />
            </div>
            <div className="about-content">
              <h2 className="about-title">{about.title}</h2>
              <p className="about-body">{about.body}</p>
            </div>
            <h3
              className="go-to-blog"
              onClick={() => history.push("/blog/tag/all")}
            >
              Blog'a git!
            </h3>
            <div className="about-footer">
              <div>
                <a href="https://www.instagram.com/">Instagram</a>
              </div>
              <div>
                <a href="https://www.twitter.com/">Twitter</a>
              </div>
              <div>
                <a href="https://www.facebook.com/">Facebook</a>
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
}

export default About;
