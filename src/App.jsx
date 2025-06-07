import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';

function App() {
  return (
    <Routes basename="/web-blog-decisium">
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  );
}

export default App;
