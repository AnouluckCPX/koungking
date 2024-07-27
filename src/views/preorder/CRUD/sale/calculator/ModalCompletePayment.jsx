import { Button, Modal } from 'antd'
import React, { useRef } from 'react'
import '../../../../../components/style/ButtonStyle.css'
import iccomplete from '../../../../../assets/icon/tick-mark.svg'
import { useReactToPrint } from 'react-to-print'
import BillSale from '../billsale/BillSale'

function ModalCompletePayment({ openpay, closepay, changepay, get_status_sale, cb_status_sale, id_order }) {
    // console.log(id_order);

    const SaveABC = () => {
        closepay(!openpay)
        cb_status_sale(get_status_sale)
    }

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <>
            <Modal
                centered
                width={350}
                title={false}
                open={openpay}
                onCancel={() => {
                    closepay(!openpay)
                }}
                footer={false}
            >
                <div className='mt-2 pb-6 h-[350px]'>
                    <img src={iccomplete} width={64} className="mx-auto my-2" alt="" />
                    <div>
                        <h1 className='text-4xl text-center font-bold'>₭ {changepay?.toLocaleString()}</h1>
                        <h3 className='text-center font-bold text-lg mt-4 mb-7'>ເງີນທອນ</h3>
                        <Button className='w-full h-10 rounded-lg'
                            onClick={handlePrint} > ພິມໃບບິນ</Button>
                        {/* <Button className='w-full h-10 rounded-lg'
                        onClick={() => history.push({ pathname: `/home/salebill`, state: { id: id_order } })}
                    >ພິມໃບບິນ</Button> */}
                        <Button className='w-full h-10 rounded-lg my-2'>ຈັດສົ່ງສິນຄ້າ</Button>
                        <Button className='w-full h-10 rounded-lg' onClick={SaveABC}>ປິດ, ສ້າງລາຍການໃໝ່</Button>
                    </div>
                </div>
            </Modal >

            <BillSale ref={componentRef} id={id_order} />
        </>
    )
}

export default ModalCompletePayment