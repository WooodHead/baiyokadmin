import React, { useState } from 'react'
import Link from 'next/link'
import { Container, Row, Spinner, Media } from 'react-bootstrap'

export default function Setup() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <section className='section section-main'>
      <Container>
        {isLoading ? (
          <>
            <Spinner animation='border' variant='primary' className='mr-2' />{' '}
            Loading menu...
          </>
        ) : (
          <>
            <Row>
              <Link href='/closed-date'>
                <div className='setup-card m-4'>Setup Closed Date</div>
              </Link>
              <Link href='/menu'>
                <div className='setup-card m-4'>Setup Menu</div>
              </Link>
            </Row>
          </>
        )}
      </Container>
    </section>
  )
}
