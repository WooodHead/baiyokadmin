import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import useSound from 'use-sound'
import OrderCard from '../components/order/OrderCard'
import { isLoggedIn } from '../services/auth'
import api from '../services/API'

const OrderIncoming = () => {
  const {data: orders, isLoading, isError} = api.ordersQuery('open')

  const { data } = api.untouchedOrdersQuery()

  const [playIncoming] = useSound('/sounds/alert.mp3', { volume: 0.25 })

  useEffect(() => {
    console.log('data has change')
    if (data && data.count > 0) {
      playIncoming()
    }
  }, [data])

  if (isLoading) return <div>loading ... </div>
  if (isError) return <div>error</div>
  return (
    <section className='section section-main'>
      {isLoggedIn() ? (
        <Container>
          <div className='mb-4'>New Orders</div>
          {/* <div className='bg-white rounded border shadow-sm mb-4'> */}
          {orders ? (
            orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
              />
            ))
          ) : (
            <h1>No new order.</h1>
          )}
          {/* </div> */}
        </Container>
      ) : (
        <>
          <Container>
            <div className='mb-4'>Please login</div>
          </Container>
        </>
      )}
    </section>
  )
}

export default OrderIncoming
