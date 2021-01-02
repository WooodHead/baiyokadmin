import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import useSound from 'use-sound'
import OrderCard from '../components/order/OrderCard'
import {useIncomingOrder, useUntouchedCount} from '../services/IncomingOrder'
import api from '../services/API'

const OrderIncoming = ({}) => {
  const [showModal, setShowModal] = useState(false)
  // const [orders, setOrders] = useState([])
  const {orders, isLoading, isError} = useIncomingOrder()
  const {count, isCountLoading, isCountError} = useUntouchedCount()
  const [refresh, setRefresh] = useState(false)

  const closeModal = () => {
    setShowModal(false)
    refreshOrders()
  }

  const cancel = () => {
    closeModal()
    navigate('/')
  }

  const refreshOrders = () => {
    setRefresh(!refresh)
  }

  const [playIncoming] = useSound(
    '/sounds/alert.mp3',
    { volume: 0.25 }
  );

  useEffect(() => {
    console.log('orders tricked me here', count)
    if (count > 0) {
      playIncoming()
    }
  }, [orders])

  if (isLoading) return <div>loading</div>
  if (isError) return <div>error</div>
  return (
    <section className='section section-main'>
      <Container>
        <div className='mb-4'>Incoming</div>
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

export default OrderIncoming
