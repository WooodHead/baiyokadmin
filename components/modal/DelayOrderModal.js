import React, { useState } from 'react'
import { Form, Modal, Row, Col, Spinner } from 'react-bootstrap'
import OrderItem from '../order/OrderItem'
import formatMoney from '../../services/formatMoney'
import api from '../../services/API'

const DelayOrderModal = ({ show, onHide, order, refreshOrders }) => {
  const [delayMins, setDelayMins] = useState(null)
  const [loading, setLoading] = useState(false)

  const delayOrder = async (e) => {
    e.preventDefault()
    setLoading(true)
    await api.delayOrder(order._id, delayMins)
    refreshOrders()
    onHide()
    setLoading(false)
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      centered
      className='full-height-modal'>
      <Modal.Header closeButton={true}>Delay Order</Modal.Header>
      <Modal.Body>
        <Form>
          <h1 className='text-gray mb-0 px-4 menu-modal-subtitle u-margin-bottom-small'>
            How much additional time do you need?
          </h1>
          <div className='order-details p-4'>
            <Row className='u-margin-bottom-small'>
              <Col>
                <button
                  className={`${
                    delayMins === 5 ? 'theme-btn' : 'invert-theme-btn'
                  } border full-width-btn mb-0 p-4`}
                  disabled={delayMins === 5}
                  onClick={() => setDelayMins(5)}>
                  5 min(s)
                </button>
              </Col>
              <Col>
                <button
                  className={`${
                    delayMins === 10 ? 'theme-btn' : 'invert-theme-btn'
                  } border full-width-btn mb-0 p-4`}
                  disabled={delayMins === 10}
                  onClick={() => setDelayMins(10)}>
                  10 min(s)
                </button>
              </Col>
            </Row>
            <Row>
              <Col>
                <button
                  className={`${
                    delayMins === 20 ? 'theme-btn' : 'invert-theme-btn'
                  } border full-width-btn mb-0 p-4`}
                  disabled={delayMins === 20}
                  onClick={() => setDelayMins(20)}>
                  20 min(s)
                </button>
              </Col>
              <Col>
                <button
                  className={`${
                    delayMins === 30 ? 'theme-btn' : 'invert-theme-btn'
                  } border full-width-btn mb-0 p-4`}
                  disabled={delayMins === 30}
                  onClick={() => setDelayMins(30)}>
                  30 min(s)
                </button>
              </Col>
            </Row>
            <div className='modal-buffer'></div>
            <footer>
              <Row>
                <Col>
                  <button
                    className='theme-btn full-width-btn mb-0 p-4'
                    onClick={(e) => onHide()}>
                    Cancel
                  </button>
                </Col>
                <Col>
                  <button
                    className='theme-btn full-width-btn mb-0 p-4'
                    disabled={!delayMins || loading}
                    onClick={(e) => delayOrder(e)}>
                    {loading && (
                      <><Spinner
                        as='span'
                        animation='border'
                        aria-hidden='true'
                      /><>&nbsp;&nbsp;</></>
                    )}
                    Confirm{loading ? 'ing' : ''}
                  </button>
                </Col>
              </Row>
            </footer>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default DelayOrderModal
