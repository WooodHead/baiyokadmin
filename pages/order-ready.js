import React from 'react'
import { Container } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth'
import OrderCard from '../components/order/OrderCard'
import api from '../services/API'

const OrderReady = ({}) => {
  const AuthUser = useAuthUser()

  const idTokenQuery = useQuery(['idToken'], () => AuthUser.getIdToken())

  const { data: orders, isLoading, isError, isIdle, error } = useQuery(
    ['ordersQuery', 'ready'],
    () => api.getOrders('ready', idTokenQuery.data),
    {
      retry: 1,
      enabled: idTokenQuery.data ? true : false,
    }
  )

  return (
    <section className='section section-main'>
      <Container>
        {isIdle || isLoading ? (
          <div>loading ... </div>
        ) : isError ? (
          <div>{error.message}</div>
        ) : (
          <>
            <div className='mb-4'>Ready for Pick Up / Delivery</div>
            {orders.length > 0 ? (
              orders.map((order) => <OrderCard key={order._id} order={order} />)
            ) : (
              <h1>No order ready for Pickup / Delivery.</h1>
            )}
          </>
        )}
      </Container>
    </section>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: '/login-page/',
})(OrderReady)
