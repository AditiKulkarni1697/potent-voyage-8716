document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "timeGridWeek",
    headerToolbar: {
      left: "prev,next",
      center: "title",
      right: "listWeek,timeGridWeek,timeGridDay,dayGridMonth",
    },
    //events: "https://time-trace-backend.onrender.com/calender/isActive", //have more events with diff colors
    eventSources: [
      // your event source
      {
        url: "https://time-trace-backend.onrender.com/calender/isActive", // use the `url` property
        color: "green", // an option!
        textColor: "black", // an option!
      },
      {
        url: "https://time-trace-backend.onrender.com/calender/isNotActive", // use the `url` property
        color: "red", // an option!
        textColor: "black", // an option!
      },

      // any other sources...
    ],
  });

  calendar.render();
});
