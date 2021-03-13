import React, { useState } from 'react'
import Link from 'next/link'
import { useQueryClient, useMutation } from 'react-query'
import { Container, Row, Spinner } from 'react-bootstrap'
import api from '../services/API'
export default function Setup() {
  const queryClient = useQueryClient()
  const { data: businessHours } = api.businessHours()
  const [isUpdating, setIsUpdating] = useState(false)
  const { mutate: closedShop } = useMutation(
    (isClosedShop) => api.setClosedShop(isClosedShop),
    {
      onMutate: () => {
        setIsUpdating(true)
      },
      onSuccess: () => {
        queryClient.invalidateQueries('businessHours')
        setIsUpdating(false)
      },
      onError: () => {
        setIsUpdating(false)
      },
    }
  )

  return (
    <section className='section section-main'>
      <Container>
        <>
          <h1 className='notification'>Shop is now {businessHours?.isTodayClosed ? (
                'Closed'
              ) : (
                'Open'
              )}</h1>
          <Row>
            <div
              className='setup-card m-4'
              onClick={() =>
                closedShop(businessHours?.isTodayClosed ? false : true)
              }>
              {isUpdating ? (
                <Spinner
                  animation='border'
                  variant='primary'
                  className='mr-2'
                />
              ) : businessHours?.isTodayClosed ? (
                'Open Shop'
              ) : (
                'Closed Shop'
              )}
            </div>
            <Link href='/closed-date'>
              <div className='setup-card m-4'>Setup Closed Date</div>
            </Link>
            <Link href='/menu'>
              <div className='setup-card m-4'>Setup Menu</div>
            </Link>
          </Row>
        </>
      </Container>
    </section>
  )
}
