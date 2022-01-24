class Sporter {
  constructor(firstName, lastName, log) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.log = [];
  }
  train(sport, distance, time) {
    this.log.push(new Log(sport, distance, time));
  }
  getTotalDistance() {
    return this.log.reduce((acc, logObject) => acc + logObject.distance, 0);
  }

  getTotalDistanceSport(sport) {
    let getTotalDistance = 0;
    this.log.forEach((logObject) => {
      if (logObject.sport === sport) {
        getTotalDistance += logObject.distance;
      }
    });
    return getTotalDistance;
  }
  getLongestDistance(sport) {
    let longestDistance = 0;
    this.log.forEach((logObject) => {
      if (logObject.sport === sport) {
        if (logObject.distance > longestDistance) {
          longestDistance = logObject.distance;
        }
      }
    });
    return longestDistance;
  }
  calculateTotalMinutes(sport) {
    let totalMinutes = 0;
    this.log.forEach((logObject) => {
      if (logObject.sport === sport) {
        totalMinutes += logObject.time;
      }
    });
    return totalMinutes;
  }
  calculateAVGSpeed(sport) {
    return this.getTotalDistance(sport) / this.calculateTotalMinutes(sport);
  }
}

class Log {
  constructor(sport, distance, time) {
    this.sport = sport;
    this.distance = distance; // (KMS)
    this.time = time; // (MINUTEN)
  }
}

//const Jos = new Sporter("Jos","Janssens");
//Jos.train("lopen",5,20); => hij krijgt automatisch dit in zijn log

// generate 5000 sporters
// every Sporter should have between 500 and 1000 logs

const allSporters = [];
let nrOfSporters = 5000;

const getRandomStr = (nr) => Math.random().toString(32).substr(2, nr);
const getRandomInRange = (firstNumber, lastNumber) =>
  Math.floor(Math.random() * (lastNumber - firstNumber) + firstNumber);

while (nrOfSporters--) {
  const sporter = new Sporter("fn-" + getRandomStr(5), "ln-" + getRandomStr(5));
  let nrOfLogs = getRandomInRange(500, 1000);
  let distance = 0;
  let time = 0;
  while (nrOfLogs--) {
    const sport = ["zwemmen", "fietsen", "lopen"][
      Math.floor(Math.random() * 3)
    ];
    switch (sport) {
      // zwemmen => 2 a 3 km, 60 a 140 mins
      // fietsen => 75 a 200 km, 180 a 320 mins
      // lopen => 5 a 20 km , 25 a 120 mins
      case "zwemmen":
        distance = getRandomInRange(2, 4);
        time = getRandomInRange(60, 140);
        break;
      case "fietsen":
        distance = getRandomInRange(75, 200);
        time = getRandomInRange(180, 320);
        break;
      case "lopen":
        distance = getRandomInRange(5, 20);
        time = getRandomInRange(25, 120);
        break;
    }
    sporter.train(sport, distance, time);
  }
  allSporters.push(sporter);
}

//1) + sum of all sports kms => Calculate the total distance of all traininglogs of all people
//console.log(allSporters[0].getTotalDistance());
function getTotalDistanceAllPeople(allSporters) {
  let sum = 0;
  allSporters.forEach((sporter) => {
    sum += sporter.getTotalDistance();
  });
  return sum;
}

// 2) + person with the longest total swimming distance => search for the first-name, last-name and age of the guy that did the longest total swimdistance

//console.log(allSporters[0].getTotalDistanceSport("zwemmen"));
let longestDistance = 0;
function getBestSumDistance(allSporters, sport) {
  allSporters.forEach((sporter) => {
    if (sporter.getTotalDistanceSport(sport) > longestDistance) {
      longestDistance = sporter.getTotalDistanceSport(sport);
    }
  });
  return longestDistance;
}

//console.log(getBestSumDistance(allSporters, "zwemmen"));

// 3) + person with the longest swim distance log => find the guy with the biggest single distance swimtraining
function getBiggestSingleDistance(allSporters, sport) {
  let i = 0;
  let longestDistance = 0;
  let sporterName = "";
  allSporters.forEach((sporter) => {
    if (sporter.getLongestDistance(sport) > longestDistance) {
      sporterName = `${allSporters[i].firstName} ${allSporters[i].lastName}`;
    }
    i++;
  });
  return sporterName;
}

//console.log(getBiggestSingleDistance(allSporters, "zwemmen"));

// 4) + sum of all running km of all sporters => Calculate the total running distance of all traininglogs of all people
function getSumDistance(allSporters, sport) {
  let sumDistance = 0;
  allSporters.forEach((sporter) => {
    sumDistance += sporter.getTotalDistanceSport(sport);
  });
  return sumDistance;
}

//console.log(getSumDistance(allSporters, "lopen"));

// 5) + average running speed of all sporters => Calculate avg-speed of all running of all people in all logs
//console.log(allSporters[0].calculateAVGSpeed("lopen"));

function getSumMinutes(allSporters, sport) {
  let sumMinutes = 0;
  allSporters.forEach((sporter) => {
    sumMinutes += sporter.calculateTotalMinutes(sport);
  });
  return sumMinutes;
}

function avgSpeedAllRunners(allSporters, sport) {
  let sumDistance = getSumDistance(allSporters, sport);
  let sumMinutes = getSumMinutes(allSporters, sport);
  return sumDistance / sumMinutes;
}
//console.log(avgSpeedAllRunners(allSporters, "lopen"));

// 6a) - getHighest cycling-avg value

//console.log(avgSpeedAllRunners(allSporters, "fietsen"));

// 6b) - fastest average cycler => Find the guy that is the fastest cycler returning its name and its avg km/h
function getFastestAverageCycler(allSporters, sport) {
  let i = 0;
  let bestAvgSpeed = 0;
  let sporterName = "";
  allSporters.forEach((sporter) => {
    if (sporter.calculateAVGSpeed(sport) > bestAvgSpeed) {
      sporterName = `${allSporters[i].firstName} ${allSporters[i].lastName}`;
      bestAvgSpeed = sporter.calculateAVGSpeed(sport);
    }
    i++;
  });
  bestAvgSpeed *= 60;
  return `${sporterName}: ${bestAvgSpeed} km/h`;
}

console.log(getFastestAverageCycler(allSporters, "fietsen"));

// SOME TIPS
// put calculations of persons in the prototype as methods in the class.
// - calculateTotalDistance() => optional parameter to filter on sporttype
// - calculateTotalMinutes() => optional parameter to filter on sporttype
// - calculateAVGSpeed() => this makes use of the previous methods

// Certainly the function to calculate the total distances.
// => make a method that accepts an optional parameter with the sport which you want the total kms off.
// Never use arrow-functions in prototype if they make use of the this-keyword
