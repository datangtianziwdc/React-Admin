import Home from '../../views/sendNewsBox/home/Home'
import RightList from '../../views/sendNewsBox/rightList/RightList'
import RoleList from '../../views/sendNewsBox/roleList/RoleList'
import UserList from '../../views/sendNewsBox/user-manage/UserList'
import NewsAdd from '../../views/sendNewsBox/news-manage/NewsAdd'
import NewsDraft from '../../views/sendNewsBox/news-manage/NewsDraft'
import NewsCategory from '../../views/sendNewsBox/news-manage/NewsCategory'
import Audit from '../../views/sendNewsBox/audit-manage/Audit'
import AuditList from '../../views/sendNewsBox/audit-manage/AuditList'
import Unpublished from '../../views/sendNewsBox/publish-manage/Unpublished'
import Published from '../../views/sendNewsBox/publish-manage/Published'
import Sunset from '../../views/sendNewsBox/publish-manage/Sunset'
import NewsPreview from '../../views/sendNewsBox/news-manage/NewsPreview'
const routeMap = {
  '/home': Home,
  'user-manage/list': UserList,
  'right-manage/right/list': RightList,
  'right-manage/role/list': RoleList,
  'news-manage/add': NewsAdd,
  'news-manage/draft': NewsDraft,
  'news-manage/category': NewsCategory,
  'news-manage/preview/:id': NewsPreview,
  'audit-manage/audit': Audit,
  'audit-manage/list': AuditList,
  'publish-manage/unpublished': Unpublished,
  'publish-manage/published': Published,
  'publish-manage/sunset': Sunset,
}
export default routeMap
