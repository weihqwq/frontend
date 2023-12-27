//项目的入口 从这里运行

//react必要的两个核心包
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//导入项目的根组件
import App from './App';

//导入路由
import router from './router';
import { RouterProvider } from 'react-router-dom';

//把APP根组件渲染到ID为root的dom节点上
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
            <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>

);


