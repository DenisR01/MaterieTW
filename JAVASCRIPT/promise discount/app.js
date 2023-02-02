function applyDiscount(vehicles, discount){
    return new Promise((resolve,reject)=>{
        
        if(!discount || typeof discount!=='number')
        {
            reject(new Error('Invalid discount'));
        }
        for(let i=0;i<vehicles.length;i++){
            if(typeof vehicles[i].make!=='string' ||typeof vehicles[i].price!=='number'){
                reject(new Error('Invalid array format'));
            }
        }
        let min=vehicles[0].price;

        for(let i=1;i<vehicles.length;i++){
            if(vehicles[i].price<min)
            min=vehicle.price;
        }
        if(discount>0.5*min){
           return  reject(('Discount too big'));
        }
        else{
            resolve(vehicles.map(vehicle => {
                return {
                    make : vehicle.make,
                    price: vehicle.price  - discount
                }
            }))
        }


    });
}

const app = {
    applyDiscount: applyDiscount
};

module.exports = app;