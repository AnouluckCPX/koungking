import React, { useEffect, useState } from 'react';
import { Button, Input, InputNumber, Modal, Radio, Select, notification, Upload } from 'antd';
import classes from '../../../components/style/LayoutStyle.module.css'
import classesbtn from '../../../components/style/ButtonStyle.module.css'
import { myAPI } from '../../../middleware/api.jsx';
import { USER_KEY } from '../../../middleware/userKey.jsx';
import { X, ImagePlus } from 'lucide-react';
import { alertSuccess } from '../../../components/notification/Notification.jsx'

function CategoryCreate({ use, cbuse, result, cbresult }) {
    const userToken = JSON.parse(localStorage.getItem(USER_KEY))
    const [modelCategory, setModelCategory] = useState({
        cate_name: '',
        discount_vip: '',
        status: true,
    })

    const handleSelectStatus = (e) => {
        setModelCategory({ ...modelCategory, status: e })
    }

    const hanldeCreateCategory = () => {
        let sendData = {
            cate_name: modelCategory.cate_name,
            discount_vip: modelCategory.discount_vip,
            status: modelCategory.status,
        }

        myAPI.post('category', sendData, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            }
        }).then((res) => {
            if (res?.status === 200) {
                alertSuccess({ title: 'ສຳເລັດ', label: 'ບັນທຶກຂໍ້ມູນໝວດໝູ່ໃໝ່ເຂົ້າລະບົບສຳເລັດແລ້ວ.' })
                cbresult(!result)
            } else {
                console.log('Failed')
            }
        }).catch(e => console.error(e))
    }

    return (
        <>
            <div>
                <div className='mt-8 flex justify-end mr-4'>
                    <Button size='middle' className={`bg-slate-200 mr-4`} onClick={() => cbuse(!use)}><X /></Button>
                    <Button size='middle' className={`${classesbtn.base} w-[135px]`} onClick={hanldeCreateCategory}>ບັນທຶກຂໍ້ມູນ</Button>
                </div>
                <div className={`${classes.silde}`}>
                    <div className='text-center bg-blue-950 text-white py-3 rounded-tl-md rounded-tr-md'>
                        <p className='font-bold text-base'>ເພີ່ມຂໍ້ມູນໝວດໝູ່</p>
                    </div>
                    <div className={`${classes.sildecontect} grid grid-cols-1 gap-5`}>
                        <div>
                            <p className="text-md mb-1.5 font-medium">
                                ຊື່ໝວດໝູ່
                            </p>
                            <Input size='middle'
                                value={modelCategory?.cate_name}
                                onChange={(e) => setModelCategory({ ...modelCategory, cate_name: e.target.value })} />
                        </div>
                        <div>
                            <p className="text-md mb-1.5 font-medium">
                                ສ່ວນຫລຸດພິເສດ
                            </p>
                            <Input size='middle'
                                value={modelCategory?.discount_vip}
                                onChange={(e) => setModelCategory({ ...modelCategory, discount_vip: e.target.value })} />
                        </div>
                        <div>
                            <p className="text-md mb-1.5 font-medium">
                                ສະຖານະ
                            </p>
                            <Select
                                className='w-full'
                                placeholder='ເລືອກ'
                                onChange={handleSelectStatus}
                                defaultValue={modelCategory.status}
                                options={[
                                    {
                                        value: true,
                                        label: 'ເປີດໃຊ້ງານ',
                                    },
                                    {
                                        value: false,
                                        label: 'ປິດໃຊ້ງານ',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryCreate