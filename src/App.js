import './App.scss'
import { NavLink, useRoutes } from 'react-router-dom'
import routes from './router'
function App() {
  const element = useRoutes(routes)
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
      {element}
    </>
  )
}

export default App
