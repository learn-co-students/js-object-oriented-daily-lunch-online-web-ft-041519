let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealId = 0;
let customerId = 0;
let deliveryId = 0;


class Neighborhood {
    constructor(name) {
        this.id = neighborhoodId++;
        this.name = name;
        store.neighborhoods.push(this);
        return this;
    };

    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.neighborhoodId === this.id;
        });
    };

    customers() {
        return store.customers.filter(customer => {
            return customer.neighborhoodId === this.id;
        });
    };

    meals() {
        let mealArray = this.customers().map(customer => {
            return customer.meals()
        });
        let uniqueMeals = Array.from(...new Set(mealArray))
        return uniqueMeals
    };
};

class Customer {
    constructor(name, neighborhoodId) {
        this.id = customerId++;
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        store.customers.push(this);
        return this;
    };

    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.customerId === this.id;
        });
    };

    meals() {
        return this.deliveries().map(delivery => {
            return delivery.meal()
        });
    };

    totalSpent() {
        return this.meals().reduce((total, meal) => (total += meal.price), 0)
    };
};

class Meal {
    constructor(title, price) {
        this.id = mealId++;
        this.title = title;
        this.price = price;
        store.meals.push(this);
        return this;
    };

    deliveries() {
        return store.deliveries.filter(delivery => {
            return delivery.mealId === this.id;
        });
    };

    customers() {
        return this.deliveries().map(delivery => {
            return delivery.customer()
        });
    };


    static byPrice() {
        console.log(store.meals.sort((a, b) => a.price - b.price))
      }

};

class Delivery {
    constructor(mealId, neighborhoodId, customerId) {
        this.id = deliveryId++;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId;
        store.deliveries.push(this);
        return this;
    };
    
    meal() {
        return store.meals.find(meal => {
            return meal.id === this.mealId;
        });
    };

    neighborhood() {
        return store.neighborhoods.find(neighborhood => {
            return neighborhood.id === this.neighborhoodId;
        });
    };
        
    customer() {
        return store.customers.find(customer => {
            return customer.id === this.customerId;
        });
    };
};
