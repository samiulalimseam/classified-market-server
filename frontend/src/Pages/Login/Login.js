import React, { useContext, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../Context/AuthContextProvider';
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const Login = () => {
    const { setNewTitle, setAccount, signIn, googleLogin, user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(false)

    // toast
    // const successToast = () => {
    //     toast.success('Login Successful!', {
    //         position: "top-center",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //         // transition: Bounce,
    //     });
    // }
    setNewTitle('Login- SaveYou')
    const from = location.state?.from?.pathname || '/';

    const inserUserToDb = (user) => {
        // setLoading(true)
        fetch(`${process.env.NODE_ENV === 'production' ? "" : "http://localhost:5000"}/api/addUser`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => {
            console.log(res)
            console.log('Success')
            setAccount(user)
            // successToast();
        }).catch(err => console.log(err))
            // .finally(() => {
            //     setLoading(false)
            // })

    }

    const handleLogin = data => {
        // setLoading(true)
        signIn(data.email, data.password)
            .then(() => {
                // successToast();
                // setTimeout(() => {
                //     navigate(from, { replace: true })
                // }, 500)
            })
            .catch(err => {
                console.log(err)
            })
            // .finally(() => {
            //     setLoading(false)
            // })
    }

    const handleGoogleLogin = () => {
        // setLoading(true)
        googleLogin()
            .then(result => {
                // successToast();
                console.log(result.user);
                const userToInsert = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    uid: result.user?.uid,
                    phone: '',
                    acType: "Buyer",
                    img: result.user?.photoURL,
                    verified: 'Not Verified'
                }
                console.log('Data=', userToInsert);
                inserUserToDb(userToInsert);
                // setTimeout(() => {
                //     navigate(from, { replace: true })
                // }, 3000)
            })
            .catch(err => {
                console.log(err)
            })
            // .finally(() => {
            //     setTimeout(setLoading(false), 10000)

            // })
    }

    if (user?.email) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500
        });
        return <>
            {/* {loading && <span className="loading loading-spinner text-success"></span>} */}

            <Navigate to={'/dashboard'} />
        </>

    }
    else {
        return (
            <div className='w-96 md:w-[800px] m-auto'>
                <div className="hero min-h-screen 0">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-light text-secondary">Login now!</h1>
                            <p className="py-6">Welcome to <span className="font-bold text-accent">Saveyou.com </span><br />
                                Log in to manage your account.
                                Start posting your own ads.
                                Mark ads as favorite and view them later.
                                View and manage your ads at your convenience..</p>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input defaultValue="" {...register("email", { required: true })} type="text" placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className='text-thin text-xs text-red-500'>This field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input {...register("password", { required: true })} type="password" placeholder="password" className="input input-bordered" />
                                    {errors.password && <span className='text-thin text-xs text-red-500'>This field is required</span>}
                                    <label className="label">
                                        <Link className="label-text-alt link link-hover">Forgot password?</Link>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary mb-3">Login</button>
                                </div>
                            </form>
                            <button onClick={handleGoogleLogin} className="btn  btn-secondary  btn-circle m-auto mb-3"><span className='text-xl'><FcGoogle></FcGoogle></span></button>
                            {/* <button onClick={successToast}>Toast</button> */}
                            {/* {loading && <span className="loading loading-infinity loading-lg"></span>} */}
                            <p className="text-sm my-1 font-light text-center mb-3">Dont have an account? <Link className='text-accent font-bold' to={`/signup`}>SignUp Now</Link></p>
                        </div>
                    </div>
                </div>
                {/* Toast notification */}
                {/* <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                /> */}
            </div>
        );
    }
};

export default Login;
