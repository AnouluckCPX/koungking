import React, { useEffect, useRef, useState } from 'react'
import classes from '../../../../../components/style/LayoutStyle.module.css'
import { useLocation } from 'react-router-dom'
import './ReceiptPreOrder.css'
import { Button, InputNumber } from 'antd'
import '../../../../../components/style/CustomInput.css'
import ReactToPrint from 'react-to-print';
import moment from 'moment/moment'
import imgqr from '../../../../../assets/image/qrkoung.png'
import { loadDataPreOrderByID } from '../../../../../middleware/PreOrderAPI'
import Cookies from 'js-cookie';

const userToken = Cookies.get('koungStock')

function ReceiptPreOrder() {

    const location = useLocation()
    const [dataOld, setDataOld] = useState(location?.state?.data)

    let pin = useRef();
    const componentRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setDataOld(location?.state?.data)
        }, 100);
    }, [location?.state?.data])



    const [listData, setListData] = useState([]);
    // console.log(listData);
    useEffect(() => {
        const fetchDataProduct = async () => {
            try {
                const { data } = await loadDataPreOrderByID({ id: dataOld?.o_id, token: userToken })
                setTimeout(() => {
                    setListData(data?.data)
                }, 500);
            } catch (error) {
                console.error(error)
            }
        }

        fetchDataProduct()
    }, [userToken])

    const handlePrint = () => {
        if (componentRef.current) {
            componentRef.current.handlePrint();
        }
    }

    return (
        <>
            <div className={`${classes.content}`}>
                <div className='flex justify-end px-5 mt-5'>
                    <ReactToPrint
                        trigger={() =>
                            <Button
                                type='primary'
                                className='bg-indigo-400 text-[#fff]'
                                onClick={handlePrint}
                            >
                                ພິມໃບກວດ
                            </Button>
                        }
                        content={() => pin}
                    />
                </div>
                <div className='mt-8' />
                <div className={`bg-white text-[10px] p-3 pagebreak`} ref={el => (pin = el)}>
                    <div className='flex justify-between'>
                        <h1 className='font-bold text-lg'>ບິນຂາຍ</h1>
                        <div>
                            <span className='flex'>
                                <p className='w-16 text-right'>ເລກທີໃບບີນ:</p>
                                <p className='pl-1'>{listData[0]?.o_id}</p>
                            </span>
                            <span className='flex'>
                                <p className='w-16 text-right'>ວັນທີ:</p>
                                <p className='pl-1 tracking-wide'>{moment(listData[0]?.o_date.split('.')[0]).format('DD-MM-YYYY')}</p>
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className='grid grid-cols-5 gap-1'>
                        <div className='col-span-2 leading-4 '>
                            <h3 className="font-bold">ທ. ຄຳພັນ ພົມມະວົງ</h3>
                            <p>ຕົວແທນຂຳໜ່າຍ ຜະລິດຕະພັນເບຍລາວ ແລະ ນ້ຳຫວານ ປະຈຳເມືອງວັງວຽງ ເຂດ II
                                ບ້ານວັງວຽງ, ເມືອງວັງວຽງ, ແຂວງວຽງຈັນ <br />
                                ສາງ: 023 511 - 4222 <br />
                                ມືຖື: 020 2225 - 4132, 020 5515-5153
                            </p>
                        </div>
                        <div className=''>
                            <div className='flex justify-center mb-.5'>
                                <img src={imgqr} width={80} />
                            </div>
                            <p className='text-center'>140120000435342001</p>
                        </div>
                        <div className='col-span-2 '>
                            <h3 className="font-bold">ຫາ</h3>
                            <div>
                                <div className='flex'> <p className='w-10'>ລູກຄ້າ:</p><p>ອານຸລັກ</p></div>
                                <div className='flex'> <p className='w-10'>ທີ່ຢູ່:</p><p>ບ້ານວັງວຽງ, ເມືອງວັງວຽງ, ແຂວງວຽງຈັນ</p></div>
                                <div className='flex'> <p className='w-10'>ເບີໂທ:</p><p>020 2225 - 4132</p></div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-1' />
                    <div>
                        <table className={'tableinvoice'}>
                            <thead className='border'>
                                <tr>
                                    <th className='th'>ລ/ດ</th>
                                    <th>ຊື່ຜະລິດຕະພັນເບຍລາວ</th>
                                    <th>ຈຳນວນ</th>
                                    <th>ລາຄາ</th>
                                    <th>ລວມ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listData[0]?.order_detail?.map((x, index) => {
                                        return (
                                            <tr key={index} className=''>
                                                <td className='text-center w-[40px] ctd'>{index + 1}</td>
                                                <td className='w-[30rem] pl-2 ctd'>{x?.pro_name}</td>
                                                <td className='w-[40px] ctd'>
                                                    <InputNumber
                                                        className={`w-[40px] bill2`}
                                                        variant='borderless'
                                                        size='small'
                                                        readOnly={true}
                                                        value={x?.od_unit}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                                    />
                                                </td>
                                                <td className='w-[150px] ctd'>
                                                    <InputNumber
                                                        className='w-full bill'
                                                        variant='borderless'
                                                        size='small'
                                                        readOnly={true}
                                                        value={x?.od_price}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                                    />
                                                </td>
                                                <td className='w-[150px] ctd'>
                                                    <InputNumber
                                                        className='w-full bill'
                                                        variant='borderless'
                                                        size='small'
                                                        readOnly={true}
                                                        value={x?.od_price * x?.od_unit}
                                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr className='ctd'>
                                    <td colSpan={4} className='ctd'>ລວມມູນຄ່າທັງໝົດ (ກີບ) :</td>
                                    <td><InputNumber
                                        className='w-full bill'
                                        variant='borderless'
                                        size='small'
                                        readOnly={true}
                                        value={listData[0]?.total_price}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                    /></td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className='grid grid-cols-3 gap-5 text-center mt-1.5'>
                            <div><p>ຜູ້ຮັບເງິນ</p></div>
                            <div><p>ຜູ້ຈ່າຍເງິນ</p></div>
                            <div><p>ຜູ້ຮັບເຄື່ອງ</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReceiptPreOrder