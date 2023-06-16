var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];

var yValues = [55, 49, 44, 24, 45,];
var barColors = ` #8B55DD`;


var today = new Date();

// Calculate the end date (today + 6 days)
var endDate = new Date(today);
endDate.setDate(endDate.getDate() + 6);

// Format the dates in "MM/DD/YYYY" format
var startDateString = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
var endDateString = (endDate.getMonth() + 1) + "/" + endDate.getDate() + "/" + endDate.getFullYear();

// Generate the date range string
var dateRangeString = startDateString + " - " + endDateString;

// Update the HTML element with the date range



console.log(dateRangeString)





let range=document.getElementById("range")
console.log(range)
range.value=dateRangeString
let data=range.value.split("/")
console.log(data)

let startdate=Number(data[1])
let enddate=Number(data[3])
let startmonth=Number(data[0])
let endmonth=data[2].split("-")[1]
console.log(endmonth)

let month=[31,28,31,30,31,30,31,31,30,31,30]


let arr=[]




for(let i=startmonth;i<=endmonth;i++)

{
    let date
    (startmonth==endmonth)?date=enddate:date=month[i-1]
    for(let j=startdate;j<=date;j++)
    {
         arr.push(j+"/"+i)
    }
    startdate=1
   
}


bargraph(arr)


const querystartDate = `${data[2].split("-")[0]}-${data[0]}-${data[1]}`;
const queryendDate = `${data[4]}-${data[2].split("-")[1]}-${data[3]}`;
    

fetch(`http://localhost:9090/timer/data/${querystartDate}/${queryendDate}`)
.then((res)=>{
  return res.json()
})
.then((data)=>{

     appenddata(data)
  console.log(data)
})

   

function bargraph(arr)
{

       
var chartCanvas = document.getElementById("myChart");

Chart.defaults.global.defaultFontStyle  = "Space Grotesk, sans-serif";


// Check if a chart instance already exists
if (chartCanvas.myChart !== undefined) {
  chartCanvas.myChart.destroy();
}

// Create the new chart instance
Chart.defaults.global.defaultFontFamily = "Space Grotesk, sans-serif"; // Set the default font family
Chart.defaults.global.defaultFontSize = 20; 

chartCanvas.myChart = new Chart(chartCanvas, {
  type: "bar",
  data: {
    labels: arr,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
        barPercentage: 0.4,
        categoryPercentage: 0.85,
      },
    ],
  },
  options: {
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
              return value.toString() + "h";
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
            padding: 30,
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
    datasets: [{
      backgroundColor: [`rgb(213, 208, 215)`,`#95899A`],
      data: [70,30]
      
    }]
  },
  options: {
    title: {
      display: true,
      text: ""
    }
  }
});

new Chart("myChart2", {
  type: "doughnut",
  data: {
    // labels: xValues,
    datasets: [{
      backgroundColor: [`rgb(11, 131, 217)`,`rgb(158, 91, 217)`],
      data: [95,12]
    }]
  },
  options: {
    title: {
      display: true,
      text: ""
    }
  }
});


/**date range */




$(function() {
    $('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));

      let month=[31,28,31,30,31,30,31,31,30,31,30]
      let startmonth=Number(start.format('MM'))
      let endmonth=Number(end.format('MM'))
      
      let arr=[]
      console.log(range.value)
      
      let startdate=Number(start.format('DD'))
      let enddate=Number(end.format('DD'))
      
      
      for(let i=startmonth;i<=endmonth;i++)
      
      {
          let date
          (i==endmonth)?date=enddate:date=month[i-1]
          for(let j=startdate;j<=date;j++)
          {
               arr.push(j+"/"+i)
          }
          startdate=1
         
      }
      
      
      bargraph(arr)

      let startdate1= start.format('YYYY-MM-DD')
    let enddate1=end.format('YYYY-MM-DD')

    fetch(`http://localhost:9090/timer/data/${startdate1}/${enddate1}`)
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{

       appenddata(data)
    console.log(data)
  })
      
    });

    

    
  });






  /**table  */

 

  let table=document.getElementById("table")

  function appenddata(data)
  {
    let headingdiv=document.createElement("div")
    headingdiv.classList.add("heading")
    let p=document.createElement("p")
    let p1=document.createElement("p")
    let p2=document.createElement("p")
    let p3=document.createElement("p")

    p.innerText="Title"
    p1.innerText="Duration"
    p2.innerText="Amount"
    p3.innerText="Percentage"

    headingdiv.append(p,p1,p2,p3)
    table.append(headingdiv)

    data.forEach((data)=>{

      let contentdiv=document.createElement("div")
      contentdiv.classList.add("table-content")
      let p1=document.createElement("p")
    let p2=document.createElement("p")
    let p3=document.createElement("p")
    let p4=document.createElement("p")
  
       
    
    p1.innerText=data.task
    p2.innerText=data.totalDuration
    p3.innerText="0"
    p4.innerText="0"

    contentdiv.append(p1,p2,p3,p4)
    table.append(contentdiv)
   
    })
  }
  

  




  // Get the duration value in seconds

