// create a new NeuralNetwork
const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

document.addEventListener("DOMContentLoaded", () => {
  console.log("Doc Loaded !!!");
  // clean textarea that displays the training data
  // document.getElementById("fileContent").innerHTML = "";
  // clean textarea that displays the training stats
  // document.getElementById("learningStatsText").innerHTML = "";
  // clean textarea that displays the output
  // document.getElementById("queryOutPut").innerHTML = "";
});

function GetTrainingFiles() {
  // get raw data
  const userData = all_user_data_const;

  //  create user trainingdata
  const userTrainingData = {};

  // populate user training data
  userData.forEach((data, index) => {
    userTrainingData[index + "_user" + "@gmail_com"] = data;
  });

  return userTrainingData;
}

function StartTraining() {
  // clean textarea that displays the trainingdata
  document.getElementById("fileContent").innerHTML = "";

  // get userTrainingData
  const userTrainingData = GetTrainingFiles();

  // create and populate trainingdata
  const trainingData = [];
  for (let input_data in userTrainingData) {
    // get output
    const output_data = JSON.stringify(userTrainingData[input_data]);

    // show user
    document.getElementById("fileContent").innerHTML +=
      "input: { [" +
      input_data +
      "]: 1 },\noutput: { [" +
      JSON.stringify(output_data) +
      "]: 1 },\n\n";

    // push data
    trainingData.push({
      input: { [input_data]: 1 },
      output: { [JSON.stringify(output_data)]: 1 },
    });
  }

  // stats
  document.getElementById("learningStatsText").innerHTML = "";

  // train the NeuralNetwork
  var i = 0;
  var log = "";
  const stats = net.train(trainingData, {
    callback: (e) => {
      i++;
      log +=
        "(" +
        i +
        ") error: " +
        e.error +
        "\n    iterations: " +
        e.iterations +
        "\n\n";
    },
  });
  document.getElementById("learningStatsText").innerHTML +=
    "NUMBER OF ITERATION TIMES:" + i + "\n\n";
  document.getElementById("learningStatsText").innerHTML += log;
}

// function to get an output from the NeuralNetwork
function getUserData(input_data) {
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

// function to show training stats
document.getElementById("showStatsPrompt").addEventListener("click", (e) => {
  if (e.target.checked === true) {
    document.getElementById("learningStats").style.display = "block";
  } else {
    document.getElementById("learningStats").style.display = "none";
  }
});

function ShowStatsPrompt(e) {
  console.log(e);
}

// function to show the output of queried data
function QueryData() {
  const queryStr = document.getElementById("txtQuestion").value;
  if (net.outputLayer !== -1) {
    if (queryStr.length !== 0) {
      document.getElementById("queryOutPut").innerHTML = getUserData(queryStr);
    } else {
      document.getElementById("queryOutPut").innerHTML =
        "////////////////////////////\n\nQUERY STRING CAN'T BE EMTPTY";
    }
  } else {
    document.getElementById("queryOutPut").innerHTML =
      "////////////////////////////\n\nMODEL HAS TO BE TRAINED FIRST";
  }
}

// fucntion to switch between tabs on the site
function SwitchTabs(whereTo) {
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

// function for random testing
function RandomTest() {
  console.log("nothing");
}

// output from the NeuralNetwork
// console.log(
//   "%c" + getUserData("One").toString(),
//   "background: #222; color: #AAFF00"
// );

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
