
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
import ComFooter from "../../Components/ComFooter/ComFooter";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import images from "../../../img";
import ComTextArea from "../../Components/ComInput/ComTextArea";



export default function Reissue() {

    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();



    const loginMessenger = yup.object({
        // code: yup.string().required(textApp.Reissue.message.username).min(5, "Username must be at least 5 characters"),
        username: yup.string().required(textApp.Reissue.message.username).min(6, textApp.Reissue.message.usernameMIn),
        phone: yup.string().required(textApp.Reissue.message.phone).min(10, "Số điện thoại phải lớn hơn 9 số!").max(10, "Số điện thoại phải nhỏ hơn 11 số!").matches(/^0\d{9,10}$/, "Số điện thoại không hợp lệ"),
        // .matches(/^[0-9]+$/, 'Số điện thoại phải chứa chỉ số'),
        password: yup.string().required(textApp.Reissue.message.password).min(5, textApp.Reissue.message.passwordMIn),
        password2: yup.string().required(textApp.Reissue.message.password2).min(5, textApp.Reissue.message.passwordMIn),
        email: yup.string().email(textApp.Reissue.message.emailFormat).required(textApp.Reissue.message.email),
        providerName: yup.string().required("Vui lòng nhập tên cửa hàng"),
        location: yup.string().required("Vui lòng nhập địa chỉ cửa hàng"),
        description: yup.string().required("Vui lòng nhập chi tiết cửa hàng"),
    })
    const LoginRequestDefault = {
        // code: "",
        password: "",
        phone: "",
        username: "",
        email: "",

    };
    const methods = useForm({
        resolver: yupResolver(loginMessenger),
        defaultValues: {
            // code: "",
            username: "",
            phone: "",
            password: "",
            email: "",
        },
        values: LoginRequestDefault
    })
    const { handleSubmit, register, setFocus, watch, setValue } = methods
    const onSubmit = (data) => {
        if (data.password2 !== data.password) {

            return setError(textApp.Reissue.message.passwordCheck)
        }
        setDisabled(true)
        setError("")
        const dataPost = {
            "userNameLogin": data.username,
            "password": data.password,
            "providerName": data.providerName,
            "contactInformation": data.phone,
            "serviceType": data.serviceType,
            "imageProvider": 'https://cdn.vietnambiz.vn/2019/10/3/color-silhouette-cartoon-facade-shop-store-vector-14711058-1570007843495391141359-1570076859193969194096-15700769046292030065819-1570076927728377843390.png',
            "availability": data.availability,
            "rating": 0,
            "description": data.description,
            "location": data.location
        }
        postData('/providers/CreateProvider', dataPost, {})
            .then((data) => {
                if (!data.success) {
                    api["error"]({
                        message: 'Thành công!',
                        description:
                            "Đã có tên tài khoản này rồi vui lòng đặt lại! "
                    });
                }else {
                    api["success"]({
                        message: 'Thành công!',
                        description:
                            "Đăng ký tài khoản thành công"
                    });
                    setTimeout(() => {
                        return navigate('/login')
                    }, 3000);
                }
                setDisabled(false)
            })
            .catch((error) => {
                setError(error?.response?.data?.error)
                console.error("Error fetching items:", error);
                setDisabled(false)
            });

    }

    console.log(disabled);
    return (
        <>
            <div className="text-white relative isolate overflow-hidden bg-gray-900  sm:py-32">
                {contextHolder}
            <ComHeader />

                <img
                    src={images.background}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                />
                {/* <ComHeader /> */}
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
                            {textApp.Reissue.pageTitle}
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <FormProvider {...methods} >
                            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>

                                <ComInput
                                    placeholder={textApp.Reissue.placeholder.username}
                                    label={textApp.Reissue.label.username}
                                    type="text"
                                    // search
                                    maxLength={26}
                                    onchange={() => { setError("") }}
                                    {...register("username")}
                                    required
                                />
                                <ComInput
                                    placeholder={"Vui lòng nhập tên cửa hàng"}
                                    label={"Tên cửa hàng"}
                                    type="text"
                                    // search
                                    {...register("providerName")}
                                    required
                                />
                                <ComInput
                                    placeholder={textApp.Reissue.placeholder.phone}
                                    label={textApp.Reissue.label.phone}
                                    type="numbers"
                                    maxLength={16}
                                    {...register("phone")}
                                    required
                                />
                                <ComInput
                                    placeholder={textApp.Reissue.placeholder.email}
                                    label={textApp.Reissue.label.email}
                                    type="text"
                                    {...register("email")}
                                    required
                                />
                                <ComInput
                                    placeholder={textApp.Reissue.placeholder.password}
                                    label={textApp.Reissue.label.password}
                                    type="password"
                                    maxLength={26}
                                    {...register("password")}
                                    required
                                />
                                <ComInput
                                    placeholder={textApp.Reissue.placeholder.password2}
                                    label={textApp.Reissue.label.password2}
                                    type="password"
                                    maxLength={26}
                                    {...register("password2")}
                                    required
                                />
                                <ComInput
                                    placeholder={"Vui lòng nhập địa chỉ cửa hàng"}
                                    label={"Địa chỉ cửa hàng"}
                                    type="text"
                                    // maxLength={26}
                                    {...register("location")}
                                    required
                                />
                                <ComTextArea
                                    placeholder={"Vui lòng nhập giới thiệu về cửa hàng"}
                                    label={"Giới thiệt về cửa hàng"}
                                    type="text"
                                    rows={4}
                                    {...register("description")}
                                    required
                                />
                                <h1 className="text-red-500">{error}</h1>
                                <ComButton
                                    disabled={disabled}
                                    htmlType="submit"
                                    type="primary"

                                >
                                    {textApp.Reissue.pageTitle}
                                </ComButton>


                            </form>
                        </FormProvider>

                        <p className="mt-10 text-center text-sm ">
                            Đã có tài khoản?{' '}
                            <ComLink to={routs["/login"].link} >
                                <>{routs["/login"].name}</>
                            </ComLink>
                        </p>
                    </div>
                </div>
                {/* <ComFooter /> */}
            </div>
        </>
    )

}

