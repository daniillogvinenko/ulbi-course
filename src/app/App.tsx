import React, { Suspense } from 'react'
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import './styles/index.scss'
import { AboutPageAsync as AboutPage } from 'pages/AboutPage';
import { MainPageAsync as MainPage } from 'pages/MainPage';
import { useTheme } from 'app/providers/ThemeProvider/lib/useTheme';
import { classNames } from 'helpers/classNames/classNames';



const App = () => {

  const { theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme}>THEME</button>
      <Link to={'/about'}>About</Link>
      <Link to={'/'}>Home</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/about' element={<AboutPage />}/>
          <Route path='/' element={<MainPage />}/>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App