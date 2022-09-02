import { gapi } from 'gapi-script'

export const getEvents = (calendarID, apiKey) => {
  function initiate() {
    gapi.client
      .init({
        apiKey: apiKey
      })

      .then(function () {
        return gapi.client.request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`
        })
      })

      .then(
        response => {
          let events = response.result.items
          return events
        },
        function (err) {
          return [false, err]
        }
      )
  }

  gapi.load('client', initiate)
}
