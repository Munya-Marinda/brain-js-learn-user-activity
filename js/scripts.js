// ==================================================================
// ==================================================================

//  DEVELOPER: MUNYA
//  DESCR: Train and test json data against a Brain JS Neural Network

// ==================================================================
// ==================================================================
//
//
//
//

// create a new NeuralNetwork
const net = new brain.NeuralNetwork({ hiddenLayers: [3] });
const netVitals = { error_rate: -1, iterations: 0 };

//  number of times that the N.Network is called
let netCallCount = 0;

//
//
//
//
//
//
//
//
//
//
//
//

function GetTrainingFiles() {
  // get raw data
  const userData = all_user_data_const;

  //  create user trainingdata
  const userTrainingData = {};

  // populate user training data
  userData.forEach((data, index) => {
    userTrainingData["user" + index] = data;
  });

  return userTrainingData;
}

function StartTraining() {
  // show training data view
  document.getElementById("tabTrainingDataView").style.display = "block";

  // show training stats if option is checked
  if (document.getElementById("showStatsPrompt").checked === true) {
    document.getElementById("learningStats").style.display = "block";
  } else {
    document.getElementById("learningStats").style.display = "none";
  }

  // clean textarea that displays the trainingdata
  document.getElementById("fileContent").innerHTML = "";
  document.getElementById("fileContent-ShowOnUseModel").innerHTML = "";

  // get userTrainingData
  const userTrainingData = GetTrainingFiles();

  // create and populate trainingdata
  var resultFormatted = ""; // result formatted  (for the user)
  const trainingData = [];
  for (let input_data in userTrainingData) {
    // get output
    const output_data = JSON.stringify(userTrainingData[input_data]);

    // result formatted (for the user)
    resultFormatted +=
      "input: { [" +
      input_data +
      "]: 1 },\noutput: { [" +
      output_data +
      "]: 1 },\n\n";

    // push data
    trainingData.push({
      input: { [input_data]: 1 },
      output: { [JSON.stringify(output_data)]: 1 },
    });
  }

  // show user
  document.getElementById("fileContent").innerHTML = resultFormatted;
  document.getElementById("fileContent-ShowOnUseModel").innerHTML =
    resultFormatted;

  // stats
  document.getElementById("learningStatsText").innerHTML = "";

  // train the NeuralNetwork
  var i = 0;
  var log = "";
  const error_rate = net.train(trainingData, {
    callback: (e) => {
      i++;
      log +=
        "(" +
        i +
        ") error: " +
        e.error +
        "\n    iteration-index: " +
        e.iterations +
        "\n\n";
    },
  });
  // net vitals
  netVitals.error_rate = error_rate.error;
  netVitals.iterations = error_rate.iterations;

  //
  //
  document.getElementById("learningStatsText").innerHTML +=
    "ERROR RATE (higher is bad): " + error_rate.error + "\n\n";
  document.getElementById("learningStatsText").innerHTML +=
    "NUMBER OF ITERATION TIMES:" + i + "\n\n";
  document.getElementById("learningStatsText").innerHTML += log;
  //
  //
  //
  // no trained data prompt
  document.getElementById("trainAModel-NoModel").style.display = "none";
  document.getElementById("queryOutPut").innerHTML =
    "////////////////////////////\n\nYOUR ANSWER WILL APPEAR HERE";
}

// function to get an output from the NeuralNetwork
function getUserData(input_data) {
  // incr number of times the network was called
  netCallCount++;
  document.getElementById("netCallCount").innerHTML = netCallCount;

  const result = net.run({
    [input_data]: 1,
  });
  let highestValue = 0;
  let highestOutputValue = "";
  for (let outputValues in result) {
    if (result[outputValues] > highestValue) {
      highestValue = result[outputValues];
      highestOutputValue = outputValues;
    }
  }

  return highestOutputValue;
}

// function to show the output of queried data
function QueryData() {
  const queryStr = document.getElementById("txtQuestion").value;
  if (net.outputLayer !== -1) {
    if (queryStr.length !== 0) {
      document.getElementById("queryOutPut").innerHTML = getUserData(queryStr);
    } else {
      document.getElementById("queryOutPut").innerHTML =
        "////////////////////////////\n\nQUERY TEXT CAN'T BE EMTPTY";
    }
    //
    document.getElementById("trainAModel-NoModel").style.display = "none";
  } else {
    document.getElementById("queryOutPut").innerHTML =
      "////////////////////////////\n\nMODEL HAS TO BE TRAINED FIRST";
    document.getElementById("trainAModel-NoModel").style.display = "block";
  }
}

// fucntion to switch between tabs on the site
function SwitchTabs(whereTo) {
  // on 1st click
  if (
    document.getElementById("logoIntroTabImageDiv").style.display !== "none"
  ) {
    document.getElementById("logoIntroTabImageDiv").style.display = "none";
    document.getElementById("topNavTab").style.display = "none";
    document.getElementById("tabsMainParent").style.display = "block";
  }

  switch (whereTo) {
    case "useModelTab":
      document.getElementById("trainModelTab").style.display = "none";
      document.getElementById("useModelTab").style.display = "block";
      break;

    case "trainModelTab":
      document.getElementById("trainModelTab").style.display = "block";
      document.getElementById("useModelTab").style.display = "none";
      break;

    default:
      break;
  }
}

// function to save current NeuralNetwork as .json text.
function SaveModel() {
  // console.log(typeof error_rate.error); 
  localStorage.setItem("NeuralNetwork", JSON.stringify(net.toJSON()));
}

// show/hide training stats
document.getElementById("showStatsPrompt").addEventListener("click", (e) => {
  // show training stats if option is checked
  if (e.target.checked === true) {
    document.getElementById("learningStats").style.display = "block";
  } else {
    document.getElementById("learningStats").style.display = "none";
  }
});

// function for random testing
function RandomTest() {
  console.log("nothing");
}
