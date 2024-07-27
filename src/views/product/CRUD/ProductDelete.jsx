import React, { useEffect, useState } from 'react';
import { Modal } from 'antd'
import { alertError, alertSuccess } from '../../../components/notification/Notification.jsx'
import { postDeleteProduct } from '../../../middleware/ProductAPI.jsx';
import { USER_KEY } from '../../../middleware/userKey.jsx';

const userToken = JSON.parse(localStorage.getItem(USER_KEY))

function ProductDelete({ dataValue, use, close, result, cbresult }) {
  const { pro_id } = dataValue

  const handleDeleteProduct = async () => {
    let sendData = { id: pro_id }
    try {
      const { data } = await postDeleteProduct({ senddata: sendData, token: userToken })
      // console.log(data)
      if (data?.status === 200) {
        setTimeout(() => {
          alertSuccess({ title: 'ລືບສິນຄ້າສຳເລັດ', label: 'ລືບຂໍ້ມູນສິນຄ້າອອກຈາກລະບົບສຳເລັດແລ້ວ.' })
          cbresult(!result)
          close(!use)
        }, 200);
      } else {
        alertError({ title: 'ບໍ່ສຳເລັດ', label: 'ມີຂໍ້ມູນບາງຢ່າງຜິດພາດ.' })
      }
    } catch (error) {
      throw new Error('Failed to post API request:', error);
    }
  }

  return (
    <Modal
      centered
      width={500}
      title={<h2 style={{ fontFamily: 'Noto Sans Lao', marginTop: 0, marginBottom: 0 }}>ຢືນຢັນການລົບຂໍ້ມູນ</h2>}
      open={use}
      okButtonProps={{ className: 'AA' }}
      cancelButtonProps={{ className: 'w-[100px]' }}
      onOk={handleDeleteProduct}
      onCancel={() => {
        close(!use)
      }}
      okText={<p style={{ fontFamily: 'Noto Sans Lao', color: '#ffffff' }}>ລົບທັນທີ</p>}
      cancelText={<p style={{ fontFamily: 'Noto Sans Lao' }}>ຍົກເລີກ</p>}
    >
      <div>
        <p>ທ່ານຕ້ອງການລົບສິນຄ້ານີ້ອອກຈາກລະບົບແທ້ບໍ?</p>
        <p></p>
      </div>
    </Modal>
  )
}

export default ProductDelete