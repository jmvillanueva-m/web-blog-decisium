import './App.css';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import Home from './pages/Home/Home';
import Blog from './pages/Blog/Blog';
import BlogPost from './pages/Blog/BlogPost';

function App() {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
      const query = new URLSearchParams(location.search);
      const redirectPath = query.get('p');
      
      if (redirectPath) {
          const decodedPath = decodeURIComponent(redirectPath.replace(/~and~/g, '&'));
          navigate(decodedPath, { replace: true });
      }
  }, [location.search, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
