export default function getUnixTime(time) {
    if (time) {
        const times = time.split(":")
        const hours = times[0]
        const minutes = times[1]

        let currentTime = Date.now()
        let currentYear = new Date(currentTime).getFullYear()
        let currentMonth = new Date(currentTime).getMonth() + 1
        let currentDay = new Date(currentTime).getDate()

        let currentHour = new Date(currentTime).getHours()
        let currentMinute = new Date(currentTime).getMinutes()

        if (String(currentMonth).length == 1){
            currentMonth = "0" + currentMonth
        }

        if (String(currentDay).length == 1){
            currentDay = "0" + currentDay
        }

        if (String(currentHour).length == 1){
            currentHour = "0" + currentHour
        }
        
        if (String(currentMinute).length == 1) {
            currentMinute = '0' + currentMinute
        }



        const formattedCurrentTime = currentHour + ":" + currentMinute

        let dateTime = currentYear + '-' + currentMonth + '-' + currentDay + 'T' + hours + ':' + minutes + ':00'
        let unixTime = Date.parse(dateTime)

        // Takes a day off if it was yesterday
        if (time > formattedCurrentTime) {
            unixTime = unixTime - 86400000
        }

        return unixTime
    } else {
        return null
    }
}