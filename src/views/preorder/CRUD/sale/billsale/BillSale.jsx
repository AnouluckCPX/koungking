import React, { useEffect, useState, forwardRef } from 'react'
import { loadDataPreOrderByID } from '../../../../../middleware/PreOrderAPI';
import { USER_KEY } from '../../../../../middleware/userKey';
import moment from 'moment/moment';

const userToken = JSON.parse(localStorage.getItem(USER_KEY))

const BillSale = forwardRef(({ id }, ref) => {

    const [dataProduct, setDataProduct] = useState([]);
    const [dataOld, setDataOld] = useState(id)

    useEffect(() => {
        setDataOld(id)
    }, [id]);

    useEffect(() => {
        const fetchDataProduct = async () => {
            try {
                const { data } = await loadDataPreOrderByID({ id: dataOld, token: userToken })
                setDataProduct(data.data);
            } catch (error) {
                console.error(error)
            }
        }
        if (dataOld !== undefined || dataOld !== null) {
            fetchDataProduct()
        }
    }, [dataOld]);

    return (
        <>
            <div className='p-3 billsale' ref={ref}>
                <div className='mb-3'>
                    <div className='text-center'>
                        <h3 className="font-bold text-sm mb-2">ທ. ຄຳພັນ ພົມມະວົງ</h3>
                        <p className='leading-5 text-xs'>ຕົວແທນຂຳໜ່າຍ ຜະລິດຕະພັນເບຍລາວ ແລະ ນ້ຳຫວານ <br /> ປະຈຳເມືອງວັງວຽງ ເຂດ II
                            ບ້ານວັງວຽງ, ເມືອງວັງວຽງ, ແຂວງວຽງຈັນ <br />
                            ສາງ: 023 511 - 4222 <br />
                            ມືຖື: 020 2225 - 4132, 020 5515-5153
                        </p>
                    </div>
                    <h1 className='font-bold text-sm text-center'>ໃບຮັບເງີນ</h1>
                    <div className='flex text-xs justify-center'>
                        <p className='mr-3'>ເລກທີໃບບີນ: <span className='pl-1'>{dataProduct[0]?.o_id}</span>;</p>
                        <p className=''>ວັນທີ: <span className='pl-1'>{moment(dataProduct[0]?.o_date.split('.')[0]).format('DD-MM-YYYY')}</span></p>
                    </div>
                </div>
                <hr />
                <table className='w-full mysale'>
                    <thead className=' border-t border-b border-dotted border-black'>
                        <tr className=''>
                            <th align='left'>ລາຍການ</th>
                            <th align='right'>ລາຄາ</th>
                            <th align='right'>ລວມ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataProduct[0]?.order_detail?.map(({ pro_name, od_price, od_unit }, index) => {
                                let total = od_price * od_unit
                                return (
                                    <tr key={index}>
                                        <td><span style={{ paddingRight: '3px' }}>x{od_unit}</span>{pro_name}</td>
                                        <td>{od_price?.toLocaleString()}</td>
                                        <td>{total?.toLocaleString()}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr className='border-t border-b border-dotted border-black'>
                            <td colSpan={2} className='py-1 text-xs'><p className='text-xs font-bold text-right pr-4'>ລວມທັງໝົດ (ກີບ):</p></td>
                            <td className='font-bold text-xs'>{dataProduct[0]?.all_total?.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <style>
                {`
                    .mysale th{
                    font-size: 12px;
                    font-weight: 300;
                    }
                    .mysale td{
                    font-size: 12px;
                    font-weight: 300;
                    }
                    .mysale td:nth-child(2){
                    text-align: right;
                    }
                    .mysale td:nth-child(3){
                    text-align: right;
                    }
                `}
            </style>
        </>
    )
})

export default BillSale