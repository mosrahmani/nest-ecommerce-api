
export const validFilters = (query: Object, args) => {
    let filters: Object = {}
  
    args.forEach(arg => {

      if (Object.keys(query).some(i => arg.key.includes(i)))
        filters = { ...filters, [arg.field]: { ...arg.where } }

    })

    return filters
  }
  

export const validOrders = (value: Object, ordersList) => {
    let orders: Object = {}
  
    ordersList.forEach((item, index) => {
        if (value === item.key) {
            orders = { ...orders, [item.field]: item.value }
            ordersList.length = index + 1 // break the loop
        }
    })

    return orders
  }
  