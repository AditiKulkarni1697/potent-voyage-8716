document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "timeGridWeek",
    headerToolbar: {
      left: "prev,next",
      center: "title",
      right: "listWeek,timeGridWeek,timeGridDay,dayGridMonth",
    },
    //events: "http://localhost:3300/calender/isActive", //have more events with diff colors
    eventSources: [
      // your event source
      {
        url: "http://localhost:3300/calender/isActive", // use the `url` property
        color: "green", // an option!
        textColor: "black", // an option!
      },
      {
        url: "http://localhost:3300/calender/isNotActive", // use the `url` property
        color: "red", // an option!
        textColor: "black", // an option!
      },

      // any other sources...
    ],
  });

  calendar.render();
});
