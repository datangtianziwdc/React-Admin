import './App.scss'
import { NavLink, useRoutes } from 'react-router-dom'
import './utils/nprogress'
import './utils/axios'
import routes from './router'
import AuthEntication from './components/authEntication/index'
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
      <AuthEntication>{element}</AuthEntication>
    </>
  )
}

export default App
