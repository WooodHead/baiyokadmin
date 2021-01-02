import React, { useState } from 'react'
import { Badge, Button, Card, Row, Col } from 'react-bootstrap'
import OrderModal from '../modal/OrderModal'
import api from '../../services/API'

const OrderCard = ({ order = null, refreshOrders, showStatus = false }) => {
  const [showOrder, setShowOrder] = useState(false)

  const hideOrder = () => {
    setShowOrder(false)
    refreshOrders()
  }

  const showOrderModal = async () => {
    await api.touchOrder(order._id)
    setShowOrder(true)
  }

  return (
    <>
      {showOrder && (
        <OrderModal
          show={showOrder}
          onHide={hideOrder}
          order={order}
          refreshOrders={refreshOrders}
        />
      )}

      <Card
        style={{ width: '70rem' }}
        className='p-4 m-4'
        onClick={() => showOrderModal()}>
        <Card.Body>
          <Row>
            <Col>
              <h2 className='py-2'>{order && order.pickupName}</h2>
              <h3>Pickup Time: {order.pickupTime}</h3>
            </Col>
            <Col className='text-right '>
              {!order.touched && <div className='touch-dot'></div>}
              {showStatus && <h3>{order.status}</h3>}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default OrderCard
