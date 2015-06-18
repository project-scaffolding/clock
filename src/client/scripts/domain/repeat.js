(function(angular) {
    'use strict';

    angular
        .module('clock.domain')
        .factory('Repeat', RepeatProvider);

    /* @ngInject */
    function RepeatProvider($q, RepeatEntity, repeatResource) {

        var Repeat = {
            all: all,
            label: label,
            select: select
        };

        return Repeat;

        function all() {
            return $q.when()
                .then(repeatResource.list)
                .then(createRepeats);
        }

        function select(ids) {
            return all().then(function(repeats) {
                return repeats.map(function(repeat) {
                    var isActive = ids.indexOf(repeat.weekDay) !== -1;
                    repeat.active = isActive;
                    return repeat;
                });
            });
        }

        function label(repeats) {
            function active(repeat) {
                return repeat.active;
            }

            repeats = repeats.filter(active);

            if (isNever(repeats)) {
                return 'Never';
            }

            if (isOneDay(repeats)) {
                return repeats[0].name;
            }

            if (isWeekdays(repeats)) {
                return 'Weekdays';
            }

            if (isWeekends(repeats)) {
                return 'Weekends';
            }

            if (isEveryDay(repeats)) {
                return 'Every day';
            }

            var weekDayMap = {
                1: 'Mon',
                2: 'Tue',
                3: 'Wed',
                4: 'Thu',
                5: 'Fri',
                6: 'Sat',
                7: 'Sun'
            };

            return repeats.map(function(repeat) {
                return weekDayMap[repeat.weekDay];
            }).join(' ');

        }

        function createRepeats(repeats) {
            repeats = repeats.map(RepeatEntity.createRepeat);
            return $q.all(repeats);
        }

        function isNever(repeats) {
            return repeats.length === 0;
        }

        function isOneDay(repeats) {
            return repeats.length === 1;
        }

        function isWeekdays(repeats) {
            var weekdays = [1, 2, 3, 4, 5];

            var selectedRepeats = repeats.filter(function(repeat) {
                return weekdays.indexOf(repeat.weekDay) !== -1;
            });

            return selectedRepeats.length === 5 && repeats.length === 5;
        }

        function isWeekends(repeats) {
            var weekdays = [6, 7];

            var selectedRepeats = repeats.filter(function(repeat) {
                return weekdays.indexOf(repeat.weekDay) !== -1;
            });

            return selectedRepeats.length === 2 && repeats.length === 2;
        }

        function isEveryDay(repeats) {
            return repeats.length === 7;
        }

    }

}).call(this, angular);
