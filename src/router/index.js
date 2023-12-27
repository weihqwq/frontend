import Home from '../page/Home'
import MyPage from '../page/Mypage'
import Deuteronomy from '../page/Deuteronomy/Deuteronomy'
import Administrative from '../page/Administrative/Administrative'
import BasicTest from '../page/BasicTest/BasicTest'
import PaperSelection from '../page/PaperSelection/PaperSelection'
import Login from '../page/Login/Login'
import Register from '../page/Register/Register'
import LimitNumber from '../page/LimitNumber/LimitNumber'
import PaperSelection1 from '../page/PaperSelection1/PaperSelection1'
import PaperSelection2 from '../page/PaperSelection2/PaperSelection2'
import LimitTime from '../page/LimitTime/LimitTime'
import Simulate from '../page/Simulate/Simulate'
import KindSelection from '../page/KindSelection/KindSelection'
import KindSelection2 from '../page/KindSelection/KindSelection2'
import Kind1 from '../page/KindSelection/Kind1'
import Kind2 from '../page/KindSelection/Kind2'
import Kind3 from '../page/KindSelection/Kind3'
import Kind4 from '../page/KindSelection/Kind4'
import Kind5 from '../page/KindSelection/Kind5'
import Kind6 from '../page/KindSelection/Kind6'
import Kind7 from '../page/KindSelection/Kind7'
import Kind8 from '../page/KindSelection/Kind8'

import { createBrowserRouter } from 'react-router-dom'

 const router =createBrowserRouter(
    [
        {
            path:'/',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register />
        },
        {
            path:'/home',
            element:<Home/>
        },
        {
            path:'/mypage',
            element:<MyPage/>
        },
        {
            path:'/Deuteronomy',
            element:<Deuteronomy/>
        },
        {
            path:'/Administrative',
            element:<Administrative/>
        },
        {
            path:'/BasicTest',
            element:<BasicTest/>
        },
        {
            path:'/BasicTest/:paperId',
            element:<BasicTest />
        },
        {
            path:'/PaperSelection',
            element:<PaperSelection />
        },
        {
            path:'/PaperSelection1',
            element:<PaperSelection1 />
        },
        {
            path:'/PaperSelection2',
            element:<PaperSelection2 />
        },
        {
            path:'/LimitNumber/:paperId',
            element:<LimitNumber />
        },
        {
            path:'/LimitTime/:paperId',
            element:<LimitTime />
        },
        {
            path:'/Simulate',
            element:<Simulate />
        },
        {
            path:'/KindSelection',
            element:<KindSelection />
        },
        {
            path:'/KindSelection2',
            element:<KindSelection2 />
        },
        {
            path:'/Kind1',
            element:<Kind1 />
        },
        {
            path:'/Kind2',
            element:<Kind2 />
        },
        {
            path:'/Kind3',
            element:<Kind3 />
        },
        {
            path:'/Kind4',
            element:<Kind4 />
        },
        {
            path:'/Kind5',
            element:<Kind5 />
        },
        {
            path:'/Kind6',
            element:<Kind6 />
        },
        {
            path:'/Kind7',
            element:<Kind7 />
        },
        {
            path:'/Kind8',
            element:<Kind8 />
        }
        
    ]
)
export default router