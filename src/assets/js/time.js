var moment = require('moment')
moment.locale('sk')

export default {
    getCurrentWeek: function() {
        let currentDate = moment()
        // let weekStart = currentDate.clone().startOf('isoWeek')
        let weekStart = this.getWeekStart()
        let days = []
    
        for (let i = 0; i <= 4; i++) {
            days.push(moment(weekStart).add(i, 'days').format("YYYY-MM-DD"))
        }
        
        return days
    },

    getWeekStart: function(format) {
        let currentDate = moment()
        let today = currentDate.isoWeekday()

        if(typeof format == 'undefined')
            format = 'YYYY-MM-DD'

        // check if today is weekend
        // if yes, I want to return next monday
        // so I add one week to curent date
        if(today > 5)
            currentDate.add(1, 'weeks')

        return currentDate.startOf('isoWeek').format(format)
    },
    getWeekEnd: function(format) {
        let currentDate = moment()
        let today = currentDate.isoWeekday()

        if(typeof format == 'undefined')
            format = 'YYYY-MM-DD'

        // check if today is weekend
        // if yes, I want to return next friday
        // so I add one week to curent date
        if(today > 5)
            currentDate.add(1, 'weeks')

        return currentDate.weekday(5).format(format)
    },
    getWeekRange: function(format) {
        if(typeof format == 'undefined')
            format = 'YYYY-MM-DD'

        let start = this.getWeekStart(format)
        let end = this.getWeekEnd(format)

        return start + ' - ' + end
    },
    getToday: function(format) {
        if(typeof format == 'undefined')
            format = 'YYYY-MM-DD' 
        
        return moment().format(format)
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