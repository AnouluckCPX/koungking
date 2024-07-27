import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import '../../../../../components/style/ButtonStyle.css'
import { Delete } from 'lucide-react';
import { CloseCircleFilled } from '@ant-design/icons';

function ModalCalculQuality({ open, close, quality, cb_quality }) {
    // console.log(quality);

    const [totalQuality, setTotalQuality] = useState(quality.my_qty);


    useEffect(() => {
        setTotalQuality(quality.my_qty);
    }, [quality.my_qty]);

    const handleAddDigit = (number) => {
        let num = totalQuality.toString() + number.toString();
        const newNum = parseInt(num, 10);
        setTotalQuality(newNum);
    };

    const handleDecrement = () => {
        const numStr = totalQuality.toString();
        const newNumStr = numStr.slice(0, -1);
        const newNum = parseInt(newNumStr, 10) || 0;
        setTotalQuality(newNum);
    };

    const handleSelectQuality = () => {
        let update = { ...quality, my_qty: totalQuality }
        cb_quality(update)
        close(!open)
    }

    function checkStatus() {
        let result
        if (totalQuality <= 0) {
            result = true
        } else {
            result = false
        }
        return result
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
                    <h3 className='text-lg'>ຈຳນວນສິນຄ້າ</h3>
                    <div className='grid grid-cols-4 text-xl'>
                        <div className='border text-right pr-2 py-4 col-span-4 flex justify-between bg-blue-100'>
                            <button onClick={() => setTotalQuality(0)}><CloseCircleFilled className='text-[#f87171] pl-3' /></button>
                            <p className='text-3xl'>{totalQuality}</p>
                        </div>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(7)}>7</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(8)}>8</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(9)}>9</button>
                        <button className='border text-right pr-2 py-6' onClick={() => setTotalQuality(50)}>50</button>
                        {/* --- */}
                        <button className='border text-center py-6' onClick={() => handleAddDigit(6)}>6</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(5)}>5</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(4)}>4</button>
                        <button className='border text-right pr-2 py-6' onClick={() => setTotalQuality(20)}>20</button>
                        {/* --- */}
                        <button className='border text-center py-6' onClick={() => handleAddDigit(3)}>3</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(2)}>2</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(1)}>1</button>
                        <button className='border text-right pr-2 py-6' onClick={() => setTotalQuality(15)}>15</button>
                        {/* --- */}
                        <button
                            disabled={checkStatus()}
                            className={`${checkStatus() ? 'bg-blue-300' : 'bg-blue-500'} text-center py-6  text-white w-full`}
                            onClick={handleSelectQuality}>ຕົກລົງ</button>
                        <button className='border text-center py-6' onClick={() => handleAddDigit(0)}>0</button>
                        <button className='border flex justify-center items-center py-6' onClick={handleDecrement}><Delete size={18} /></button>
                        <button className='border text-right pr-2 py-6' onClick={() => handleAddDigit(10)}>10</button>

                    </div>
                </div>
            </Modal >
        </>
    )
}

export default ModalCalculQuality