import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from 'antd';

import 'antd/dist/antd.css';
import './dashboard.css';

const { Content } = Layout;

import Aside from './modules/Aside.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Posts from './pages/Posts.jsx';
import Categories from './pages/Categories.jsx';
import Article from './pages/Article.jsx';
import Comments from './pages/Comments.jsx';
import Search from './pages/Search.jsx';

function App() {
  return(
    <Router>
      <Layout>
        <Route path="/admin" component={Aside} />
        <Layout style={{ marginLeft: 200 }}>
          <Content style={{ margin: 16, overflow: 'initial' }}>
            <div style={{ padding: 20, background: '#fff', minHeight: '100vh' }}>
              <Route path="/admin" exact component={Dashboard} />
              <Route path="/admin/posts" component={Posts} />
              <Route path="/admin/categories/" component={Categories} />
              <Route path="/admin/article/" exact component={Article} />
              <Route path="/admin/article/:id" component={Article} />
              <Route path="/admin/comments/:id" component={Comments} />
              <Route path="/admin/search/" component={Search} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;