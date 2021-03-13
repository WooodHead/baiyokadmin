import axios from 'axios'
import { useQuery } from 'react-query'

export const client = axios.create({
  baseURL: '',
  timeout: 30000,
})

//  ****** no auths needed  *******//

const getMenuItems = () => {
  return client.get(`/api/menuitems`).then((res) => res.data)
}

function menuItemQuery() {
  return useQuery('menuitems', () => getMenuItems())
}

const getMenuItem = (menuItemId) => {
  return client
    .get(`/api/menuitem?menuItemId=${menuItemId}`)
    .then((res) => res.data)
}

const addBooking = (reservation) => {
  return client.post('/api/addBooking', { reservation }).then((res) => res.data)
}

const getBooking = (bookingId) => {
  return client
    .get(`/api/getBooking?bookingId=${bookingId}`)
    .then((res) => res.data)
}

const checkin = (checkin) => {
  return client.post('/api/checkin', { checkin }).then((res) => res.data)
}

const getBookingSetup = (date) => {
  return client.get(`/api/getBookingSetup?date=${date}`).then((res) => res.data)
}

const updateMenuItem = (menuItem) => {
  return client
    .post('/api/updateMenuItem', { menuItem })
    .then((res) => res.data)
}

const getOrders = (status) => {
  return client.get(`/api/orders?status=${status}`).then((res) => res.data)
}

function cancelOrder(orderId) {
  return client
    .get(`/api/cancelOrder?orderId=${orderId}`)
    .then((res) => res.data)
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
  return client.get(`/api/untouchedOrders`).then((res) => res.data)
}

const delayOrder = (orderId, delayMins) => {
  return client.get(`/api/delayOrder?orderId=${orderId}&delayMins=${delayMins}`)
}

const switchItem = (itemId, available) => {
  return client.get(`/api/availableItem?itemId=${itemId}&available=${available}`)
}

function ordersQuery(status) {
  return useQuery(['ordersQuery', status], () => getOrders(status))
}

function untouchedOrdersQuery() {
  const untouchQuery = useQuery('getUntouchedCount', () => untouchedOrders(), {
    refetchInterval: 60000,
  })
  useQuery(['ordersQuery', 'open'], () => getOrders('open'), {
    enabled: untouchQuery.data?.count > 0
  })
  return untouchQuery
}

const getBusinessHours = () => {
  return client.get(`/api/businessHours`).then((res) => res.data)
}

function businessHours() {
  return useQuery('businessHours', () => getBusinessHours())
}


const adjustPriceOrder = (
  orderId,
  adjustInCents,
  subTotalInCents,
  adjustNote
) => {
  return client.get(
    `/api/adjustPriceOrder?orderId=${orderId}&adjustInCents=${adjustInCents}&adjustNote=${adjustNote}&subTotalInCents=${subTotalInCents}`
  )
}

const addUser = (user) => {
  return client.post('/api/addUser', { user }).then((res) => res.data)
}

const getDateConfigs = () => {
  return client.get(`/api/getDateConfigs`).then((res) => res.data)
}

function dateConfigsQuery() {
  return useQuery(['dateConfigs'], () => getDateConfigs())
}

const deleteDate = (dateId) => {
  return client.get(`/api/deleteDate?dateId=${dateId}`)
}

const addDate = (date) => {
  return client.post(`/api/addDate`, { date }).then((res) => res.data)
}

const setClosedShop = (isClosedShop) => {
  return client.get(`/api/setClosedShop?isClosedShop=${isClosedShop}`)
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
  untouchedOrders,
  delayOrder,
  adjustPriceOrder,
  addUser,
  ordersQuery,
  untouchedOrdersQuery,
  businessHours,
  switchItem,
  menuItemQuery,
  dateConfigsQuery,
  deleteDate,
  addDate,
  setClosedShop,
}
