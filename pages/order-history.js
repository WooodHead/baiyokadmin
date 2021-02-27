import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import OrderCard from '../components/order/OrderCard'
import { isLoggedIn } from '../services/auth'
import api from '../services/API'

const OrderHistory = ({}) => {
  const {data: orders, isLoading, isError} = api.ordersQuery('')

  if (isLoading) return <div>loading ... </div>
  if (isError) return <div>error</div>
  return (
    <section className='section section-main'>
      {isLoggedIn() ? <Container>
        <div className='mb-4'>Orders History</div>
        {/* <div className='bg-white rounded border shadow-sm mb-4'> */}
        {orders.length ?
          orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              showStatus
            />
          )) : <h1>No order today.</h1>}
        {/* </div> */}
      </Container> : <>
      <Container>
        <div className='mb-4'>Please login</div>
        </Container>
      </>}
    </section>
  )
}

export default OrderHistory
