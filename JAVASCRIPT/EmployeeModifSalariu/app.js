function applyBonus(employees, bonus){
    return new Promise((resolve,reject)=>{
        if(typeof bonus!=='number')
        return reject(new Error("invalid bonus"));

        if(!Array.isArray(employees) || !employees){
            return reject(new Error("Invalid array format"));
        }

        for(let i=0;i<employees.length;i++){
            if(typeof employees[i].name !=='string' ||typeof employees[i].salary !=='number' )
            {
                return reject(new Error("Invalid array format"));
            }
        }
        let max=employees[0].salary;
        for(let i=1;i<employees.length;i++){
            if( employees[i].salary>max)
            max=employees[i].salary;
        }
        if(bonus<0.1*max){
           return reject('Bonus too small');

        }
        else{// returneaza numele si salariul modificat
                resolve(employees.map(employee => {
                    return {
                        name : employee.name,
                        salary: employee.salary  + bonus
                    }
                }))
           
        
        }



    }
    
)};

let app = {
    applyBonus: applyBonus,
}

module.exports = app;