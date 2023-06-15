const list = document.getElementById("list");
const day_view = document.getElementById("day_view");
const week_view = document.getElementById("week_view");
const container = document.getElementById("container");

//////////////////Calender///////////////////////////////////////

//////////////////////////////////////////////////////////////////////

list.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/calender") //mongodb query containing sorted data by startTime
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      container.innerHTML = "";
      const heading = document.createElement("div");
      heading.append();
      data.forEach((item) => {
        const individual = document.createElement("div");
        individual.setAttribute("id", "individual");
        const date = document.createElement("div");
        date.setAttribute("id", "date");
        // date.innerHTML = `${dated[0]},${dated[1] + " " + dated[2]}`;
        date.innerHTML = new Date(item.startTime).toLocaleDateString("en-gb", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "utc",
        });
        const task = document.createElement("div");
        task.setAttribute("id", "task");
        const task_name = document.createElement("div");
        const projectName = document.createElement("div");
        projectName.innerHTML = item.projectName; //take name of project by fetching data using mongodb queries from backend
        const taskName = document.createElement("div");
        taskName.innerHTML = item.taskName;
        task_name.append(projectName, taskName);
        const time = document.createElement("div");
        const start_end = document.createElement("div");
        start_end.setAttribute("id", "start_end");
        const start_time = document.createElement("div");
        console.log(item.startTime);
        console.log(new Date());
        start_time.innerHTML = Intl.DateTimeFormat("en", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(new Date(item.startTime));

        const end_time = document.createElement("div");
        //const end_dated = item.endTime.split(" ");

        end_time.innerHTML = Intl.DateTimeFormat("en", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(new Date(item.endTime));
        start_end.append(start_time, "-", end_time);
        const duration = document.createElement("div");
        duration.innerHTML = item.duration;
        time.append(start_end, duration);
        task.append(task_name, time);
        individual.append(date, task);
        container.append(individual);
      });
    });
});

day_view.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("https://648990d55fa58521caafd6b0.mockapi.io/time") //mongodb query containing sorted data by startTime
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      container.innerHTML = "";

      const hours = [
        "12:00 AM",
        "1:00 AM",
        "2:00 AM",
        "3:00 AM",
        "4:00 AM",
        "5:00 AM",
        "6:00 AM",
        "7:00 AM",
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
        "9:00 PM",
        "10:00 PM",
        "11:00 PM",
      ];

      data.forEach((item) => {
        hours.forEach((hour) => {
          const start_time = Intl.DateTimeFormat("en", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(new Date(item.startTime));
          console.log(start_time);
          console.log(hour);
        });
      });
    });
});
