const restaurants = {
  "Restuarant 1" : "Mon",
  "Restuarant 2" : "Tues",
  "Restuarant 3" : "Wed",
  "Restuarant 4" : "Thur",
  "Restuarant 5" : "Fri",
  "Restuarant 6" : "Sat",
  "Restuarant 7" : "Sun",
}

const trainingData = [];

for (let restaurantName in restaurants) {
  const dayOfWeek = restaurants[restaurantName];
  trainingData.push({
    input: {[dayOfWeek]: 1},
    output: {[restaurantName]: 1}
  });
}

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const stats = net.train(trainingData);
 
function restaurantForDay(dayOfWeek) {
  const result = net.run({
    [dayOfWeek]: 1
  });
  let highestValue = 0;
  let highestRestuarantName = '';
  for (let restaurantName in result){
    if (result[restaurantName] > highestValue){
      highestValue = result[restaurantName];
      highestRestuarantName = restaurantName;
    }
  }
  return highestRestuarantName;
}

console.log('%c'+ restaurantForDay("Wed").toString(),  'background: #222; color: #AAFF00')


// 
// 
//============================
//  SECTION: TEXT-AND-BACKGROUND-WORKS
//  AUTHOR: MUNYA 
//  DESCR: Sets the text color to white or
//         black based on the background color.
//============================
// 
// 

