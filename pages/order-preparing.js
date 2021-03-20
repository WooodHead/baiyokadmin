import React from 'react'
import { Container } from 'react-bootstrap'
import { useQuery } from 'react-query'
import {
  useAuthUser,
  withAuthUser,
  AuthAction,
} from 'next-firebase-auth'
import OrderCard from '../components/order/OrderCard'
import api from '../services/API'

const OrderPreparing = ({}) => {
  const AuthUser = useAuthUser()

  const idTokenQuery = useQuery(['idToken'], () => AuthUser.getIdToken())

  const { data: orders, isLoading, isError, isIdle, error } = useQuery(
    ['ordersQuery', 'preparing'],
    () => api.getOrders('preparing', idTokenQuery.data),
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
          <div className='mb-4'>Preparing</div>
          {orders.length > 0 ? (
            orders.map((order) => <OrderCard key={order._id} order={order} />)
          ) : (
            <h1>No order cooking in kitchen.</h1>
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
})(OrderPreparing)
