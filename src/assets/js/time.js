var moment = require('moment');

export default {
    getCurrentWeek: function() {
        let currentDate = moment()
        let weekStart = currentDate.clone().startOf('isoWeek')
        let days = []
    
        for (let i = 0; i <= 4; i++) {
            days.push(moment(weekStart).add(i, 'days').format("YYYY-MM-DD"))
        }
        
        return days
    },

    getWeekStart: function(format) {
        let currentDate = moment()

        if(typeof format == 'undefined')
            format = 'YYYY-MM-DD'

        return currentDate.startOf('isoWeek').format(format)
    },
    getWeekEnd: function(format) {
        let currentDate = moment()

        if(typeof format == 'undefined')
            format = 'YYYY-MM-DD'

        // let weekEnd = currentDate.endOf('isoWeek').format(format)
        return currentDate.weekday(5).format(format)
    },
    getWeekRange: function(format) {
        if(typeof format == 'undefined')
            format = 'YYYY-MM-DD'

        let start = this.getWeekStart(format)
        let end = this.getWeekEnd(format)

        return start + ' - ' + end
    },
    isPassedDate: function(date) {
        return moment().isAfter(date)
    },
    formatDate: function(date, format) {
        if(typeof format == 'undefined')
            format = 'DD.MM.YYYY'

        return moment(date).format(format)
    }
}