import React, { useEffect, useState } from 'react'
import {
  Col,
  Container,
  Row,
  Spinner,
  Accordion,
  Button,
  Card
} from 'react-bootstrap'
import MenuItem from '../components/common/MenuItem'
import { CATEGORIES } from '../components/StaticData'
import Icon from '../components/common/FontAwesome'

import api from '../services/API'

const Menu = ({}) => {
  const [showModal, setShowModal] = useState(false)
  const [menuitems, setMenuitems] = useState([])
  const closeModal = () => {
    setShowModal(false)
  }

  const cancel = () => {
    closeModal()
    navigate('/')
  }

  useEffect(() => {
    console.log('load menu')
    async function fetchData() {
      const response = await api.getMenuItems()
      setMenuitems(response)
    }
    fetchData()
  }, [])

  return (
    <section className='section py-5 order-section'>
      <Container>
        {menuitems.length === 0 ? (
          <>
            <Spinner animation='border' variant='primary' className='mr-2' />{' '}
            Loading menu...
          </>
        ) : (
          <>
            {CATEGORIES.map(({ title, category }) => (
              <Accordion defaultActiveKey={title}>
                {/* <Card> */}
                  <Row key={title}>
                    <Col md={12}>
                      <Accordion.Toggle
                        as={Button}
                        size='block'
                        variant='link'
                        className='text-left d-flex align-items-center p-0'
                        eventKey={title}>
                        <h3 className='my-3 text-capitalize'>
                          <strong>{title}</strong>
                        </h3>
                      </Accordion.Toggle>

                      <Accordion.Collapse eventKey={title} show>
                        <div className='bg-white rounded border shadow-sm mb-4'>
                          {menuitems
                            .filter((item) => item.category === category)
                            // .sort((a, b) =>
                            //   a.title.localeCompare(b.title, undefined, {
                            //     sensitivity: 'accent'
                            //   })
                            // )
                            .map((item) => (
                              <MenuItem key={item._id} item={item} />
                            ))}
                        </div>
                      </Accordion.Collapse>
                    </Col>
                  </Row>
                {/* </Card> */}
              </Accordion>
            ))}
          </>
        )}
      </Container>
    </section>
  )
}

export default Menu
