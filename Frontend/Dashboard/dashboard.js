var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];

var yValues = [55, 49, 44, 24, 45,];
var barColors = ` #8B55DD`;


let range=document.getElementById("range")
console.log(range)
let data=range.value.split("/")

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
        categoryPercentage: 0.95,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          position: "right", // Move the y-axis labels to the right
          ticks: {
            fontSize: 20,
            beginAtZero: true,
            callback: function (value, index, values) {
              return value + " " +"h";
            },
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false, // Remove the x-axis grid lines
          },
          ticks: {
            fontSize: 20,
            beginAtZero: true,
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
      text: "World Wide Wine Production"
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
      
    });
  });






  /**table  */

  fetch("http://localhost:4500/user")
  .then((res)=>{
    return res.json()
  })
  .then((data)=>{

    appenddata(data)
    console.log(data)
  })

  let table=document.getElementById("table")

  function appenddata(data)
  {
    let tr=document.createElement("tr")
    let td1=document.createElement("td")
    let td2=document.createElement("td")
    let td3=document.createElement("td")
    let td4=document.createElement("td")
    td1.innerText="Title"
    td2.innerText="Duration"
    td3.innerText="Amount"
    td4.innerText="Percentage"

    tr.append(td1,td2,td3,td4)
    table.append(tr)

    data.forEach((data)=>{
      let tr1=document.createElement("tr")
    let td5=document.createElement("td")
    let td6=document.createElement("td")
       
    console.log(data.title)
    td5.innerText=data.title
    td6.innerText=data.duration

    tr1.append(td5,td6)
    table.append(tr1)
   
    })
  }