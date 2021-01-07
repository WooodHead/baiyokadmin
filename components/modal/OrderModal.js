import React, { useState } from 'react'
import { Form, Modal, Row, Col } from 'react-bootstrap'
import OrderItem from '../order/OrderItem'
import formatMoney from '../../services/formatMoney'
import api from '../../services/API'
import DelayOrderModal from './DelayOrderModal'

const OrderModal = ({ show, onHide, order, refreshOrders }) => {
  const [showDelay, setShowDelay] = useState(false)

  const hideDelay = () => {
    setShowDelay(false)
    refreshOrders()
  }

  const cancelOrder = async (e) => {
    e.preventDefault()
    await api.cancelOrder(order._id)
    refreshOrders()
    onHide()
  }

  const confirmOrder = async (e) => {
    e.preventDefault()
    await api.confirmOrder(order._id)
    refreshOrders()
    onHide()
  }

  const readyOrder = async (e) => {
    e.preventDefault()
    await api.readyOrder(order._id)
    refreshOrders()
    onHide()
  }

  const pickupOrder = async (e) => {
    e.preventDefault()
    await api.pickupOrder(order._id)
    refreshOrders()
    onHide()
  }

  return (
    <>
      {showDelay && (
        <DelayOrderModal
          show={showDelay}
          onHide={hideDelay}
          order={order}
          refreshOrders={refreshOrders}
        />
      )}
      <Modal show={show} onHide={onHide} size='lg' centered>
        <Modal.Header closeButton={true}></Modal.Header>
        <Modal.Body>
          <Form>
            <h1 className='text-capitalize p-4 menu-modal-title'>
              {order.pickupName}
            </h1>
            <h2 className='text-gray mb-0 px-4 menu-modal-subtitle'>
              Pickup Time: {order.pickupTime} {order.delayMins ? `(+${order.delayMins} mins)` : ''}
            </h2>
            <p className='text-gray mb-0 px-4 menu-modal-subtitle u-margin-bottom-small'>
              Contact Number: {order.phone}
            </p>
            <div className='order-details p-4'>
              <h2 className='px-4'>Orders</h2>
              <ul>
                {order &&
                  order.items.map((item, idx) => (
                    <OrderItem key={idx} item={item} />
                  ))}
              </ul>
              <footer>
                <h2 className='text-right u-margin-bottom-med'>
                  TOTAL {order && formatMoney(order.totalInCents)}
                </h2>
                {order.status === 'open' && (
                  <>
                    <Row className='u-margin-bottom-small'>
                      <Col></Col>
                      <Col>
                        <button
                          className='invert-theme-btn border full-width-btn mb-0 p-4'
                          onClick={(e) => {
                            e.preventDefault()
                            setShowDelay(true)
                          }}>
                          Delay order
                        </button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <button
                          className='theme-btn full-width-btn mb-0 p-4'
                          onClick={(e) => cancelOrder(e)}>
                          Cancel
                        </button>
                      </Col>
                      <Col>
                        <button
                          className='theme-btn full-width-btn mb-0 p-4'
                          onClick={(e) => confirmOrder(e)}>
                          Confirm
                        </button>
                      </Col>
                    </Row>
                  </>
                )}
                {order.status === 'preparing' && (
                  <Row>
                    <Col></Col>
                    <Col>
                      <button
                        className='theme-btn full-width-btn mb-0 p-4'
                        onClick={(e) => readyOrder(e)}>
                        Ready for Pick up
                      </button>
                    </Col>
                  </Row>
                )}
                {order.status === 'ready' && (
                  <Row>
                    <Col></Col>
                    <Col>
                      <button
                        className='theme-btn full-width-btn mb-0 p-4'
                        onClick={(e) => pickupOrder(e)}>
                        Picked up
                      </button>
                    </Col>
                  </Row>
                )}
              </footer>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default OrderModal
