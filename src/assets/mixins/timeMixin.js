var moment = require('moment');

export default {
    data() {
        return {
            weekDays: [
                'Pondelok',
                'Utorok',
                'Streda',
                'Štvrtok',
                'Piatok',
                'Sobota',
                'Nedeľa'
            ],
            weekDaysEn: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ]
        }
    },
    computed: {
        getCurrentWeek: function() {
            let currentDate = moment()
        
            let weekStart = currentDate.clone().startOf('isoWeek')
            let weekEnd = currentDate.clone().endOf('isoWeek')
        
            let days = []
        
            for (let i = 0; i <= 6; i++) {
                days.push(moment(weekStart).add(i, 'days').format("YYYY-MM-DD"))
            }
            
            return days
        }
    },
    methods: {
        getWeekStart: function(format) {
            let currentDate = moment()

            if(typeof format == 'undefined')
                format = 'YYYY-MM-DD'

            let weekStart = currentDate.startOf('isoWeek').format(format)

            return weekStart
        },
        getWeekEnd: function(format) {
            let currentDate = moment()

            if(typeof format == 'undefined')
                format = 'YYYY-MM-DD'

            let weekStart = currentDate.endOf('isoWeek').format(format)

            return weekStart
        },
        getWeekRange: function(format) {
            if(typeof format == 'undefined')
                format = 'YYYY-MM-DD'

            let start = this.getWeekStart(format)
            let end = this.getWeekEnd(format)

            return start + ' - ' + end
        }
    }
}