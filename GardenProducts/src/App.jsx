
import './App.css';



import React from 'react';


import Banner from './components/Banner/Banner.jsx';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleTheme } from './slices/themeSlice';
import './App.css';
import Sales from './components/Sales/Sales.jsx';
import Footer from "./Layout/Footer/Footer.jsx"

const App = () => {
  // // Добавляем защиту от undefined
  // const nightMode = useSelector((state) => state.theme?.nightMode ?? false);
  // const dispatch = useDispatch();

  // // Для отладки выведем текущее состояние
  // React.useEffect(() => {
  //   console.log('Current theme state:', { nightMode });
  // }, [nightMode]);

  // const handleToggleTheme = () => {
  //   dispatch(toggleTheme());
  // };

  return (
    <>
      {/* <Header onToggleTheme={handleToggleTheme} nightMode={nightMode} /> */}
      <Banner />
    
      <Sales/>
      <Footer/>
      
    </>
  );
};

export default App;


