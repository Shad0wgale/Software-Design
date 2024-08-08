// History.test.js

const VolunteerHistory = require('./History');

describe('VolunteerHistory', () => {
    let history;

    beforeEach(() => {
        history = new VolunteerHistory();
    });

    test('should add an event to a volunteer\'s history', () => {
        history.addEvent('volunteer1', 'event1');
        expect(history.getHistory('volunteer1')).toContain('event1');
    });

    test('should not add duplicate events', () => {
        history.addEvent('volunteer1', 'event1');
        history.addEvent('volunteer1', 'event1');
        expect(history.getHistory('volunteer1').length).toBe(1);
    });

    test('should retrieve an empty history for a volunteer with no events', () => {
        expect(history.getHistory('volunteer2')).toEqual([]);
    });

    test('should add events for multiple volunteers', () => {
        history.addEvent('volunteer1', 'event1');
        history.addEvent('volunteer2', 'event2');
        expect(history.getHistory('volunteer1')).toContain('event1');
        expect(history.getHistory('volunteer2')).toContain('event2');
    });

    test('should clear all history', () => {
        history.addEvent('volunteer1', 'event1');
        history.clearHistory();
        expect(history.getHistory('volunteer1')).toEqual([]);
    });
});
