import './App.scss'
import { NavLink, useRoutes } from 'react-router-dom'
import './utils/nprogress'
import './utils/axios'
import routes from './router'
import AuthEntication from './components/authEntication/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store,persistor } from './redux/store'
function App() {
  let element = useRoutes(routes)
  // const computedActive = ({ isActive }) => {
  //   return isActive ? 'route-active' : 'route'
  // }
  return (
    <>
      {/* <div>
        <NavLink to="login" className={computedActive}>
          登录
        </NavLink>
        <NavLink to="newsBox" className={computedActive}>
          新闻
        </NavLink>
      </div> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <AuthEntication>{element}</AuthEntication>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
