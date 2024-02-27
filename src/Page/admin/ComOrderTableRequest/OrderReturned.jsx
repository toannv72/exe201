
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Highlighter from 'react-highlight-words';
import * as yup from "yup"
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Select, Space, Table, Tooltip, Typography, notification } from 'antd';
import { textApp } from '../../../TextContent/textApp';
import { deleteData, getData, postData, putData } from '../../../api/api';
import { firebaseImgs } from '../../../upImgFirebase/firebaseImgs';
import ComHeaderAdmin from '../../Components/ComHeaderAdmin/ComHeaderAdmin';
import ComButton from '../../Components/ComButton/ComButton';
import ComUpImg from '../../Components/ComUpImg/ComUpImg';
import ComInput from '../../Components/ComInput/ComInput';
import ComTextArea from '../../Components/ComInput/ComTextArea';
import ComNumber from '../../Components/ComInput/ComNumber';
import ComSelect from '../../Components/ComInput/ComSelect';
import moment from 'moment/moment';


export default function OrderReturned({ activeTab }) {
    const [disabled, setDisabled] = useState(false);
    const [order, setOrder] = useState([]);
    const [isModalOpenProcessing, setIsModalOpenProcessing] = useState(false);
    const [isModalOpenCanceled, setIsModalOpenCanceled] = useState(false);
    const [isModalOpenProcessingS, setIsModalOpenProcessingS] = useState(false);
    const [isModalOpenCanceledS, setIsModalOpenCanceledS] = useState(false);
    const [dataRun, setDataRun] = useState(false);
    const [orderRequestDefault, setOrderRequestDefault] = useState({});
    const [api, contextHolder] = notification.useNotification();
    const [selectedMaterials, setSelectedMaterials] = useState();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [selected, setSelected] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

            setSelected(selectedRowKeys)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const showModalEdit = (e) => {
        setOrderRequestDefault({
            id: e._id
        })
        setIsModalOpenProcessing(true);

    };

    const handleOpenCanceled = (e) => {

        setOrderRequestDefault({
            id: e._id
        })
        setIsModalOpenCanceled(true);

    };
    const handleCancelCanceled = () => {
        setIsModalOpenCanceled(false);

    };
    const handleCancelProcessing = () => {
        setIsModalOpenProcessing(false);

    };
    const handleCancelCanceledS = () => {
        setIsModalOpenCanceledS(false);

    };
    const handleCancelProcessingS = () => {
        setIsModalOpenProcessingS(false);

    };
    function formatCurrency(number) {
        // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
        return number
        // .toLocaleString('en-US', {
        //     style: 'currency',
        //     currency: 'VND',
        // });
    }
    useEffect(() => {
        if (selected.length > 0) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [selected]);
    const processing = () => {
        putData('customOrder/admin/put', 'Deposit', { orders: [orderRequestDefault.id] })
            .then((e) => {
                setDataRun(!dataRun);
            })
            .catch(err => console.log(err))
        setDataRun(!dataRun);
        handleCancelProcessing()
    }

    const sttCanceled = () => {
        putData('customOrder/admin/put', 'Canceled', { orders: [orderRequestDefault.id] })
            .then((e) => {

                setDataRun(!dataRun);
            })
            .catch(err => console.log(err))
        setDataRun(!dataRun);
        handleCancelCanceled()
    }

    const processingS = () => {
        putData('customOrder/admin/put', 'Deposit', { orders: selected })
            .then((e) => {
                setDataRun(!dataRun);
            })
            .catch(err => console.log(err))
        setDisabled(true)
        console.log(123);
        setDataRun(!dataRun);
        handleCancelProcessingS()
    }

    const canceledS = () => {
        putData('customOrder/admin/put', 'Canceled', { orders: selected })
            .then((e) => {
                setDataRun(!dataRun);
                handleCancelCanceledS()
            })
            .catch(err => console.log(err))
        setDisabled(true)
        setDataRun(!dataRun);
        handleCancelCanceledS()
    }
    useEffect(() => {
        setTimeout(() => {
            getData('customOrder/admin/Returned', {})
                .then((data) => {
                    setOrder(data?.data?.docs)
                })
                .catch((error) => {
                    console.error("Error fetching items:", error);
                });

        }, 100);
    }, [dataRun,activeTab]);


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
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            width: 300,
            key: '_id',
            fixed: 'left',

            render: (_, record) => (

                <div >
                    <h1>{record._id}</h1>
                </div>
            ),
            ...getColumnSearchProps('_id', 'Mã đơn hàng'),
        },     {
            title: 'Ảnh ảnh của khách',
            dataIndex: 'image',
            key: 'image',
            width: 200,

            render: (_, record) => (

                <div className='flex items-center justify-center'>
                    <img src={record.image} className='h-24 w-24 object-cover object-center   ' alt={record.image} />
                </div>
            )
        },
        {
            title: 'Tên Người đặt',
            width: 200,
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name', "tên"),

        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'createdAt',
            width: 110,
            key: 'createdAt',
            sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
            ...getColumnSearchProps('createdAt', "Ngày đặt hàng"),
            render: (_, record) => (

                <div className="text-sm text-gray-700 line-clamp-4">
                    <p>{moment(record.createdAt).format('l')}</p>
                </div>
            ),
        },
        {
            title: 'Số điện thoại',
            width: 200,
            dataIndex: 'phone',
            key: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps('phone', "phone"),

        },
        {
            title: 'Email',
            width: 200,
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email', "email"),
        },

        {
            title: 'Địa chỉ ',
            width: 300,
            dataIndex: 'shippingAddress',
            key: 'shippingAddress',
            ...getColumnSearchProps('shippingAddress', "Địa chỉ"),

        },
        {
            title: 'Tổng tiền đơn hàng',
            width: 300,
            dataIndex: 'price',
            key: 'price',
            // ...getColumnSearchProps('price', "Địa chỉ"),
            sorter: (a, b) => a.price - b.price,
            render: (_, record) => (

                <div >
                    <h1>{formatCurrency(record.price)}</h1>
                </div>
            )
        },
        {
            title: 'Thông tin bổ sung',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            ...getColumnSearchProps('description', "chi tiết"),
            // render: (_, record) => (

            //     <div className="text-sm text-gray-700 line-clamp-4">
            //         <p className="text-sm text-gray-700 line-clamp-4">{record.description}</p>
            //     </div>

            // ),
            ellipsis: {
                showTitle: false,
            },
            render: (record) => (
                <Tooltip placement="topLeft" title={record}>
                    {record}
                </Tooltip>
            ),

        },
        
    ];


    return (
        <>
            {contextHolder}
           
            <div className='flex p-2 justify-center'>
                <Table
                
                    rowKey="_id"
                    columns={columns}
                    dataSource={order}
                    scroll={{
                        x: 1520,
                        y: "55vh",
                    }}
                    bordered
                    pagination={{
                        showSizeChanger: true, // Hiển thị dropdown cho phép chọn số lượng dữ liệu
                        pageSizeOptions: ['10', '20', '50', '100'], // Các tùy chọn số lượng dữ liệu
                    }}
                />
            </div>


            <Modal title="Chấp nhận đơn hàng này"
                okType="primary text-black border-gray-700"
                open={isModalOpenProcessing}
                width={500}
                // style={{ top: 20 }}
                onCancel={handleCancelProcessing}>
                <div className='text-lg p-6'>Bạn có chắc chắn muốn chuyển qua đang sử lý hay không?</div>
                <div className='flex'>
                    <ComButton
                        type="primary"
                        danger
                        onClick={processing}
                    >
                        xác nhận
                    </ComButton>
                    <ComButton
                        type="primary"
                        onClick={handleCancelProcessing}
                    >
                        hủy
                    </ComButton>
                </div>
            </Modal>
            <Modal title="Xác nhận hủy"
                okType="primary text-black border-gray-700"
                open={isModalOpenCanceled}
                width={500}
                // style={{ top: 20 }}
                onCancel={handleCancelCanceled}>
                <div className='text-lg p-6'>Bạn có chắc chắn muốn hủy đơn hàng này.</div>
                <div className='flex'>
                    <ComButton
                        type="primary"
                        danger
                        onClick={sttCanceled}
                    >
                        Xác nhận
                    </ComButton>
                    <ComButton
                        type="primary"
                        onClick={handleCancelCanceled}
                    >
                        {textApp.TableProduct.modal.cancel}
                    </ComButton>
                </div>
            </Modal>

            <Modal title="Chấp nhận đơn hàng"
                okType="primary text-black border-gray-700"
                open={isModalOpenProcessingS}
                width={500}
                // style={{ top: 20 }}
                onCancel={handleCancelProcessingS}>
                <div className='text-lg p-6'>Bạn có chắc chắn muốn chuyển qua đang sử lý hay không?</div>

                <div className='flex'>
                    <ComButton
                        type="primary"
                        danger
                        onClick={processingS}
                    >
                        xác nhận
                    </ComButton>
                    <ComButton
                        type="primary"
                        onClick={handleCancelProcessingS}
                    >
                        hủy
                    </ComButton>
                </div>
            </Modal>
            <Modal title="Xác nhận hủy đơn hàng"
                okType="primary text-black border-gray-700"
                open={isModalOpenCanceledS}
                width={500}
                // style={{ top: 20 }}
                onCancel={handleCancelCanceledS}>
                <div className='text-lg p-6'>Bạn có chắc chắn muốn hủy đơn hàng đã chọn này không?</div>

                <div className='flex'>
                    <ComButton
                        type="primary"
                        danger
                        onClick={canceledS}
                    >
                        Xác nhận
                    </ComButton>
                    <ComButton
                        type="primary"
                        onClick={handleCancelCanceledS}
                    >
                        {textApp.TableProduct.modal.cancel}
                    </ComButton>
                </div>
            </Modal>
        </>
    )
}
