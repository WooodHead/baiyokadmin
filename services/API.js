import axios from 'axios'

export const client = axios.create({
  baseURL: '',
  timeout: 30000
})

//  ****** no auths needed  *******//

const getMenuItems = () => {
  return client.get(`/api/menuitems`).then((res) => res.data)
}

const getMenuItem = (menuItemId) => {
  return client.get(`/api/menuitem?menuItemId=${menuItemId}`).then((res) => res.data)
}

const addBooking = (reservation) => {
  return client.post('/api/addBooking', { reservation }).then((res) => res.data)
}

const getBooking = (bookingId) => {
  return client.get(`/api/getBooking?bookingId=${bookingId}`).then((res) => res.data)
}

const checkin = (checkin) => {
  return client.post('/api/checkin', { checkin }).then((res) => res.data)
}

const getBookingSetup = (date) => {
  return client.get(`/api/getBookingSetup?date=${date}`).then((res) => res.data)
}

const updateMenuItem = (menuItem) => {
  return client.post('/api/updateMenuItem', { menuItem }).then((res) => res.data)
}

const getOrders = (status) => {
  return client.get(`/api/orders?status=${status}`)
}

const cancelOrder = (orderId) => {
  return client.get(`/api/cancelOrder?orderId=${orderId}`)
}

const confirmOrder = (orderId) => {
  return client.get(`/api/confirmOrder?orderId=${orderId}`)
}

const readyOrder = (orderId) => {
  return client.get(`/api/readyOrder?orderId=${orderId}`)
}

const pickupOrder = (orderId) => {
  return client.get(`/api/pickupOrder?orderId=${orderId}`)
}

const touchOrder = (orderId) => {
  return client.get(`/api/touchOrder?orderId=${orderId}`)
}

const untouchedOrders = () => {
  return client.get(`/api/untouchedOrders`)
}

export default {
  getMenuItems,
  addBooking,
  checkin,
  getBooking,
  getBookingSetup,
  getMenuItem,
  updateMenuItem,
  getOrders,
  cancelOrder,
  confirmOrder,
  readyOrder,
  pickupOrder,
  touchOrder,
  untouchedOrders
}
