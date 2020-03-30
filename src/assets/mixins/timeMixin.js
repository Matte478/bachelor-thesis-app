import time from '../js/time'

export default {
    data() {
        return {
            weekDays: [
                'Pondelok',
                'Utorok',
                'Streda',
                'Štvrtok',
                'Piatok',
                // 'Sobota',
                // 'Nedeľa'
            ],
            weekDaysEn: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                // 'Saturday',
                // 'Sunday'
            ]
        }
    },
    computed: {
        getCurrentWeek: function() {
            return time.getCurrentWeek()
        }
    },
    methods: {
        getWeekStart: function(format) {
           return time.getWeekStart(format);
        },
        getWeekEnd: function(format) {
           return time.getWeekEnd(format)
        },
        getWeekRange: function(format) {
            return time.getWeekRange(format)
        },
        getToday: function(format) {
            return time.getToday(format)
        },
        isPassedDate: function(date) {
            return time.isPassedDate(date)
        },
        formatDate: function(date, format) {
            return time.formatDate(date, format)
        }
    }
}