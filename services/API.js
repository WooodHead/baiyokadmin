import axios from 'axios'
import { useQuery } from 'react-query'

export const client = axios.create({
  baseURL: '',
  timeout: 30000,
})

// need auth detail

const getHeader = (idToken) => {
  const headers = {
    Authorization: idToken,
  }
  return headers
}
//  ****** no auths needed  *******//
const getMenuItems = (AuthUser) => {
  const headers = getHeader(AuthUser)
  return client.get(`/api/menuitems`, { headers }).then((res) => res.data)
}

function menuItemQuery() {
  return useQuery('menuitems', () => getMenuItems())
}

const getMenuItem = (menuItemId, AuthUser) => {
  const headers = getHeader(AuthUser)
  return client
    .get(`/api/menuitem?menuItemId=${menuItemId}`, { headers })
    .then((res) => res.data)
}

const addBooking = (reservation, AuthUser) => {
  const headers = getHeader(AuthUser)
  return client
    .post('/api/addBooking', { reservation }, { headers })
    .then((res) => res.data)
}

const getBooking = (bookingId, AuthUser) => {
  const headers = getHeader(AuthUser)
  return client
    .get(`/api/getBooking?bookingId=${bookingId}`, { headers })
    .then((res) => res.data)
}

const checkin = (checkin, AuthUser) => {
  const headers = getHeader(AuthUser)
  return client
    .post('/api/checkin', { checkin }, { headers })
    .then((res) => res.data)
}

const getBookingSetup = (date, AuthUser) => {
  const headers = getHeader(AuthUser)
  return client
    .get(`/api/getBookingSetup?date=${date}`, { headers })
    .then((res) => res.data)
}

const updateMenuItem = (menuItem, AuthUser) => {
  const headers = getHeader(AuthUser)
  return client
    .post('/api/updateMenuItem', { menuItem }, { headers })
    .then((res) => res.data)
}

const getOrders = (status, idToken) => {
  const headers = getHeader(idToken)
  return client
    .get(`/api/orders?status=${status}`, { headers })
    .then((res) => res.data)
}

function cancelOrder(orderId, AuthUser) {
  const headers = getHeader(AuthUser)
  return client
    .get(`/api/cancelOrder?orderId=${orderId}`, { headers })
    .then((res) => res.data)
}

const confirmOrder = (orderId, AuthUser) => {
  const headers = getHeader(AuthUser)
  return client.get(`/api/confirmOrder?orderId=${orderId}`, { headers })
}

const readyOrder = (orderId, AuthUser) => {
  const headers = getHeader(AuthUser)
  return client.get(`/api/readyOrder?orderId=${orderId}`, { headers })
}

const pickupOrder = (orderId, AuthUser) => {
  const headers = getHeader(AuthUser)
  return client.get(`/api/pickupOrder?orderId=${orderId}`, { headers })
}

const touchOrder = (orderId, AuthUser) => {
  const headers = getHeader(AuthUser)
  return client.get(`/api/touchOrder?orderId=${orderId}`, { headers })
}

const untouchedOrders = (AuthUser) => {
  const headers = getHeader(AuthUser)
  return client.get(`/api/untouchedOrders`, { headers }).then((res) => res.data)
}

const delayOrder = (orderId, delayMins, AuthUser) => {
  const headers = getHeader(AuthUser)
  return client.get(
    `/api/delayOrder?orderId=${orderId}&delayMins=${delayMins}`,
    { headers }
  )
}

const switchItem = (itemId, available, AuthUser) => {
  const headers = getHeader(AuthUser)
  return client.get(
    `/api/availableItem?itemId=${itemId}&available=${available}`,
    { headers }
  )
}

function untouchedOrdersQuery() {
  const untouchQuery = useQuery('getUntouchedCount', () => untouchedOrders(), {
    refetchInterval: 60000,
  })
  useQuery(['ordersQuery', 'open'], () => getOrders('open'), {
    enabled: untouchQuery.data?.count > 0,
  })
  return untouchQuery
}

const getBusinessHours = (idToken) => {
  const headers = getHeader(idToken)
  return client.get(`/api/businessHours`, { headers }).then((res) => res.data)
}


const adjustPriceOrder = (
  orderId,
  adjustInCents,
  subTotalInCents,
  adjustNote
) => {
  return client.get(
    `/api/adjustPriceOrder?orderId=${orderId}&adjustInCents=${adjustInCents}&adjustNote=${adjustNote}&subTotalInCents=${subTotalInCents}`,
    { headers }
  )
}

const addUser = (user) => {
  return client
    .post('/api/addUser', { user }, { headers })
    .then((res) => res.data)
}

const getDateConfigs = () => {
  return client.get(`/api/getDateConfigs`, { headers }).then((res) => res.data)
}

function dateConfigsQuery() {
  return useQuery(['dateConfigs'], () => getDateConfigs())
}

const deleteDate = (dateId) => {
  return client.get(`/api/deleteDate?dateId=${dateId}`, { headers })
}

const addDate = (date) => {
  return client
    .post(`/api/addDate`, { date }, { headers })
    .then((res) => res.data)
}

const setClosedShop = (isClosedShop, idToken) => {
  const headers = getHeader(idToken)
  return client.get(`/api/setClosedShop?isClosedShop=${isClosedShop}`, {
    headers,
  })
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
  untouchedOrdersQuery,
  getBusinessHours,
  switchItem,
  menuItemQuery,
  dateConfigsQuery,
  deleteDate,
  addDate,
  setClosedShop,
}
