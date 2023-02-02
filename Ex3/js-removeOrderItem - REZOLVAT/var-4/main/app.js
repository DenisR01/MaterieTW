function removeOrderItem(orderInfo, position) {

    if (!Array.isArray(orderInfo.items))
        throw new Error('Items should be an array');

    for (let item of orderInfo.items)
        if (!item.price || !item.quantity)
            throw new Error('Malformed item');

    if (position < 0 || position > orderInfo.items.length - 1)
        throw new Error('Invalid position');


    switch (position) {
        case 0:
            orderInfo.items.shift();
            break;

        case orderInfo.items.length - 1:
            orderInfo.items.pop();
            break;
        default:
            orderInfo.items = orderInfo.items.slice(0, position).concat(orderInfo.items.slice(position + 1));
            break;
    }



    orderInfo.total = orderInfo.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return orderInfo;

}


removeOrderItem({ total: 120, items: [{ price: 10, quantity: 3 }, { price: 15, quantity: 2 }, { price: 10, quantity: 4 }, { price: 5, quantity: 4 }] }, 2);

const app = {
    removeOrderItem
};

module.exports = app;