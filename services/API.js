import axios from 'axios'

export const client = axios.create({
  baseURL: '',
  timeout: 30000
})

//  ****** no auths needed  *******//

const getMenuItems = () => {
  return client.get(`/api/menuitems`).then((res) => res.data)
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

export default {
  getMenuItems,
  addBooking,
  checkin,
  getBooking,
  getBookingSetup
}
