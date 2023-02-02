function applyDiscount(vehicles, discount) {


    const promise = new Promise((resolve, reject) => {


        if (typeof discount !== 'number')
            reject(new Error('Invalid discount'));

        for (let vehicle of vehicles)
            if (!vehicle.make || !vehicle.price || typeof vehicle.make !== 'string' || typeof vehicle.price !== 'number')
                reject(new Error('Invalid array format'));


        const minPrice = vehicles.sort((a, b) => a.price - b.price).at(0).price;

        if (discount > 0.5 * minPrice)
            reject('Discount too big');


        vehicles = vehicles.map(vehicle => ({ ...vehicle, price: vehicle.price - discount }));

        resolve(vehicles);

    })

    return promise;

}


const app = {
    applyDiscount: applyDiscount
};

module.exports = app;