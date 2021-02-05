import React from "react";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

function Feed() {
  const { tag } = useParams();

  return (
    <>
      <Header />
      <Posts tag={tag || "all"} />
      {/* <Pagination /> */}
      <Footer />
    </>
  );
}

export default Feed;
