import React, { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import API from "../api/api";
import "./Feed.css";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Feed() {
  const { tag } = useParams();
  const previousTag = usePrevious(tag);
  const [postData, setPostData] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = [...Array(numberOfPages).keys()];
  const previousPage = usePrevious(pageNumber);

  useEffect(() => {
    const getData = async () => {
      try {
        if (!postData || previousTag !== tag || previousPage !== pageNumber) {
          if (previousTag !== tag) setPageNumber(0);
          const fetchData = await API.get(`/post?q=${tag}&page=${pageNumber}`);
          setPostData(fetchData.data);
          setNumberOfPages(fetchData.data.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [postData, previousTag, tag, pageNumber, pages]);

  return (
    <>
      <Header />
      <Posts data={postData && postData.posts} />
    {pages.length > 1 && <div className="pagination">
      {pages.map((pageIndex) => (
        <button
          className="pagination-button"
          key={pageIndex}
          onClick={() => setPageNumber(pageIndex)}
        >
          {pageIndex + 1}
        </button>
      ))}
      </div>}
      <Footer />
    </>
  );
}

export default Feed;
