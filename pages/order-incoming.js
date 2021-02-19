import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import useSound from 'use-sound'
import OrderCard from '../components/order/OrderCard'
import {useIncomingOrder, useUntouchedCount} from '../services/IncomingOrder'
import { isLoggedIn } from '../services/auth'

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
    if (count > 0) {
      playIncoming()
    }
  }, [orders])

  if (isLoading) return <div>loading</div>
  if (isError) return <div>error</div>
  return (
    <section className='section section-main'>
      {isLoggedIn() ? <Container>
        <div className='mb-4'>New Orders</div>
        {/* <div className='bg-white rounded border shadow-sm mb-4'> */}
        {orders.length ?
          orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              refreshOrders={refreshOrders}
            />
          )) : <h1>No new order.</h1>}
        {/* </div> */}
      </Container> : <>
      <Container>
        <div className='mb-4'>Please login</div>
        </Container>
      </>}
    </section>
  )
}

export default OrderIncoming
