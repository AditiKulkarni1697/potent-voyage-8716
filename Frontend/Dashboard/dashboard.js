var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];

var yValues = [55, 49, 44, 24, 45];
var barColors = ` #2c3e50`;

/** conversion to different format and units start */

function convertMsToHMS(timeMs) {
  const totalSeconds = Math.floor(timeMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Format the values as strings with leading zeros if necessary
  const hoursStr = String(hours).padStart(2, "0");
  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(seconds).padStart(2, "0");

  // Return the formatted time string
  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

function convertMsToSeconds(timeMs) {
  const totalSeconds = Math.floor(timeMs / 1000);

  return totalSeconds;
}

function convertSecondsToPercentage(seconds) {
  const totalSecondsIn24Hours = 24 * 60 * 60;
  const percentage = (seconds / totalSecondsIn24Hours) * 100;

  return percentage.toFixed(2); // Round to 2 decimal places
}

function calculateAverageDurationPercentage(totalDurationMs, occurrences) {
  const averageDurationMs = totalDurationMs / occurrences;
  const averageDurationMinutes = averageDurationMs / 60000; // Convert to minutes
  const minutesInWholeDay = 24 * 60; // Total minutes in a day
  const percentage = (averageDurationMinutes / minutesInWholeDay) * 100;

  return percentage.toFixed(2); // Round to 2 decimal places
}

function convertMsToHours(durationMs) {
  if (durationMs < 60000) {
    const minutes = durationMs / 60000;
    return minutes.toFixed(2);
  } else {
    const hours = durationMs / 3600000;
    return hours.toFixed(0);
  }
}
function convertMsToMinutes(milliseconds) {
  var minutes = milliseconds / 60000;

  if (minutes < 1) {
    // Convert minutes to points format
    var points = Math.floor(minutes * 100) / 100;
    return points.toFixed(2); // Format to two decimal places
  } else {
    return minutes.toFixed(0); // Format to zero decimal places
  }
}

function getDateRange(startDate, endDate) {
  var dateArray = [];
  var currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    var formattedDate = currentDate.toISOString().slice(0, 10);
    var dateObj = {};
    dateObj[formattedDate] = 0;
    dateArray.push(dateObj);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

/** conversion form different unit end */

var data1 = {
  length: [],
  width: "",
};

/** Bar graph starts */

function bargraph() {
  var chartCanvas = document.getElementById("myChart");

  Chart.defaults.global.defaultFontStyle = `Space Grotesk, sans-serif`;

  console.log(data1.length, data1.width);
  // Check if a chart instance already exists
  if (chartCanvas.myChart !== undefined) {
    chartCanvas.myChart.destroy();
  }

  // Create the new chart instance
  // Set the default font family
  Chart.defaults.global.defaultFontSize = 20;

  Chart.defaults.color = "rgb(44, 19, 56)";

  chartCanvas.myChart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: data1.width,
      datasets: [
        {
          backgroundColor: barColors,
          data: data1.length.map(function (obj) {
            return Object.values(obj)[0];
          }),
          barPercentage: 0.4,
          categoryPercentage: 0.85,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
              weight: "normal",
            },
          },
        },
      },
      layout: {
        padding: {
          left: 20,
          right: 50,
          top: 20,
          bottom: 40, // Increase bottom padding to accommodate y-axis labels
        },
      },
      scales: {
        yAxes: [
          {
            position: "right",
            ticks: {
              fontColor: "rgb(44, 19, 56)",
              fontSize: 20,
              padding: 20,
              beginAtZero: true,
              callback: function (value, index, values) {
                return value.toString() + "min";
              },
              fontWeight: "bold", // Increase font weight
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              fontColor: "rgb(44, 19, 56)",
              padding: 20, // Increase padding for x-axis labels
              fontSize: 20,
              beginAtZero: true,
              fontWeight: "bold", // Increase font weight
            },
          },
        ],
      },
      plugins: {
        datalabels: {
          anchor: "end",
          align: "end",
        },
      },
      legend: { display: false },
      title: {
        display: true,
      },
    },
  });
}

