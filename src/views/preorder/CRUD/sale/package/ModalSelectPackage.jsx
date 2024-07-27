import { Table, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import '../../../../../components/style/ButtonStyle.css'
import { ShoppingCart, ImageOff } from 'lucide-react';

function ModalSelectPackage({ open, close, get_Product, callback_Cart }) {

    // console.log(get_Product);
    const price_sell = get_Product?.price
    const [imagePro, setImagePro] = useState(get_Product?.img);
    const id_Product = get_Product?.value

    useEffect(() => {
        setImagePro(get_Product?.img)
    }, [get_Product?.img]);

    const dataSource = [
        {
            value: id_Product,
            key: '1',
            name: '5 ແພັກ | ລັງ',
            qty: 5,
            price: price_sell * 5
        },
        {
            value: id_Product,
            key: '2',
            name: '10 ແພັກ | ລັງ',
            qty: 10,
            price: price_sell * 10
        },
        {
            value: id_Product,
            key: '3',
            name: '50 ແພັກ | ລັງ',
            qty: 50,
            price: price_sell * 50
        },
        {
            value: id_Product,
            key: '4',
            name: '100 ແພັກ | ລັງ',
            qty: 100,
            price: price_sell * 100
        },
    ];

    const columns = [
        {
            title: 'ຈຳນວນ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'ລາຄາ',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <p>{text?.toLocaleString()}</p>
        },
        {
            title: 'ເລືອກ',
            dataIndex: 'value',
            key: 'value',
            render: (text, record) => <button onClick={() => selectPackage(record)}><ShoppingCart size={18} /></button>,
        },
    ];


    const selectPackage = (value) => {
        callback_Cart(value)
    }
    return (
        <>
            <Modal
                centered
                width={500}
                title={false}
                open={open}
                onCancel={() => {
                    close(!open)
                }}
                footer={false}
            >
                <div className=''>
                    <h3 className='text-center font-bold text-lg mb-2'>ຈຳນວນຫລາຍ</h3>
                    <hr />
                    <div className='flex mt-2 mb-4'>
                        <div className='mr-5'>
                            <img
                                src={imagePro}
                                alt=''
                                className='w-full h-[70px] object-contain'
                            />
                        </div>
                        <div>
                            <p>{get_Product?.label}</p>
                            <p className='font-bold text-blue-500'>{get_Product?.price?.toLocaleString()}</p>
                        </div>
                    </div>
                    <Table columns={columns} dataSource={dataSource} pagination={false} />
                </div>
            </Modal >

            <style>
                {` .ant-table-thead .ant-table-cell {
                        padding: 5px 10px !important;
                        text-align: center !important;
                    }
                    .ant-table-cell{
                        font-size: 14px !important;
                        padding: 10px 10px !important;
                        text-align: center !important;
                    }
                `}
            </style>
        </>
    )
}

export default ModalSelectPackage