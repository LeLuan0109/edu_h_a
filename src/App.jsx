import './index.css'
import React, { Suspense, lazy } from 'react'
import BaseLayout from './components/layout/mainLayout/Layout'
import { Route, Routes } from 'react-router-dom'
import { routes } from './utils/constants'
// const HomePage = lazy(() => import('./views/home-page/HomePage'))
// const InfoTestHolland = lazy(() => import('./views/info-test-holland/InfoTestHolland'))
// const TestHolland = lazy(() => import('./views/test-holland/TestHolland'))
// const About = lazy(() => import('./views/about/About'))
import reportWebVitals from './reportWebVitals'
import HomePage from './views/home-page/HomePage'
import InfoTestHolland from './views/info-test-holland/InfoTestHolland'
import About from './views/about/About'
import TestHolland from './views/test-holland/TestHolland'
import ResultTestHolland from './views/resultTestHolland/ResultTestHolland'
import ResultTestDisc from './views/resultTestDisc/ResultTestDisc'
import InfoTestDisc from './views/infoTestDisc/InfoTestDisc'
import TestDisc from './views/testDisc/TestDisc'

function App() {

  return (
    <Routes >
      <Route element={<BaseLayout />}>
        {/* <Route path={routes.DEFAULT} element={<HomePage />}/> */}
        <Route path={routes.DEFAULT} element={<InfoTestHolland />} />
        {/* <Route path={routes.INFO_TEST_DISC} element={<InfoTestDisc />} /> */}
        {/* <Route path={routes.TEST_DISC} element={<TestDisc />} /> */}
        <Route path={routes.TEST_HOLLAND} element={<TestHolland />} />
        {/* <Route path={routes.ABOUT} element={<About />} /> */}
        <Route path={routes.RESULT_HOLLAND} element={<ResultTestHolland />} />
        {/* <Route path={routes.RESULT_DISC} element={<ResultTestDisc />} /> */}
      </Route>
    </Routes>
  )
}

export default App

reportWebVitals()
