import React, { useEffect, useState, Fragment } from 'react';
import { Button, Input, Select, Space, Table, Tabs, Tag, Typography } from 'antd';
import classes from '../../components/style/LayoutStyle.module.css'
import classesbtn from '../../components/style/ButtonStyle.module.css'
import { loadDataPreOrder } from '../../middleware/PreOrderAPI.jsx'
import { Loader, Truck, Copy, FileText } from 'lucide-react';
import { useHistory, useLocation } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import moment from 'moment/moment';
import PackingPreOrder from './CRUD/component/PackingPreOrder.jsx';
import { MyToken } from '../../middleware/LoginAPI.jsx';
import CarPreOrderHome from './CarPreOrderHome.jsx';
import { USER_KEY } from '../../middleware/userKey.jsx';
import Cookies from 'js-cookie';
import SaleHome from './CRUD/sale/SaleHome.jsx';

const userToken = Cookies.get('koungStock')

function PreOrderHome() {
    // let token = MyToken()
    const { Search } = Input
    const history = useHistory()
    const location = useLocation()

    const [top, setTop] = useState('topRight')
    const [loading, setLoading] = useState(false)

    const [totalItems, setTotalItems] = useState(1)

    const [listData, setListData] = useState([])
    const [findDataUpdate, setFindDataUpdate] = useState([])
    const [selectDefult, setSelectDefult] = useState('all');

    const [isOpen, setIsOpen] = useState({ packing: false })
    const [checkIsOpen, setCheckIsOpen] = useState({ package: false })

    const fetchData = async ({ status, page, pageSize, token }) => {
        let filteies
        if (status === 'all') {
            filteies = ''
        } else {
            filteies = status
        }
        setLoading(true);
        try {
            const { data, total } = await loadDataPreOrder({ filter: filteies, page: page, limit: pageSize, token })
            setTimeout(() => {
                setListData(data)
                setTotalItems(total)
            }, 200);
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        fetchData({ status: selectDefult, page: 1, pageSize: 10, token: userToken })
    }, [selectDefult, userToken])

    const handleSelectFilter = (e) => setSelectDefult(e)



    const columns = [
        {
            fixed: true,
            title: 'ວັນທີ',
            dataIndex: 'o_date',
            key: 'o_date',
            width: 110,
            render: (text) => <p>{moment(text.split(".")[0]).format('DD-MM-YYYY HH:mm')}</p>,
        },
        {
            fixed: true,
            title: 'ເລກໃບບິນ',
            dataIndex: 'o_id',
            key: 'o_id',
            render: (text) => <p className='text-xs'>{text}</p>,
            width: 100,
        },

        {
            title: 'ລູກຄ້າ',
            dataIndex: 'cus_name',
            key: 'cus_name',
            render: (text) => <p>{text}</p>,
            width: 90,
        },
        {
            title: 'ລວມມູນຄ່າ',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (text) => <p>{text?.toLocaleString()}</p>,
            width: 100,
        },
        {
            align: 'center',
            title: 'ການຈັດສົ່ງ',
            dataIndex: 'o_status',
            key: 'o_status',
            render: (text) => (
                <>
                    {
                        <Tag color={text === 'packing' ? 'volcano' : text === 'success' ? 'orange' : text === 'canceled' ? 'cyan' : 'geekblue'}>
                            {text === 'packing' ? 'ກຳລັງຂົ່ນສົ່ງ' : text === 'success' ? 'ກວດສອບສຳເລັດ' : text === 'canceled' ? 'ໃບບິນຍົກເລີກ' : 'ລໍຖ້າດຳເນີນການ'}
                        </Tag>
                    }
                </>
            ),
            width: 100,
        },
        {
            title: 'ການຊຳລະ',
            dataIndex: 'o_payment_status',
            key: 'o_payment_status',
            render: (text) => <p>{text === 'paid' ? 'ຈ່າຍແລ້ວ' : '-'}</p>,
            width: 90,
        },
        {
            align: 'center',
            title: 'ຈັດການ',
            key: 'action',
            render: (_, record) => (
                <Space size='small' align="center">
                    <Button onClick={() => history.push({ pathname: '/home/preorder/check', state: { data: record } })}
                        className='px-1 shadow-none border-none'><FileText size={16} /></Button>
                    <Button onClick={() => {
                        // setFindDataUpdate(record)
                        // setOpenStatus({ delete: true })
                    }}
                        className='px-1 shadow-none border-none'><Copy size={16} /></Button>
                    <Button
                        onClick={() => {
                            setFindDataUpdate(record)
                            setIsOpen({ packing: true })
                        }}
                        className={`px-1 shadow-none border-none`}>
                        <Truck size={16} />
                    </Button>
                </Space>
            ),
            width: 100,
        },
    ]

    const tableLoading = {
        spinning: loading,
        indicator: <Loader type="loading" />,
    }

    return (
        <>

            <div className=''>
                {/* <h3 className={`${classes.header}`}>ການເບີກ ແລະ ຈັດສົ່ງສິນຄ້າ</h3> */}
                <Tabs
                    className='mx-4 mt-4'
                    type="card"
                    items={[
                        {
                            key: '1',
                            label: 'ຂາຍປົກກະຕິ',
                            children: <SaleHome />,
                        },
                        {
                            key: '2',
                            label: 'ລາຍການເບີກສິນຄ້າ',
                            children: <>
                                <div className={`${classes.contentnopad} mb-5 flex items-center justify-between`}>
                                    <div className='flex p-3'>
                                        <Select
                                            defaultValue={selectDefult}
                                            className='w-32 mr-3'
                                            placeholder='ກະລຸນາເລືອກ'
                                            onChange={handleSelectFilter}
                                            options={[
                                                { value: 'all', label: 'ທັງໝົດ' },
                                                { value: 'pending', label: 'ລໍຖ້າດຳເນີນການ' },
                                                { value: 'packing', label: 'ກຳລັງຂົ່ນສົ່ງ' },
                                                { value: 'success', label: 'ກວດສອບສຳເລັດ' },
                                            ]}
                                        />
                                        <Search
                                            className={`${classes.inputsearch} w-[300px]`}
                                            size='middle'
                                            placeholder="ຄົ້ນຫາ..."
                                            allowClear
                                            onSearch
                                            style={{
                                                fontFamily: 'Noto Sans Lao'
                                            }}
                                        />
                                    </div>
                                    <Button size='middle' className={`${classesbtn.base} w-[135px]`}
                                        onClick={() => history.push('/home/preorder/create')}>ເບີກສິນຄ້າໃໝ່</Button>
                                </div>
                                <div className={`${classes.contentnopad}`}>

                                    <Table
                                        loading={loading ? tableLoading : false}
                                        className='custablepro p-3'
                                        columns={columns}
                                        pagination={{
                                            position: [top],
                                            // pageSize: pageSize,
                                            total: totalItems,
                                            showSizeChanger: true,
                                            onChange: (page, pageSize) => {
                                                fetchData({ status: selectDefult, page: page, pageSize: pageSize })
                                            }
                                        }}
                                        dataSource={listData}
                                        scroll={{
                                            x: 500,
                                            y: 1000,
                                        }}
                                    />
                                </div>
                            </>,
                        },
                        {
                            key: '3',
                            label: 'ການຈັດສົ່ງສິນຄ້າ',
                            children: <CarPreOrderHome />,
                        },
                    ]}
                />


            </div>

            <PackingPreOrder
                getdata={findDataUpdate}
                use={isOpen.packing}
                cbuse={(x) => { setIsOpen({ ...isOpen, packing: x }) }}
                result={checkIsOpen.package}
                cbresult={(y) => { setCheckIsOpen({ ...checkIsOpen, package: y }) }}
            />

        </>
    )
}

export default PreOrderHome