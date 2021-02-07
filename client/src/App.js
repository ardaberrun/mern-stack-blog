import React, { useContext } from "react";
import "./App.css";
import Feed from "./pages/Feed";
import PostDetail from "./pages/PostDetail";
import About from "./pages/About";
import NotFound from "./pages/404";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Form from "./pages/Form";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import PostPreviewer from "./pages/PostPreviewer";
import PreviewProvider from "./context/PreviewContext";

function App() {
  const { isLogin } = useContext(UserContext);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <About />
          </Route>
          <Route exact path="/blog">
            <Feed />
          </Route>
          <Route exact path="/blog/tag/:tag">
            <Feed />
          </Route>
          <Route exact path="/blog/posts/:slug">
            <PostDetail />
          </Route>
          <Route exact path={`/${process.env.REACT_APP_SECRET_PAGE}`}>
            <Login />
          </Route>
          <Route exact path="/controller-page">
            {isLogin ? <Admin /> : <NotFound />}
          </Route>
          <PreviewProvider>
            <Route exact path="/preview">
              {isLogin ? <PostPreviewer /> : <NotFound />}
            </Route>
            <Route exact path="/controller-page/add">
              {isLogin ? <Form /> : <NotFound />}
            </Route>
            <Route exact path="/controller-page/edit/:postId">
              {isLogin ? <Form /> : <NotFound />}
            </Route>
          </PreviewProvider>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
