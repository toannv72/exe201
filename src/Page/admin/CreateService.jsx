
import { useEffect, useState } from 'react'
import { getData, postData } from '../../api/api'
import { textApp } from '../../TextContent/textApp'
import ComInput from '../Components/ComInput/ComInput'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import ComUpImg from '../Components/ComUpImg/ComUpImg'
import { firebaseImgs } from '../../upImgFirebase/firebaseImgs'
import ComButton from '../Components/ComButton/ComButton'
import ComHeaderAdmin from '../Components/ComHeaderAdmin/ComHeaderAdmin'
import ComTextArea from '../Components/ComInput/ComTextArea'
import ComNumber from '../Components/ComInput/ComNumber'
import { Select, notification } from 'antd'
import ComSelect from '../Components/ComInput/ComSelect'
import ComHeaderStaff from '../Components/ComHeaderStaff/ComHeaderStaff'
import { useStorage } from '../../hooks/useLocalStorage'

const options = [
    {
        label: "Khám bệnh",
        value: "Vet Visit"
    },
    {
        label: "Làm đẹp",
        value: "Grooming"
    },
    {
        label: "Vắc-xin",
        value: "Vaccination"
    },
];

export default function CreateService() {
    const [disabled, setDisabled] = useState(false);
    const [image, setImages] = useState('');
    const [api, contextHolder] = notification.useNotification();
    const [token, setToken] = useStorage("user", {});


    useEffect(() => {
        getData('/offers/getAllInformation')
            .then((e) => {
                console.log(111111111111111, e);
            })

        // const fetchData = async () => {
        //     try {
        //       const response = await fetch('https://petside.azurewebsites.net/api/offers/getAllInformation');
        //       const jsonData = await response.json();
        //       console.log(jsonData);
        //     } catch (error) {
        //       console.error('Error fetching data:', error);
        //     }
        //   };

        //   fetchData();
    }, [])

    const CreateProductMessenger = yup.object({
        serviceName: yup.string().required(textApp.CreateProduct.message.name),
        price: yup.number().min(1, textApp.CreateProduct.message.priceMin).typeError(textApp.CreateProduct.message.price),
        price1: yup.string().required(textApp.CreateProduct.message.price).min(1, textApp.CreateProduct.message.priceMin).test('no-dots', textApp.CreateProduct.message.priceDecimal, value => !value.includes('.')),
        category: yup.string().required(textApp.CreateProduct.message.category),
        description: yup.string().required(textApp.CreateProduct.message.description),
    })
    const createProductRequestDefault = {
        price: 1000,
    };
    const methods = useForm({
        resolver: yupResolver(CreateProductMessenger),
        defaultValues: {
            serviceName: "",
            price: "",
            category: "",
            image: "",
            description: "",
        },
        values: createProductRequestDefault
    })
    const { handleSubmit, register, setFocus, watch, setValue } = methods;
    console.log("Current form values:", watch());

    function isInteger(number) {
        return typeof number === 'number' && isFinite(number) && Math.floor(number) === number;
    }
    const onSubmit = (data) => {
        if (data.price % 1000 !== 0) {
            api["error"]({
                message: textApp.CreateProduct.Notification.m7.message,
                description:
                    textApp.CreateProduct.Notification.m7.description
            });
            return
        }
        if (!isInteger(data.price)) {

            api["error"]({
                message: textApp.CreateProduct.Notification.m1.message,
                description:
                    textApp.CreateProduct.Notification.m1.description
            });
            return
        }

        if (data.category.length === 0) {
            api["error"]({
                message: textApp.CreateProduct.Notification.m4.message,
                description:
                    textApp.CreateProduct.Notification.m4.description
            });
            return
        }
        if (image.length === 0) {
            api["error"]({
                message: textApp.CreateProduct.Notification.m5.message,
                description:
                    textApp.CreateProduct.Notification.m5.description
            });
            return

        }

        setDisabled(true)
        firebaseImgs(image)
            .then((dataImg) => {
                console.log('ảnh nè : ', dataImg);
                const updatedData = {
                    ...data, // Giữ lại các trường dữ liệu hiện có trong data
                    image: dataImg[0], // Thêm trường images chứa đường dẫn ảnh

                };

                postData(`/offers/CreateInformation?listProvider=${token?.data?.providerId}`, updatedData, {})
                    .then((dataS) => {
                        console.log(dataS);
                        setDisabled(false)
                        api["success"]({
                            message: textApp.CreateProduct.Notification.m2.message,
                            description:
                                textApp.CreateProduct.Notification.m2.description
                        });
                    })
                    .catch((error) => {
                        api["error"]({
                            message: textApp.CreateProduct.Notification.m3.message,
                            description:
                                textApp.CreateProduct.Notification.m3.description
                        });
                        console.error("Error fetching items:", error);
                        setDisabled(false)
                    });
            })
            .catch((error) => {
                console.log(error)
            });
        console.log("Submitted data", data);

    }
    const onChange = (data) => {
        const selectedImages = data;
        // Tạo một mảng chứa đối tượng 'originFileObj' của các tệp đã chọn
        const newImages = selectedImages.map((file) => file.originFileObj);
        // Cập nhật trạng thái 'image' bằng danh sách tệp mới
        setImages(newImages);
        console.log(image);
        // setFileList(data);
    }
    const handleValueChange = (e, value) => {
        console.log("Changed value:", value);
        setValue("price", value, { shouldValidate: true });
    };

    const handleValueChangeSelect = (e, value) => {
        if (value.length === 0) {
            setValue("category", null, { shouldValidate: true });
        } else {
            setValue("category", value, { shouldValidate: true });
        }
        console.log("Changed category value:", value);
    };
    return (
        <>
            {contextHolder}
            <ComHeaderStaff />
            <div className="isolate bg-white px-6 py-10 sm:py-10 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Tạo dịch vụ mới
                    </h2>

                </div>
                <FormProvider {...methods} >
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4 max-w-xl sm:mt-8">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <div className="mt-2.5">
                                    <ComInput
                                        type="text"
                                        label={textApp.CreateProduct.label.name}
                                        placeholder={textApp.CreateProduct.placeholder.name}
                                        {...register("serviceName")}
                                        required
                                    />

                                </div>
                            </div>
                            <div>
                                <ComNumber
                                    label={textApp.CreateProduct.label.price}
                                    placeholder={textApp.CreateProduct.placeholder.price}
                                    // type="money"
                                    defaultValue={1000}
                                    min={1000}
                                    money
                                    onChangeValue={handleValueChange}
                                    {...register("price1")}
                                    required
                                />

                            </div>
                            {/* <div>
                                <ComNumber
                                    label={textApp.CreateProduct.label.reducedPrice}
                                    placeholder={textApp.CreateProduct.placeholder.reducedPrice}
                                    // type="money"
                                    defaultValue={1000}
                                    min={1000}
                                    money
                                    onChangeValue={handleValueChange1}
                                    {...register("reducedPrice1")}
                                    required
                                />

                            </div> */}
                            {/* <div>
                                <ComNumber
                                    label={textApp.CreateProduct.label.quantity}
                                    placeholder={textApp.CreateProduct.placeholder.quantity}
                                    // type="numbers"
                                    min={1}
                                    defaultValue={1}
                                    {...register("quantity")}
                                    required
                                />

                            </div> */}


                            <div className="">
                                <ComSelect
                                    size={"large"}
                                    style={{
                                        width: '100%',
                                    }}
                                    label={textApp.CreateProduct.label.category}
                                    placeholder={textApp.CreateProduct.placeholder.category}
                                    required
                                    onChangeValue={handleValueChangeSelect}
                                    options={options}
                                    {...register("category")}

                                />
                            </div>
                            {/* <div className="sm:col-span-2">
                                <ComInput
                                    label={textApp.CreateProduct.label.shape}
                                    placeholder={textApp.CreateProduct.placeholder.shape}
                                    required
                                    type="text"
                                    {...register("shape")}
                                />
                            </div> */}


                            <div className="sm:col-span-2">

                                <div className="mt-2.5">

                                    <ComTextArea
                                        label={textApp.CreateProduct.label.description}
                                        placeholder={textApp.CreateProduct.placeholder.description}
                                        rows={4}
                                        defaultValue={''}
                                        required
                                        maxLength={1000}
                                        {...register("description")}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="text-paragraph font-bold">
                                    Hình ảnh
                                    <span className="text-paragraph font-bold text-error-7 text-red-500">
                                        *
                                    </span>

                                </label>
                                <ComUpImg onChange={onChange} />
                            </div>
                        </div>
                        <div className="mt-10">
                            <ComButton

                                disabled={disabled}
                                htmlType="submit"
                                type="primary"
                                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {textApp.common.button.createProduct}
                            </ComButton>
                        </div>
                    </form>
                </FormProvider>



            </div>
        </>
    )
}
