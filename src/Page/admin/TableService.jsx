
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Highlighter from 'react-highlight-words';
import * as yup from "yup"
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Select, Space, Table, Tooltip, Typography, notification } from 'antd';
import { textApp } from '../../TextContent/textApp';
import { deleteData, getData, postData, putData } from '../../api/api';
import { firebaseImgs } from '../../upImgFirebase/firebaseImgs';
import ComButton from '../Components/ComButton/ComButton';
import ComUpImg from '../Components/ComUpImg/ComUpImg';
import ComInput from '../Components/ComInput/ComInput';
import ComTextArea from '../Components/ComInput/ComTextArea';
import ComNumber from '../Components/ComInput/ComNumber';
import ComSelect from '../Components/ComInput/ComSelect';
import moment from 'moment/moment';
import ComHeaderStaff from '../Components/ComHeaderStaff/ComHeaderStaff';


export default function TableService() {
    const [disabled, setDisabled] = useState(false);
    const [image, setImages] = useState([]);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [dataRun, setDataRun] = useState(false);
    const [productRequestDefault, setProductRequestDefault] = useState({});
    const [productPrice, setProductPrice] = useState(1000);
    const [api, contextHolder] = notification.useNotification();
    const [selectedcategorys, setSelectedCategorys] = useState();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    console.log(productRequestDefault);
    const showModalEdit = (e) => {
        setSelectedCategorys(e.offerings.category)
        setProductPrice(e.offerings.price)
        setProductRequestDefault({
            serviceName: e.offerings.serviceName,
            price: e.offerings.price,
            price1: e.offerings.price,
            category: e.offerings.category,
            description: e.offerings.description,
            offerId: e.offerings.offerId
        })
        setIsModalOpen(true);
    };

    const showModalDelete = (e) => {
        setProductRequestDefault({
            offerId: e._offerId
        })
        setIsModalOpenDelete(true);
    };
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

    const handleCancel = () => {
        setIsModalOpen(false);

    };
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };
    const handleValueChange = (e, value) => {
        setProductPrice(value)
        setValue("price", value, { shouldValidate: true });
    };

    function formatCurrency(number) {
        // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
        if (typeof number === "number") {
            return number.toLocaleString('en-US', {
                style: 'currency',
                currency: 'VND',
            });
        }
    }
    const CreateProductMessenger = yup.object({

        serviceName: yup.string().required(textApp.CreateProduct.message.name),
        price: yup.number().min(1, textApp.CreateProduct.message.priceMin).typeError(textApp.CreateProduct.message.price),
        price1: yup.string().required(textApp.CreateProduct.message.price).min(1, textApp.CreateProduct.message.priceMin).test('no-dots', textApp.CreateProduct.message.priceDecimal, value => !value.includes('.')),
        category: yup.string().required(textApp.CreateProduct.message.category),
        description: yup.string().required(textApp.CreateProduct.message.description),
    })

    const methods = useForm({
        resolver: yupResolver(CreateProductMessenger),
        defaultValues: {
            serviceName: "",
            price: "",
            category: '',
            description: "",
        },
        values: productRequestDefault
    })
    const { handleSubmit, register, setFocus, watch, setValue } = methods
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

        setDisabled(true)
        firebaseImgs(image)
            .then((dataImg) => {
                if (Array.isArray(image) && image.length === 0) {
                    const updatedData = {
                        ...data, // Giữ lại các trường dữ liệu hiện có trong data
                        category:selectedcategorys

                    };
                    console.log(1111111111111,updatedData)
                    putData(`/offers/updateOffers`, productRequestDefault.offerId, updatedData, {})
                        .then((dataS) => {
                            api["success"]({
                                message: textApp.TableProduct.Notification.update.message,
                                description:
                                    textApp.TableProduct.Notification.update.description
                            });
                            setDataRun(!dataRun)
                        })
                        .catch((error) => {
                            api["error"]({
                                message: textApp.TableProduct.Notification.updateFail.message,
                                description:
                                    textApp.TableProduct.Notification.updateFail.description
                            });
                            console.error("Error fetching items:", error);
                            setDisabled(false)
                        });
                } else {
                    const updatedData = {
                        ...data, // Giữ lại các trường dữ liệu hiện có trong data
                        image: dataImg[0], // Thêm trường images chứa đường dẫn ảnh
                        category:selectedcategorys
                    };
                    console.log(1111111111111,updatedData)

                    putData(`/offers/updateOffers`, productRequestDefault.offerId, updatedData, {})
                        .then((dataS) => {
                            api["success"]({
                                message: textApp.TableProduct.Notification.change.message,
                                description:
                                    textApp.TableProduct.Notification.change.description
                            });

                        })
                        .catch((error) => {
                            console.error("Error fetching items:", error);
                            setDisabled(false)
                            api["error"]({
                                message: textApp.TableProduct.Notification.updateFail.message,
                                description:
                                    textApp.TableProduct.Notification.updateFail.description
                            });
                        });
                    setDataRun(!dataRun)
                }

            }
            )
            .catch((error) => {
                console.log(error)
            });
        setImages([]);
        setDisabled(false)
        setIsModalOpen(false);
    }

    const deleteById = () => {
        setDisabled(true)
        deleteData('/offers/offering/369e9a23-1bc7-46d0-30dd-08dc39436da9', productRequestDefault.offerId)
            .then((data) => {
                setDisabled(false)
                handleCancelDelete()
                api["success"]({
                    message: textApp.TableProduct.Notification.delete.message,
                    description:
                        textApp.TableProduct.Notification.delete.description
                });

            })
            .catch((error) => {
                console.log(error);
                setDisabled(false)
                handleCancelDelete()
                api["error"]({
                    message: textApp.TableProduct.Notification.deleteError.message,
                    description:
                        textApp.TableProduct.Notification.deleteError.description
                });
            })
        setDataRun(!dataRun)

    }
    useEffect(() => {
        setTimeout(() => {
            getData('/offers/getInformation/bf081171-4903-4ca2-0277-08dc33bf60b4', {})
                .then((data) => {
                    console.log(data.data.data.offerProviders);
                    setProducts(data.data.data.offerProviders)
                })
                .catch((error) => {
                    console.error("Error fetching items:", error);
                });

        }, 100);


    }, [dataRun]);

    const onChange = (data) => {
        const selectedImages = data;
        // Tạo một mảng chứa đối tượng 'originFileObj' của các tệp đã chọn
        const newImages = selectedImages.map((file) => file.originFileObj);
        // Cập nhật trạng thái 'image' bằng danh sách tệp mới
        setImages(newImages);

    }
    const getColumnSearchProps = (dataIndex, title) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Tìm kiếm ${title}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <ComButton
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        // icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        <div className='justify-center flex '><SearchOutlined />Tìm kiếm</div>
                    </ComButton>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Đặt lại
                    </Button>
                    {/* <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button> */}
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Đóng
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [

        {
            title: 'Ảnh dịch vụ',
            dataIndex: 'offerings',
            key: 'img',
            fixed: 'left',
            render: (_, record) => (

                <div className='flex items-center justify-center'>
                    <img src={record.offerings.image} className='h-24 object-cover object-center   ' alt={record.image} />
                </div>
            )
        },
        {
            title: 'Tên dịch vụ',
            dataIndex: 'offerings',
            width: 200,
            key: 'offerings',
            fixed: 'left',
            render: (_, record) => (
                <div>
                    <h1>{record.offerings.serviceName}</h1>
                </div>
            ),
        },
        {
            title: 'Giá Tiền',
            width: 150,
            dataIndex: 'offerings',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (_, record) => (

                <div >
                    <h1>{formatCurrency(record.offerings.price)}</h1>
                </div>
            )
        },
        // {
        //     title: 'Giá tiền đã giảm',
        //     width: 150,
        //     dataIndex: 'reducedPrice',
        //     key: 'reducedPrice',
        //     sorter: (a, b) => a.reducedPrice - b.reducedPrice,
        //     render: (_, record) => (

        //         <div >
        //             <h1>{formatCurrency(record.reducedPrice)}</h1>
        //         </div>
        //     )
        // }, 
        // {
        //     title: 'Đã bán',
        //     width: 100,
        //     dataIndex: 'sold',
        //     key: 'sold',
        //     sorter: (a, b) => a.sold - b.sold,
        // },
        // {
        //     title: 'Số lượng',
        //     width: 100,
        //     dataIndex: 'quantity',
        //     key: 'quantity',
        //     sorter: (a, b) => a.quantity - b.quantity,
        // },
        // {
        //     title: 'Ngày chỉnh sửa',
        //     dataIndex: 'updatedAt',
        //     width: 110,
        //     key: 'updatedAt',
        //     sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
        //     render: (_, record) => (
        //         <div className="text-sm text-gray-700 line-clamp-4">
        //             <p>{moment(record.updatedAt).format('l')}</p>
        //         </div>
        //     )
        // },
        {
            title: 'Phân loại',
            dataIndex: 'offerings',
            key: 'category',
            render: (_, record) => (
                <div className="text-sm text-gray-700 line-clamp-4">
                    <p>{record.offerings.category}</p>
                    <p>{record.offerings.category}</p>
                    <p>{record.offerings.category}</p>
                </div>
            )
        },
        {
            title: 'Chi tiết dịch vụ',
            dataIndex: 'offerings',
            key: 'description',
            width: 300,
            render: (_, record) => (

                <div className="text-sm text-gray-700 line-clamp-4">
                    <p className="text-sm text-gray-700 line-clamp-4">{record.offerings.description}</p>
                </div>

            ),

        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,

            render: (_, record) => (

                <div className='flex items-center flex-col'>
                    <div>
                        <Typography.Link onClick={() => showModalEdit(record)}>
                            Chỉnh sửa
                        </Typography.Link>
                    </div>
                    <div className='mt-2'>
                        <Typography.Link onClick={() => showModalDelete(record)}>
                            <div className='text-red-600'>  Xóa</div>
                        </Typography.Link>
                    </div>
                </div>
            )
        },
    ];

    const handleChange = (e, value) => {
        console.log(value);
        setSelectedCategorys(value);
        // setcategory(value)
        if (value.length === 0) {
            setValue("category", null, { shouldValidate: true });
        } else {
            setValue("category", value, { shouldValidate: true });

        }
    };
    return (
        <>
            {contextHolder}
            <ComHeaderStaff />
            <div className='flex p-5 justify-center'>
                <Table
                    rowKey="_id"
                    columns={columns}
                    dataSource={products}
                    scroll={{
                        x: 1520,
                        y: "70vh",
                    }}
                    bordered
                    pagination={{
                        showSizeChanger: true, // Hiển thị dropdown cho phép chọn số lượng dữ liệu
                        pageSizeOptions: ['10', '20', '50', '100'], // Các tùy chọn số lượng dữ liệu
                    }}
                />
            </div>
            <Modal title={textApp.TableProduct.title.change}
                okType="primary text-black border-gray-700"
                open={isModalOpen}

                width={800}
                style={{ top: 20 }}

                onCancel={handleCancel}>
                <FormProvider {...methods} >
                    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4 max-w-xl sm:mt-8">
                        <div className=' overflow-y-auto p-4'>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
                                style={{ height: "65vh" }}>
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
                                        value={productPrice}
                                        defaultValue={productRequestDefault.price}
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
                                        // defaultValue={productRequestDefault.reducedPrice}
                                        min={1000}
                                        value={productReducedPrice}
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
                                        min={0}
                                        value={productQuantity}
                                        onChangeValue={handleValueChangeQuantity}
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
                                        onChangeValue={handleChange}
                                        value={selectedcategorys}
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
                                {/* <div className="sm:col-span-2">
                                    <ComInput
                                        label={textApp.CreateProduct.label.detail}
                                        placeholder={textApp.CreateProduct.placeholder.detail}
                                        required
                                        type="text"
                                        {...register("detail")}
                                    />
                                </div> */}
                                {/* <div className="sm:col-span-2">
                                    <ComInput
                                        label={textApp.CreateProduct.label.models}
                                        placeholder={textApp.CreateProduct.placeholder.models}
                                        required
                                        type="text"
                                        {...register("models")}
                                    />
                                </div>
    
                                <div className="sm:col-span-2">
                                    <ComInput
                                        label={textApp.CreateProduct.label.accessory}
                                        placeholder={textApp.CreateProduct.placeholder.accessory}
                                        required
                                        type="text"
                                        {...register("accessory")}
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
                        </div>
                        <div className="mt-10">
                            <ComButton

                                disabled={disabled}
                                htmlType="submit"
                                type="primary"

                                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Chỉnh sửa
                            </ComButton>
                        </div>
                    </form>
                </FormProvider>

            </Modal>


            <Modal title={textApp.TableProduct.title.delete}
                okType="primary text-black border-gray-700"
                open={isModalOpenDelete}
                width={500}
                // style={{ top: 20 }}
                onCancel={handleCancelDelete}>
                <div className='text-lg p-6'>Bạn có chắc chắn muốn xóa dịch vụ đã chọn này không?</div>

                <div className='flex'>
                    <ComButton
                        disabled={disabled}
                        type="primary"
                        danger
                        onClick={deleteById}
                    >
                        {textApp.TableProduct.modal.submitDelete}
                    </ComButton>
                    <ComButton
                        type="primary"
                        disabled={disabled}
                        onClick={handleCancelDelete}
                    >
                        {textApp.TableProduct.modal.cancel}
                    </ComButton>
                </div>
            </Modal>
        </>
    )
}
