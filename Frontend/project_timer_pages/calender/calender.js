const list = document.getElementById("list");
const day_view = document.getElementById("day_view");
const week_view = document.getElementById("week_view");
const container = document.getElementById("container");

list.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("https://648990d55fa58521caafd6b0.mockapi.io/time") //mongodb query containing sorted data by startTime
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
        const projectID = document.createElement("div");
        projectID.innerHTML = item.ProjectID; //take name of project by fetching data using mongodb queries from backend
        const taskID = document.createElement("div");
        taskID.innerHTML = item.taskID;
        task_name.append(projectID, taskID);
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
        "01:00 AM",
        "02:00 AM",
        "03:00 AM",
        "04:00 AM",
        "05:00 AM",
        "06:00 AM",
        "07:00 AM",
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM",
        "08:00 PM",
        "08:00 PM",
        "09:00 PM",
        "10:00 PM",
        "11:00 PM",
      ];
    });
});
