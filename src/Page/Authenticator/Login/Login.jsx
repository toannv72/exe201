
import { FormProvider, useForm } from "react-hook-form";

import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import { textApp } from "../../../TextContent/textApp";
import { ComLink } from "../../Components/ComLink/ComLink";
import { routs } from "../../../constants/ROUT";
import { useStorage } from "../../../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { postData } from "../../../api/api";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FieldError } from "../../Components/FieldError/FieldError";
import { useCookies } from "react-cookie";
import ComFooter from "../../Components/ComFooter/ComFooter";
import images from "../../../img";

export default function Login() {
    const [token, setToken] = useStorage("user", {});
    const [disabled, setDisabled] = useState(false);
    const [Login, setLogin] = useState(false);
    const [LoginError, setLoginError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const loginMessenger = yup.object({
        // code: yup.string().required(textApp.Login.message.username).min(5, "Username must be at least 5 characters"),
        username: yup.string().required(textApp.Login.message.username),
        password: yup.string().required(textApp.Login.message.password),
        // email: yup.string().email('định dạng sai').required('Login ID is required email'),
    })
    const LoginRequestDefault = {
        password: "",
        username: "",
    };
    const methods = useForm({
        resolver: yupResolver(loginMessenger),
        defaultValues: {
            username: "",
            password: "",
        },
        values: LoginRequestDefault
    })
    const { handleSubmit, register, setFocus, watch, setValue } = methods
    const onSubmit = (data) => {
        // navigate('/staff/product/table')
        setLoginError(false)
        setLogin(false)
        setDisabled(true)
        if (data.username==="admin"&& data.password==="12345") {
            window.location.href = 'https://petside-ihc2-two.vercel.app/dashboard';
            
        } else {
            
            postData('/providers/LoginProvider', data, {})
                .then((data) => {
                    if (data.success) {
                     
                        localStorage.setItem('user', JSON.stringify(data));
                        setToken(data)
                        setDisabled(false)
                        navigate('/staff/order')
                    } else {
                        setDisabled(false)
    
                        setLogin(true)
                    }
    
    
                })
                .catch((error) => {
                    console.error("Error fetching items:", error);
                    setDisabled(false)
                    if (error?.response?.status === 401) {
    
                        setLogin(true)
                    } else {
                        setLoginError(true)
    
                    }
                });
        }
    }

    return (
        <div className="text-white relative isolate overflow-hidden bg-gray-900  sm:py-32">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 style={{}} className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight Login-h2">
                        Đăng nhập
                    </h2>
                </div>
                <img
                    src={images.background}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                />
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <FormProvider {...methods} >
                        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                            <ComInput
                                placeholder={textApp.Login.placeholder.username}
                                label={textApp.Login.label.username}
                                type="text"
                                // search
                                maxLength={15}
                                {...register("username")}
                                required
                            />

                            <ComInput
                                placeholder={textApp.Login.placeholder.password}
                                label={textApp.Login.label.password}
                                type="password"
                                maxLength={16}
                                {...register("password")}
                                required
                            />

                            <FieldError className="text-red-500 text-center">{Login ? textApp.Login.message.error : ''}</FieldError>
                            <FieldError className="text-red-500 text-center">{LoginError ? textApp.Login.message.error1 : ''}</FieldError>
                            <ComButton

                                disabled={disabled}
                                htmlType="submit"
                                type="primary"
                            >
                                {textApp.Login.pageTitle}
                            </ComButton>

                            {/* <ComButton
                                htmlType="submit"
                                type="primary"
                                className="bg-black hover:bg-white"
                            >
                                cancel
                            </ComButton> */}
                        </form>
                    </FormProvider>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Chưa có tài khoản?{' '}
                        <ComLink to={routs["/reissue"].link} >
                            <>{routs["/reissue"].name}</>
                        </ComLink>
                    </p>
                </div>
            </div>
            <ComFooter />
        </div>
    )

}

