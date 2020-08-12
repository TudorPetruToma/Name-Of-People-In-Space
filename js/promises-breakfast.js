const order = false;

const breakfastPromise = new Promise((resolve, rejected) => {

setTimeout(() => {
   if(order){
       resolve('Order ready');
   } else{
       rejected(Error('Order deleted! Money will be send back!'))
   }
}, 2000)
})

console.log(breakfastPromise)
breakfastPromise
.then( val => console.log(val) )
.catch( err => console.log(err))