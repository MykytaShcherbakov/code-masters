
import './App.css';
i

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Banner from './components/Banner/Banner.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './slices/themeSlice';
import './App.css';

const App = () => {
  // Добавляем защиту от undefined
  const nightMode = useSelector((state) => state.theme?.nightMode ?? false);
  const dispatch = useDispatch();

  // Для отладки выведем текущее состояние
  React.useEffect(() => {
    console.log('Current theme state:', { nightMode });
  }, [nightMode]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Router>
      <Header onToggleTheme={handleToggleTheme} nightMode={nightMode} />
      <Banner />
    </Router>
  );
};

export default App;


