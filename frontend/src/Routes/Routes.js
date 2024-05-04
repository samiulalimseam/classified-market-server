import React from 'react';
import { createBrowserRouter, Link } from 'react-router-dom';
import Blogs from '../Pages/Blogs/Blogs';
import CategoryPage from '../Pages/CategoryPage/CategoryPage';
import AddProducts from '../Pages/Dashboard/AddProducts/AddProducts';
import Dashboard from '../Pages/Dashboard/Dashboard';
import BuyersTable from '../Pages/Dashboard/MainDashboard/BuyersTable/BuyersTable';
import MainDashboard from '../Pages/Dashboard/MainDashboard/MainDashboard';
import OrderTable from '../Pages/Dashboard/MainDashboard/OrderTable/OrderTable';
import ProductTable from '../Pages/Dashboard/MainDashboard/ProductTable/ProductTable';
import SellersTable from '../Pages/Dashboard/MainDashboard/SellersTable/SellersTable';
import Profile from '../Pages/Dashboard/Profile';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Main from '../Pages/Main';
import Payment from '../Pages/Payment/Payment';
import SearchPage from '../Pages/SearchPage/SearchPage';
import SignUp from '../Pages/SignUp/SignUp';
import AdminRoutes from './AdminRoutes';
import BuyerRoute from './BuyerRoute';
import PrivateRoutes from './PrivateRoutes';
import SellerRoute from './SellerRoute';
import ErrorImgSVG from '../assets/icons/errorImage';
import Test from '../Pages/Test/Test';
import CreateAd from '../Pages/CreateAd/CreateAd';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/search/:id',
                element: <SearchPage></SearchPage>,
                loader: ({ params }) => params.id
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/test',
                element: <Test></Test>
            },
            {
                path: '/category/:id',
                element:  <CategoryPage></CategoryPage>,
                loader: ({ params }) => fetch(`${process.env.NODE_ENV === 'production' ? "" : "http://localhost:5000"}/api/category/${params.id}`)
            },
            {
                path: '/dashboard',
                element: <PrivateRoutes>  <Dashboard></Dashboard></PrivateRoutes>,
                children: [
                    {
                        path: '/dashboard/',
                        element: <MainDashboard></MainDashboard>,
                        children: [
                            {
                                path: '*',
                                element: <div><p className="text-2xl">Cooming Soon</p></div>
                            },
                            {
                                path: '/dashboard/orders',
                                element: <BuyerRoute><OrderTable></OrderTable></BuyerRoute>
                            },
                            {
                                path: '/dashboard/payment/:id',
                                element: <BuyerRoute><Payment></Payment></BuyerRoute>,
                                loader: ({params})=> params.id
                            },
                            {
                                path: '/dashboard/products',
                                element: <SellerRoute><ProductTable></ProductTable></SellerRoute>
                            },
                            {
                                path: '/dashboard/buyers',
                                element: <AdminRoutes><BuyersTable></BuyersTable></AdminRoutes>
                            },
                            {
                                path: '/dashboard/sellers',
                                element: <AdminRoutes><SellersTable></SellersTable></AdminRoutes>
                            },
                            {
                                path: '/dashboard/profile',
                                element: <Profile></Profile>
                            },
                        ]
                    },

                    {
                        path: '/dashboard/addproduct',
                        element: <SellerRoute> <AddProducts></AddProducts></SellerRoute>
                    },
                    
                ]
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/createAd',
                element: <CreateAd></CreateAd>
            },
            {
                path: '*',
                element: <div className='h-[80vh] flex flex-col items-center justify-center'><p className="text-4xl font-light">404 Not Found</p>
                <ErrorImgSVG  />
                 <Link className='btn btn-ghost text-accent'>Go Back</Link></div>
            }
        ]
    }
]);

