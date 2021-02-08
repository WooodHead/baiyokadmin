import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useIncomingOrder() {
  const { data, error } = useSWR('/api/orders?status=open', fetcher, { refreshInterval: 60000 })
  return {
    orders: data,
    isLoading: !error && !data,
    isError: error
  }
}

function useUntouchedCount() {
  const { data, error } = useSWR('/api/untouchedOrders', fetcher, { refreshInterval: 60000 })
  return {
    count: data ? data.count : 0,
    isCountLoading: !error && !data,
    isCountError: error
  }
}

module.exports = {
  useIncomingOrder,
  useUntouchedCount
}
