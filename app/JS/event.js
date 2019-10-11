function editEvent(event) {
  $('#event-modal input[name="event-index"]').val(event ? event.id : '');
  $('#event-modal input[name="event-name"]').val(event ? event.name : '');
  $('#event-modal input[name="event-location"]').val(event ? event.location : '');
  $('#event-modal input[name="event-start-date"]').datepicker('update', event ? event.startDate : '');
  $('#event-modal input[name="event-end-date"]').datepicker('update', event ? event.endDate : '');
  $('#event-modal').modal();
}

function deleteEvent(event) {
  var dataSource = $('#calendar').data('calendar').getDataSource();

  for(var i in dataSource) {
    if(dataSource[i].id == event.id) {
      dataSource.splice(i, 1);
      break;
    }
  }

  $('#calendar').data('calendar').setDataSource(dataSource);
}

function saveEvent() {
  var event = {
    id: $('#event-modal input[name="event-index"]').val(),
    name: $('#event-modal input[name="event-name"]').val(),
    location: $('#event-modal input[name="event-location"]').val(),
    startDate: $('#event-modal input[name="event-start-date"]').datepicker('getDate'),
    endDate: $('#event-modal input[name="event-end-date"]').datepicker('getDate')
  }

  var dataSource = $('#calendar').data('calendar').getDataSource();

  if(event.id) {
    for(var i in dataSource) {
      if(dataSource[i].id == event.id) {
        dataSource[i].name = event.name;
        dataSource[i].location = event.location;
        dataSource[i].startDate = event.startDate;
        dataSource[i].endDate = event.endDate;
      }
    }
  }
  else
  {
    var newId = 0;
    for(var i in dataSource) {
      if(dataSource[i].id > newId) {
        newId = dataSource[i].id;
      }
    }

    newId++;
    event.id = newId;

    dataSource.push(event);
  }

  $('#calendar').data('calendar').setDataSource(dataSource);
  $('#event-modal').modal('hide');
}

$(function() {
  var currentYear = new Date().getFullYear();

  $('#calendar').calendar({
    enableContextMenu: true,
    enableRangeSelection: true,
    contextMenuItems:[
    {
      text: 'Update',
      click: editEvent
    },
    {
      text: 'Delete',
      click: deleteEvent
    }
    ],
    selectRange: function(e) {
      editEvent({ startDate: e.startDate, endDate: e.endDate });
    },
    mouseOnDay: function(e) {
      if(e.events.length > 0) {
        var content = '';

        for(var i in e.events) {
          content += '<div class="event-tooltip-content">'
            + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
            + '<div class="event-location">' + e.events[i].location + '</div>'
            + '</div>';
          }

          $(e.element).popover({
            trigger: 'manual',
            container: 'body',
            html:true,
            content: content
          });

          $(e.element).popover('show');
        }
      },
      mouseOutDay: function(e) {
        if(e.events.length > 0) {
          $(e.element).popover('hide');
        }
      },
      dayContextMenu: function(e) {
        $(e.element).popover('hide');
      },
      dataSource: [
      {
        id: 0,
        name: 'Mens Soccer at Princeton',
        location: 'U.A.',
        startDate: new Date(currentYear, 8, 3),
        endDate: new Date(currentYear, 8, 3)
      },
      {
        id: 1,
        name: 'Mens Hockey at Maine',
        location: 'TBA',
        startDate: new Date(currentYear,  2, 16),
        endDate: new Date(currentYear, 2, 16)
      },
      {
        id: 2,
        name: 'Womens Hockey at UCONN',
        location: 'U.A.',
        startDate: new Date(currentYear, 3, 29),
        endDate: new Date(currentYear, 3, 29)
      },
      {
        id: 3,
        name: 'Mens Hockey vs Princeton',
        location: 'U.A. Gym',
        startDate: new Date(currentYear, 8, 1),
        endDate: new Date(currentYear, 8, 1)
      },
      {
        id: 4,
        name: 'Womens Hockey vs Colgate',
        location: 'U.A. Gym',
        startDate: new Date(currentYear, 8, 9),
        endDate: new Date(currentYear, 8, 9)
      },
      {
        id: 5,
        name: 'Mens Hockey vs Boston College',
        location: 'Dorms',
        startDate: new Date(currentYear, 10, 12),
        endDate: new Date(currentYear, 10, 12)
      },
      {
        id: 6,
        name: 'Mens Soccer vs Boston College',
        location: 'TBA',
        startDate: new Date(currentYear, 2, 25),
        endDate: new Date(currentYear, 2, 25)
      },
      ]
    });

    $('#save-event').click(function() {
      saveEvent();
    });
  });