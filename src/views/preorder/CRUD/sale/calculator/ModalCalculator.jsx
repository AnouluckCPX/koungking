import { Modal } from 'antd'
import React, { useState } from 'react'
import '../../../../../components/style/ButtonStyle.css'
import { Delete } from 'lucide-react';
import { CloseCircleFilled } from '@ant-design/icons';
import ModalCompletePayment from './ModalCompletePayment';
import { myAPI } from '../../../../../middleware/api';
import Cookies from 'js-cookie';

const userToken = Cookies.get('koungStock')

function ModalCalculator({ open, close, total, cb_complete, status_sale, cart_data, cus_id, user_id }) {
    // console.log(cart_data);
    const [totalAmount, setTotalAmount] = useState(0);
    const [numberPlus, setNumberPlus] = useState({ thounsand: 100000, fivethounsand: 500000, onemillion: 1000000 });

    const [openPayment, setOpenPayment] = useState(false);
    const [idOrder, setIdOrder] = useState('');

    const handleDecrement = () => {
        const numStr = totalAmount.toString();
        const newNumStr = numStr.slice(0, -1);
        const newNum = parseInt(newNumStr, 10) || 0;
        setTotalAmount(newNum);
    };

    const handleAddDigit = (digit) => {
        const newNum = parseInt(totalAmount.toString() + digit.toString(), 10);
        setTotalAmount(newNum);
    };

    function checkStatus() {
        let result
        if (totalAmount < total) {
            result = true
        } else {
            result = false
        }
        return result
    }

    function changeMoney() {
        let change
        if (totalAmount > total) {
            change = totalAmount - total
        } else {
            change = 0
        }
        return change
    }

    const completePayment = async () => {
        let _orderId
        let detailedList = cart_data.map((x) => {
            return {
                pro_id: x.value,
                pro_unit: x.my_qty,
                pro_price: x.price,
                pro_discount: x.discount
            }
        })

        let sendData = {
            cus_id: cus_id,
            u_id: user_id?.detail?.u_id,
            total_discount: 0,
            total_price: 0,
            tax: 0,
            order_detail: detailedList
        }

        await myAPI.post(`create_order`, sendData, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((res) => {
            if (res?.status === 200) {
                setOpenPayment(true)
                close(!open)
                _orderId = res?.data?.order_id;
                setIdOrder(res?.data?.order_id)
            }
        })

        let _paymentId = { o_id: _orderId }
        await myAPI.post(`approve_order`, _paymentId, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((res) => {
            if (res?.status === 200) {
                console.log('pass');
            }
        })
    }

    const preOrderPayment = async () => {

        let detailedList = cart_data.map((x) => {
            return {
                pro_id: x.value,
                pro_unit: x.my_qty,
                pro_price: x.price,
                pro_discount: x.discount
            }
        })

        let sendData = {
            cus_id: cus_id,
            u_id: user_id?.detail?.u_id,
            total_discount: 0,
            total_price: 0,
            tax: 0,
            order_detail: detailedList
        }

        await myAPI.post(`create_order`, sendData, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((res) => {
            if (res?.status === 200) {
                setOpenPayment(true)
                close(!open)
                setIdOrder(res?.data?.order_id)
            }
        })

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
                <div className='mt-2 pb-6'>
                    <div className='grid grid-cols-4 text-xl'>
                        <div className='border text-right pr-2 py-4 col-span-4 flex justify-between bg-blue-100'>
                            <button onClick={() => setTotalAmount(0)}><CloseCircleFilled className='text-[#f87171] pl-3' /></button>
                            <p className='text-3xl'>{totalAmount.toLocaleString()}</p>
                        </div>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(7)}>7</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(8)}>8</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(9)}>9</button>
                        <button className='border text-right pr-2 py-6' onClick={() => setTotalAmount(totalAmount + numberPlus.onemillion)}>1,000,000</button>
                        {/* --- */}
                        <button className='border text-center py-6' onClick={() => handleAddDigit(6)}>6</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(5)}>5</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(4)}>4</button>
                        <button className='border text-right pr-2 py-6' onClick={() => setTotalAmount(totalAmount + numberPlus.fivethounsand)}>500,000</button>
                        {/* --- */}
                        <button className='border text-center py-6' onClick={() => handleAddDigit(3)}>3</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(2)}>2</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(1)}>1</button>
                        <button className='border text-right pr-2 py-6' onClick={() => setTotalAmount(totalAmount + numberPlus.thounsand)}>100,000</button>
                        {/* --- */}
                        <button className='border text-center py-6' onClick={() => handleAddDigit(0)}>0</button>
                        <button className='border flex justify-center items-center py-6' onClick={handleDecrement}><Delete size={18} /></button>
                        <button className='border text-center pr-2 py-6' onClick={() => setTotalAmount(total)}>ຈຳນວນເຕັມ</button>
                        <button className='border text-right pr-2 py-6' onClick={() => handleAddDigit(50000)}>50,000</button>
                        {/* --- */}
                        <div className='col-span-2 w-full'>
                            <button
                                className='bg-gray-300 text-center py-6 w-full'
                                onClick={() => preOrderPayment()}>ຈ່າຍພາຍຫລັງ</button>
                        </div>
                        <div className='col-span-2 w-full'>
                            <button
                                disabled={checkStatus()}
                                className={`${checkStatus() ? 'bg-blue-300' : 'bg-blue-500'} text-center py-6  text-white w-full`}
                                onClick={() => completePayment()}>ຕົກລົງ</button>
                        </div>
                    </div>
                </div>
            </Modal >

            <ModalCompletePayment
                openpay={openPayment}
                changepay={changeMoney()}
                closepay={(x) => setOpenPayment(x)}
                get_status_sale={status_sale}
                cb_status_sale={(e) => {
                    cb_complete(e)
                }}
                id_order={idOrder}
            />
        </>
    )
}

export default ModalCalculator