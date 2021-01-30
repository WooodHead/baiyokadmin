import React, { useState, useEffect } from 'react'
import { Form, Modal, Row, Col, Spinner } from 'react-bootstrap'
import OrderItem from '../order/OrderItem'
import formatMoney from '../../services/formatMoney'
import api from '../../services/API'
import DelayOrderModal from './DelayOrderModal'
import PriceAdjustModal from './PriceAdjustModal'

const OrderModal = ({ show, onHide, order, refreshOrders }) => {
  const [showDelay, setShowDelay] = useState(false)
  const [showAdjustPrice, setShowAdjustPrice] = useState(false)
  const [adjustItem, setAdjustItem] = useState(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (order.adjustInCents) {
      const item = {
        quantity: 1,
        item: {
          title: order.adjustNote,
        },
        totalPrice: order.adjustInCents,
      }
      setAdjustItem(item)
    }
  }, [order])

  const hideDelay = () => {
    setShowDelay(false)
    refreshOrders()
  }

  const hideAdjustPrice = () => {
    setShowAdjustPrice(false)
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
    setLoading(true)
    await api.confirmOrder(order._id)
    refreshOrders()
    onHide()
    setLoading(false)
  }

  const readyOrder = async (e) => {
    e.preventDefault()
    setLoading(true)
    await api.readyOrder(order._id)
    refreshOrders()
    onHide()
    setLoading(false)
  }

  const pickupOrder = async (e) => {
    e.preventDefault()
    setLoading(true)
    await api.pickupOrder(order._id)
    refreshOrders()
    onHide()
    setLoading(false)
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
      {showAdjustPrice && (
        <PriceAdjustModal
          show={showAdjustPrice}
          onHide={hideAdjustPrice}
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
            {order.option === 'pickup' && (
              <h2 className='text-gray mb-0 px-4 menu-modal-subtitle'>
                Pickup Time: {order.pickupTime}{' '}
                {order.delayMins ? `(+ Delay ${order.delayMins} mins)` : ''}
              </h2>
            )}
            {order.option === 'delivery' && (
              <h2 className='text-gray mb-0 px-4 menu-modal-subtitle'>
                Delivery Address: {order.address}
              </h2>
            )}
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
                {order.option === 'delivery' && (
                  <OrderItem
                    item={{
                      quantity: 1,
                      totalPrice: order.deliveryFeeInCents,
                      item: { image: '', title: 'Delivery Fee' },
                    }}
                  />
                )}
                {adjustItem && <OrderItem item={adjustItem} />}
              </ul>
              <footer>
                <h2 className='text-right u-margin-bottom-med'>
                  TOTAL {order && formatMoney(order.totalInCents)}
                </h2>
                {order.status === 'open' && (
                  <>
                    <Row className='u-margin-bottom-small'>
                      <Col>
                        {' '}
                        <button
                          className='invert-theme-btn border full-width-btn mb-0 p-4'
                          onClick={(e) => {
                            e.preventDefault()
                            setShowAdjustPrice(true)
                          }}>
                          Price adjustment
                        </button>
                      </Col>
                      <Col>
                        {order.option !== 'delivery' && (
                          <button
                            className='invert-theme-btn border full-width-btn mb-0 p-4'
                            onClick={(e) => {
                              e.preventDefault()
                              setShowDelay(true)
                            }}>
                            Delay order
                          </button>
                        )}
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
                          disabled={loading}
                          onClick={(e) => confirmOrder(e)}>
                          {loading && (
                            <>
                              <Spinner
                                as='span'
                                animation='border'
                                aria-hidden='true'
                              />
                              <>&nbsp;&nbsp;</>
                            </>
                          )}
                          Confirm{loading ? 'ing' : ''}
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
                        disabled={loading}
                        onClick={(e) => readyOrder(e)}>
                        {loading && (
                          <>
                            <Spinner
                              as='span'
                              animation='border'
                              aria-hidden='true'
                            />
                            <>&nbsp;&nbsp;</>
                          </>
                        )}
                        {`Ready for ${order.option}`}
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
                        disabled={loading}
                        onClick={(e) => pickupOrder(e)}>
                        {loading && (
                          <>
                            <Spinner
                              as='span'
                              animation='border'
                              aria-hidden='true'
                            />
                            <>&nbsp;&nbsp;</>
                          </>
                        )}
                        {`${
                          order.option === 'delivery'
                            ? 'delivered'
                            : 'picked up'
                        }`}
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
