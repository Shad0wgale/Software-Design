// Import the function to be tested
const { JSDOM } = require('jsdom');
const { expect } = require('@jest/globals');
const { displayAvailableEvents } = require('./Event.js'); // Adjust the path to your file
// displayAvailableEvents.test.js
beforeEach(() => {
    document.body.innerHTML = `
        <div id="available-events-list"></div>
    `;
});

describe('displayAvailableEvents', () => {
    test('should render the correct number of events', () => {
        const events = [
            { eventName: 'Beach Cleanup', date: '2024-08-15', location: 'Santa Monica Beach' },
            { eventName: 'Food Drive', date: '2024-08-20', location: 'Downtown LA' },
            { eventName: 'Park Restoration', date: '2024-08-25', location: 'Griffith Park' }
        ];

        displayAvailableEvents(events);

        const eventItems = document.querySelectorAll('.event-item');
        expect(eventItems.length).toBe(events.length);
    });

    test('should correctly set the event details in the checkbox and label', () => {
        const events = [
            { eventName: 'Beach Cleanup', date: '2024-08-15', location: 'Santa Monica Beach' }
        ];

        displayAvailableEvents(events);

        const checkbox = document.querySelector(`#event-0`);
        const label = document.querySelector(`label[for="event-0"]`);

        expect(checkbox.value).toBe(events[0].eventName);
        expect(label.textContent).toBe('Beach Cleanup - 2024-08-15 - Santa Monica Beach');
    });

    test('should clear previous events before rendering new ones', () => {
        let events = [
            { eventName: 'Beach Cleanup', date: '2024-08-15', location: 'Santa Monica Beach' }
        ];

        displayAvailableEvents(events);
        expect(document.querySelectorAll('.event-item').length).toBe(1);

        events = [
            { eventName: 'Food Drive', date: '2024-08-20', location: 'Downtown LA' },
            { eventName: 'Park Restoration', date: '2024-08-25', location: 'Griffith Park' }
        ];

        displayAvailableEvents(events);
        expect(document.querySelectorAll('.event-item').length).toBe(2);
    });
});