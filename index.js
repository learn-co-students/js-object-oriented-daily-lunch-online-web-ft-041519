// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 1
let mealId = 1
let customerId = 1
let deliveryId = 1

class Neighborhood {
    constructor(name){
        this.name = name
        this.id = ++neighborhoodId
        store.neighborhoods.push(this)
    }

    deliveries(){
        return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
    }

    customers(){
        return store.customers.filter(customer => customer.neighborhoodId === this.id)  
    }

    meals() {
        const allMeals = store.meals.map(meal => meal.deliveries())
        return [...new Set(allMeals)]
    }
}

class Meal {
    constructor(title, price){
        this.title = title
        this.price = price
        this.id = ++mealId
        store.meals.push(this)
    }

    deliveries(){
        return store.deliveries.filter(delivery => delivery.mealId === this.id)  
    }

    customers(){
        const allCustomers = store.deliveries.map(delivery => delivery.customer())
        return [...new Set(allCustomers)]
    }

    static byPrice() {
        return store.meals.sort((a, b) => {return b.price - a.price})
    }
}

class Customer {
    constructor(name, neighborhood){
        this.name = name
        this.id = ++customerId
        this.neighborhoodId = neighborhood
        store.customers.push(this)
    }

    deliveries(){
        return store.deliveries.filter(delivery => delivery.customerId === this.id)  
    }

    meals() {
        return this.deliveries().map(delivery => delivery.meal())
      }

    totalSpent() {
        return this.meals().reduce((total, meal) => (total += meal.price), 0)
    }
}

class Delivery {
    constructor(mealId, neighborhoodId, customerId){
        this.mealId = mealId
        this.customerId = customerId
        this.neighborhoodId = neighborhoodId
        this.id = ++deliveryId
        store.deliveries.push(this)
    }

    meal() {
        return store.meals.find(meal => meal.id === this.mealId)
    }

    customer() {
        return store.customers.find(customer => customer.id === this.customerId)
      }

    neighborhood() {
        return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
    }

}


