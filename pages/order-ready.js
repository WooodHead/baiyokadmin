import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import OrderCard from '../components/order/OrderCard'

import api from '../services/API'

const OrderReady = ({}) => {
  const [showModal, setShowModal] = useState(false)
  const [orders, setOrders] = useState([])
  const [refresh, setRefresh] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  }

  const cancel = () => {
    closeModal()
    navigate('/')
  }

  const refreshOrders = () => {
    setRefresh(!refresh)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await api.getOrders('ready')
      setOrders(response.data)
    }
    fetchData()
  }, [refresh])

  return (
    <section className='section section-main'>
      <Container>
        <div className='mb-4'>Ready for Pick Up / Delivery</div>
        {/* <div className='bg-white rounded border shadow-sm mb-4'> */}
        {orders.length &&
          orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              refreshOrders={refreshOrders}
            />
          ))}
        {/* </div> */}
      </Container>
    </section>
  )
}

export default OrderReady
