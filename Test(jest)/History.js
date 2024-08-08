// History.js

class VolunteerHistory {
    constructor() {
        this.history = {}; // Holds volunteer history: { volunteerId: [eventIds] }
    }

    // Add an event to a volunteer's history
    addEvent(volunteerId, eventId) {
        if (!this.history[volunteerId]) {
            this.history[volunteerId] = [];
        }
        if (!this.history[volunteerId].includes(eventId)) {
            this.history[volunteerId].push(eventId);
        }
    }

    // Get a volunteer's event history
    getHistory(volunteerId) {
        return this.history[volunteerId] || [];
    }

    // Clear all history (useful for tests)
    clearHistory() {
        this.history = {};
    }
}

module.exports = VolunteerHistory;
