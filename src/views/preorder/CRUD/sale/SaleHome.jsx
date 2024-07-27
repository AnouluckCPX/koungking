import React, { useEffect, useState } from 'react'
import classes from '../../../../components/style/LayoutStyle.module.css'
import { Button, Divider, Input, InputNumber, Select } from 'antd';
import { loadDataProduct } from '../../../../middleware/ProductAPI';
import { USER_KEY } from '../../../../middleware/userKey';
import { Trash, ImageOff, Package2 } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import ModalCalculator from './calculator/ModalCalculator';
import ModalSelectPackage from './package/ModalSelectPackage';
import VIPMember from './customer/VIPMember';
import { SquareUserRound } from 'lucide-react';
import ModalCalculQuality from './calculator/ModalCalculQuality';
import './SaleHome.css'

const { Search } = Input
const userToken = JSON.parse(localStorage.getItem(USER_KEY))

export default function SaleHome() {
    const [listDataProduct, setListDataProduct] = useState([])
    const [CountProduct, setCountProduct] = useState(0)

    const [checkResult, setCheckResult] = useState({ open: false, package: false, customer: false, quality: false })
    const [payStatus, setPayStatus] = useState(false);

    const [selectPackage, setSelectPackage] = useState({});
    const [listCart, setListCart] = useState([]);

    const [typeCustomer, setTypeCustomer] = useState(null);
    const [selectQty, setSelectQty] = useState(0);

    useEffect(() => {
        const fetchDataProduct = async () => {
            try {
                const { data } = await loadDataProduct({ page: 1, limit: 200, token: userToken });
                let update = data?.map((x) => ({
                    value: x.pro_id,
                    label: x.pro_name,
                    barcode: x.pro_barcode,
                    img: x.pro_img,
                    price: x.pro_price_sell,
                    type: x.pro_type,
                    discount: 0,
                    select: false
                }))
                // console.log(update);
                setListDataProduct(update)

            } catch (error) {
                console.error(error)
            }
        }
        if (payStatus) {
            window.location.reload()
        }
        fetchDataProduct()
    }, [payStatus, userToken])


    const handleSelectProduct = (e, value, idx) => {
        let update = listDataProduct.map((x) => {
            if (x.value === value) {
                x.select = true
                x.price = x.price
                x.discount = 0
                x.my_qty = x.my_qty ? x.my_qty + 1 : 1
            }
            return x
        })

        let add_cart = update.filter((x) => x.select === true)
        setListCart(add_cart)
        setListDataProduct(update)
        setCountProduct(add_cart.length)
    }

    const handleRemoveProduct = (e, value) => {
        let update = listDataProduct.map((x) => {
            if (x.value === value) {
                x.select = false
                x.discount = 0
                x.my_qty = 0
            }
            return x
        })

        let update_cart = update.filter((x) => x.select === true)
        setListCart(update_cart)
        setListDataProduct(update)
        setCountProduct(update_cart.length)
    }

    const handleInputQty = (idx, value, id) => {
        let newData = [...listCart]
        newData[idx]['my_qty'] = parseInt(value)
        setListCart(newData)
    }

    const handleInputDiscount = (idx, value, id) => {
        let newData = [...listCart]
        newData[idx]['discount'] = parseInt(value)
        setListCart(newData)
    }

    function totalAmount() {
        let sum_total = listCart.map((x) => x.price * x.my_qty).reduce((a, b) => a + b, 0)
        return sum_total
    }

    function showCustomer() {
        let _newValue
        let _newName
        if (typeCustomer === null || typeCustomer === undefined) {
            _newValue = 1
            _newName = 'ລູກຄ້າທົ່ວໄປ'
        } else {
            _newValue = typeCustomer?.value
            _newName = typeCustomer?.label
        }
        return { _newValue, _newName }
    }

    return (
        <>
            <div className='grid grid-cols-3 gap-2'>
                <div className='col-span-2'>
                    <div className={`${classes.contentnopad} mb-5 `}>
                        <div className='flex p-3'>
                            <Select
                                defaultValue='all'
                                className='w-32 mr-3'
                                placeholder='ສິນຄ້າທັງໝົດ'
                                // onChange={handleSelectFilter}
                                options={[
                                    { value: 'all', label: 'ສິນຄ້າທັງໝົດ' },
                                    { value: 'pending', label: 'ເບຍ' },
                                    { value: 'packing', label: 'ນ້ຳຫວານ' },
                                    { value: 'success', label: 'ນ້ຳດື່ມ' },
                                ]}
                            />
                            <Search
                                className={`${classes.inputsearch} w-[300px]`}
                                size='middle'
                                placeholder="ຊື່, ລະຫັດບາໂຄ໊ດ..."
                                allowClear
                                onSearch
                                style={{
                                    fontFamily: 'Noto Sans Lao'
                                }}
                            />
                        </div>
                    </div>
                    <div className='grid grid-cols-5 gap-2 overflow-scroll h-[50rem]'>
                        {
                            listDataProduct.map((x, idx) => {
                                return <>
                                    <div key={idx} className={`${classes.carimg} cursor-pointer`}
                                        onClick={(e) => handleSelectProduct(e, x.value, idx)}
                                    >
                                        <div className='rounded-tl-lg'>
                                            <div className='bg-white w-full h-[80px] rounded-tl-lg rounded-tr-lg'>
                                                {
                                                    x.img === null || x.img === ''
                                                        ? <div className='flex justify-center items-center h-full w-full'><ImageOff width={40} color='#777777' /></div>
                                                        : <img src={x.img} alt='' className='w-full h-[80px] object-contain rounded-tl-lg rounded-tr-lg' />
                                                }
                                            </div>
                                        </div>
                                        <hr />
                                        <NumericFormat value={x?.price} customInput={Input} thousandSeparator
                                            className='border-none pl-2 pb-0 text-[#3b82f6] font-bold text-base'
                                        // prefix='₭' 
                                        />
                                        <p className='text-base leading-4'>{x?.label}</p>
                                    </div>
                                </>
                            })
                        }
                    </div>
                </div>
                <div>
                    <div className={`${classes.contentnopad} mb-5 h-[50rem]`}>
                        <div className='grid grid-cols-2 gap-5 mt-3'>
                            <Button onClick={() => { setCheckResult({ customer: true }) }}>ເລືອກລູກຄ້າ</Button>
                            <Button>ພັກ</Button>
                        </div>
                        <div className='flex justify-between mt-3 bg-green-300 px-4 py-3 text-base'>
                            <p className='flex'><span className='pr-2'><SquareUserRound width={14} /></span>ປະເພດລູກຄ້າ:</p>
                            <p className='font-bold'>{showCustomer()._newName}</p>
                        </div>
                        <div className='flex justify-between mt-3 h-10 items-end w-full '>
                            <h2 className='font-bold text-lg'>ລວມມູນຄ່າ (ກີບ):</h2>
                            <h2 className='font-bold text-3xl text-blue-500'>{totalAmount().toLocaleString()}</h2>
                        </div>
                        <div className='my-3'>
                            <Button
                                onClick={() => { setCheckResult({ open: true }) }}
                                disabled={listCart.length === 0 ? true : false}
                                className={`button-pay w-full h-12 text-2xl font-medium `}>ຊຳລະເງີນ</Button>
                        </div>
                        <p className='font-bold'>ລາຍການ: {CountProduct}</p>
                        <Divider className='m-0' />
                        <div className='overflow-scroll h-[38rem] mt-3'>
                            {
                                listCart?.map((x, idx) => {
                                    return (
                                        <div className='grid-cols-3 gap-2 border-b mb-4'>
                                            <div className='col-span-2'>
                                                <div className='flex justify-between'>
                                                    <p className='text-sm'>{idx + 1}. {x.label}</p>
                                                    <div className='flex'>
                                                        <InputNumber
                                                            min={1}
                                                            value={x.my_qty}
                                                            autoComplete={false} size='middle' className='py-0.5 w-20 text-base'
                                                            onChange={(e) => handleInputQty(idx, e, x.value)}
                                                            onClick={(e) => {
                                                                setCheckResult({ quality: true })
                                                                setSelectQty(x)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex justify-between pb-2'>
                                                <div>
                                                    <button
                                                        className='border border-solid rounded-md px-1.5 py-1.5 mr-3'
                                                        onClick={(e) => handleRemoveProduct(e, x.value)}>
                                                        <Trash size={16} /></button>
                                                    <button
                                                        className='border border-solid rounded-md px-1.5 py-1.5 mr-3'
                                                        onClick={() => {
                                                            setCheckResult({ package: true })
                                                            setSelectPackage(x)
                                                        }}>
                                                        <Package2 size={18} /></button>
                                                </div>
                                                <div className='text-right mt-1'>
                                                    <p className='text-base font-bold text-blue-500'>{x?.price?.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <ModalCalculator
                open={checkResult.open}
                close={(x) => {
                    setCheckResult({ open: x })
                }}
                total={totalAmount()}
                status_sale={true}
                cb_complete={(e) => setPayStatus(e)}
                cart_data={listCart}
                cus_id={showCustomer()._newValue}
                user_id={userToken}
            />

            <ModalSelectPackage
                open={checkResult.package}
                close={(x) => {
                    setCheckResult({ package: x })
                }}
                get_Product={selectPackage}
                callback_Cart={(e, i) => {
                    let update = listCart.map((x) => {
                        if (x.value === e.value) {
                            x.my_qty = e.qty
                        }
                        return x
                    })
                    setListCart(update)
                    setCheckResult({ package: i })
                }}
            />

            <VIPMember
                open={checkResult.customer}
                close={(x) => setCheckResult({ customer: x })}
                customer_select={(x) => setTypeCustomer(x)}
            />

            <ModalCalculQuality
                open={checkResult.quality}
                close={(x) => setCheckResult({ quality: x })}
                quality={selectQty}
                cb_quality={(e, i) => {
                    let update = listCart.map((x) => {
                        if (x.value === e.value) {
                            x.my_qty = e.my_qty
                        }
                        return x
                    })
                    setListCart(update)
                    setCheckResult({ quality: i })
                }}
            />
        </>

    )
}
