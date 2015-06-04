/*global describe, beforeEach, afterEach, it, expect, inject, sinon */
/*jshint expr: true */
(function() {
    'use strict';

    describe('clock.domain.Alarm', function() {

        beforeEach(function() {
            module('clock.domain');
        });

        beforeEach(inject(function($injector) {
            this.Alarm = $injector.get('Alarm');
            this.alarmResource = $injector.get('alarmResource');
            this.$rootScope = $injector.get('$rootScope');

            // Sinon ovverises
            var $q = $injector.get('$q');
            sinon.stub(this.alarmResource, 'list', function() {
                return $q.when(getAlarmsMock());
            });
            sinon.stub(this.alarmResource, 'get', function(id) {
                var alarms = getAlarmsMock();
                var alarm = alarms.filter(function(item) {
                    return item.id === id;
                })[0];
                return $q.when(alarm);
            });
            sinon.stub(this.alarmResource, 'create', $q.when);
            sinon.stub(this.alarmResource, 'update', $q.when);
            sinon.stub(this.alarmResource, 'remove', $q.when);
        }));

        afterEach(function() {
            this.alarmResource.list.restore();
            this.alarmResource.get.restore();
            this.alarmResource.create.restore();
            this.alarmResource.update.restore();
            this.alarmResource.remove.restore();
        });

        describe('all', function() {
            it('should return all alarms', function(done) {
                this.Alarm.all().then(function(alarms) {
                    expect(alarms).to.have.length(5);
                    done();
                });
                this.$rootScope.$digest();
            });
        });

        describe('get', function() {
            it('should find alarm by id', function(done) {
                this.Alarm.get(1111).then(function(alarm) {
                    expect(alarm.id).to.equal(1111);
                    expect(alarm.hours).to.equal(9);
                    expect(alarm.label).to.equal('Notify me!');
                    done();
                });
                this.$rootScope.$digest();
            });

            it('should create new alarm if id = `new`', function(done) {
                this.Alarm.get('new').then(function(alarm) {
                    expect(alarm.id).to.equal(null);
                    expect(alarm.label).to.equal('Alarm');
                    done();
                });
                this.$rootScope.$digest();
            });

            it('should return cached alarm', function(done) {
                var self = this;
                this.Alarm.get(2222)
                    .then(function(alarm) {
                        // Change label
                        alarm.label = 'New Label';
                        return alarm;
                    })
                    .then(this.Alarm.setEditableAlarm)
                    .then(function(a) {
                        // Get the same alarm
                        return self.Alarm.get(2222);
                    })
                    .then(function(alarm) {
                        // Returned Alarm shpuld be from cache
                        expect(alarm.label).to.equal('New Label');
                        done();
                    });

                this.$rootScope.$digest();
            });
        });

        describe('save', function() {
            it('should create new alarm if no ID', function(done) {
                var alarm = {id: null};
                var self = this;
                this.Alarm.save(alarm).then(function() {
                    expect(self.alarmResource.create).to.have.been.called;
                    done();
                });
                this.$rootScope.$digest();
            });

            it('should update alarm', function(done) {
                var alarm = {id: 111};
                var self = this;
                this.Alarm.save(alarm).then(function() {
                    expect(self.alarmResource.update).to.have.been.called;
                    done();
                });
                this.$rootScope.$digest();
            });
        });

        describe('remove', function() {
            it('should remove alarm', function(done) {
                var self = this;
                this.Alarm.remove(777).then(function() {
                    expect(self.alarmResource.remove).to.have.been.called;
                    expect(self.alarmResource.remove).to.have.been.calledWith(777);
                    done();
                });
                this.$rootScope.$digest();
            });
        });

        function getAlarmsMock() {
            return [
                {
                    id: 1111,
                    hours: 9,
                    minutes: 30,
                    label: 'Notify me!',
                    active: true,
                    snooze: true
                },
                {
                    id: 2222,
                    hours: 10,
                    minutes: 30,
                    label: 'Notify me!',
                    active: true,
                    snooze: true
                },
                {
                    id: 3333,
                    hours: 11,
                    minutes: 30,
                    label: 'Notify me!',
                    active: true,
                    snooze: true
                },
                {
                    id: 4444,
                    hours: 12,
                    minutes: 0,
                    label: 'Notify me!',
                    active: true,
                    snooze: true
                },
                {
                    id: 5555,
                    hours: 12,
                    minutes: 30,
                    label: 'Notify me!',
                    active: true,
                    snooze: true
                }
            ];
        }
    });

}).call(this);