new Chart("myChart1", {
  type: "doughnut",
  data: {
    // labels: xValues,
    datasets: [
      {
        backgroundColor: [`#34495E`, `#34495E`],
        data: [100],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Projects",
    },
  },
});

function avg(content) {
  let value = 100 - content;
  value = value.toFixed(2);

  new Chart("myChart2", {
    type: "doughnut",
    data: {
      labels: [`${content}percent`],
      datasets: [
        {
          backgroundColor: [`#34495E`, `#34495E`],
          data: [content, value],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Average Duration",
      },
    },
  });
}

/**Bar graph ends */

/** date for setting initial stage of  */

var today = new Date();

// Calculate the end date (today + 6 days)
var endDate = new Date(today);
endDate.setDate(endDate.getDate() + 6);

// Format the dates in "MM/DD/YYYY" format
var startDateString =
  today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
var endDateString =
  endDate.getMonth() +
  1 +
  "/" +
  endDate.getDate() +
  "/" +
  endDate.getFullYear();

// Generate the date range string
var dateRangeString = startDateString + " - " + endDateString;

// Update the HTML element with the date range

//** initial date setting for range ends */

/** coding to set the format of x-axis labels start */

let range = document.getElementById("range");
console.log(range);
range.value = dateRangeString;
let data = range.value.split("/");
console.log(data);

let startdate = Number(data[1]);
let enddate = Number(data[3]);
let startmonth = Number(data[0]);
let endmonth = data[2].split("-")[1];
console.log(endmonth);

let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30];

let arr = [];

for (let i = startmonth; i <= endmonth; i++) {
  let date;
  startmonth == endmonth ? (date = enddate) : (date = month[i - 1]);
  for (let j = startdate; j <= date; j++) {
    arr.push(j + "/" + i);
  }
  startdate = 1;
}

/** coding end for labels settings */

data1.width = arr;
bargraph(data1);

/** coding for sending the data in correct format in query */

// Split the date range into start and end dates
const [startDateStr, endDateStr] = dateRangeString.split(" - ");

console.log(startDateStr, endDateStr);

function formatDate(dateString) {
  var dateParts = dateString.split("/");
  var day = dateParts[1];
  var month = dateParts[0];
  var year = dateParts[2];
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}
var formattedStartDate = formatDate(startDateStr);
var formattedEndDate = formatDate(endDateStr);

var dateRangefordata1 = getDateRange(formattedStartDate, formattedEndDate);
data1.length = dateRangefordata1;

/** coding ends for query */

console.log(data1.length, dateRangefordata1);

fetch(
  `https://time-trace-backend.onrender.com/timer/data/${formattedStartDate}/${formattedEndDate}`
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    appenddata(data);
    console.log(data);
  });

/**date range */

/**  coding for changing the data range  */

$(function () {
  $('input[name="daterange"]').daterangepicker(
    {
      opens: "left",
    },
    function (start, end, label) {
      console.log(
        "A new date selection was made: " +
          start.format("YYYY-MM-DD") +
          " to " +
          end.format("YYYY-MM-DD")
      );

      let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30];
      let startmonth = Number(start.format("MM"));
      let endmonth = Number(end.format("MM"));

      let arr = [];
      console.log(range.value);

      let startdate = Number(start.format("DD"));
      let enddate = Number(end.format("DD"));

      for (let i = startmonth; i <= endmonth; i++) {
        let date;
        i == endmonth ? (date = enddate) : (date = month[i - 1]);
        for (let j = startdate; j <= date; j++) {
          arr.push(j + "/" + i);
        }
        startdate = 1;
      }
      data1.width = arr;
      bargraph(data1);
      var dateRangefordata = getDateRange(
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD")
      );
      data1.length = dateRangefordata;

      let startdate1 = start.format("YYYY-MM-DD");
      let enddate1 = end.format("YYYY-MM-DD");

      fetch(
        `https://time-trace-backend.onrender.com/timer/data/${startdate1}/${enddate1}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          appenddata(data);
        });
    }
  );
});

/** coding ended and here all the etching also included  */

/**table  */

let table = document.getElementById("table");
let totalhrs = document.getElementById("durationContainer");

function appenddata(data) {
  let sum = 0;

  table.innerHTML = "";

  let headingdiv = document.createElement("div");
  headingdiv.classList.add("heading");
  let p = document.createElement("p");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let p3 = document.createElement("p");

  p.innerText = "Title";
  p1.innerText = "Duration";
  p2.innerText = "Amount";
  p3.innerText = "Percentage";

  headingdiv.append(p, p1, p2, p3);
  table.append(headingdiv);

  data.forEach((data) => {
    var result = convertMsToMinutes(data.totalDuration);

    for (var m = 0; m < data1.length.length; m++) {
      var obj = data1.length[m];
      var key = Object.keys(obj)[0];

      if (key === data._id) {
        obj[key] = result;
        break; // Stop iterating once the key is found
      }
    }
    console.log(result);
    console.log(data1.length);

    let contentdiv = document.createElement("div");
    contentdiv.classList.add("table-content");

    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let p4 = document.createElement("p");

    p1.innerText = "name";

    // const formattedTime = convertMsToHMS(data.timers[j].duration);
    p2.innerText = "name";

    // const seconds = convertMsToSeconds(data.timers[j].duration);
    // const percentage = convertSecondsToPercentage(seconds);

    p3.innerText = "0";
    p4.innerText = "name";

    contentdiv.append(p1, p2, p3, p4);
    table.append(contentdiv);

    sum += data.totalDuration;
  });
  console.log(sum);
  const formattedTime = convertMsToHMS(sum);
  totalhrs.innerText = formattedTime;

  console.log(data1);
  bargraph(data1);

  const averageDurationPercentage = calculateAverageDurationPercentage(
    sum,
    data.length
  );
  console.log(averageDurationPercentage);

  avg(averageDurationPercentage);
}
