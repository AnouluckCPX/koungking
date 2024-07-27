import { Button, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import '../../../../../components/style/ButtonStyle.css'
import { myAPI } from '../../../../../middleware/api';
import { USER_KEY } from '../../../../../middleware/userKey';
import '../../../../../components/style/CustomAntd.css'

const userToken = JSON.parse(localStorage.getItem(USER_KEY))

function VIPMember({ open, close, customer_select }) {

    const [ListDataCustomer, setListDataCustomer] = useState([{ value: 1, label: 'ຂາຍທົ່ວໄປ', cus_tel: '', cus_address: '' }]);
    const [selectedCustomer, setSelectedCustomer] = useState([]);

    useEffect(() => {
        const fetchDataCustomer = async () => {
            try {
                myAPI.get('customer', {
                    headers: {
                        'Authorization': `Bearer ${userToken?.token}`
                    },
                }).then((response) => {
                    let update = response?.data?.data?.map((x) => ({
                        value: x.cus_id,
                        label: x.cus_name,
                        cus_tel: x.cus_tel,
                        cus_address: x.cus_address
                    }))
                    setListDataCustomer(update)
                    // console.log(response?.data);
                })
            } catch (error) {
                console.error(error)
            }
        }
        fetchDataCustomer()
    }, [userToken])


    const handleSelectCustomer = (val) => {
        let choose_customer = ListDataCustomer.filter((x) => x.value === val).map((x) => {
            return x
        })
        setSelectedCustomer(choose_customer)
        // console.log(choose_customer);
    }

    const handleSentValue = async () => {
        await customer_select(selectedCustomer[0])
        close(!open)
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
                <div className='mt-2'>
                    <Select
                        placeholder='ເລືອກລາຍການ ຫລື ຄົ້ນຫາ ຊື່, ເລກບາໂຄ໊ດ'
                        className='w-full'
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onChange={handleSelectCustomer}
                        optionLabelProp="label"
                        defaultValue={ListDataCustomer[0].value}
                    >
                        {ListDataCustomer.map((x) => (
                            <Select.Option
                                key={x.value}
                                value={x.value}
                                label={x.label}
                            >
                                <span>
                                    {x.label} <br /> <span className='font-bold text-xs'>{x.cus_tel} {x.cus_address}</span>
                                </span>
                            </Select.Option>
                        ))}
                    </Select>
                    <div>
                        <div className='mt-3'>
                            <p>ລະຫັດລູກຄ້າ: {selectedCustomer[0]?.value}</p>
                            <p>ຊື່: {selectedCustomer[0]?.label}</p>
                            <p>ເບີໂທ: {selectedCustomer[0]?.cus_tel}</p>
                            <p>ທີ່ຢູ່: {selectedCustomer[0]?.cus_address}</p>
                        </div>
                        <Button
                            onClick={handleSentValue}
                            className='w-full mt-3 border-none bg-blue-500 text-white'>ຢືນຢັນ</Button>
                    </div>
                </div>
            </Modal >
        </>
    )
}

export default VIPMember