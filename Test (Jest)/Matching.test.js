const { findBestMatch, volunteers } = require('./Matching');

describe('findBestMatch', () => {
    test('matches John Doe to Charity Dinner', () => {
        const volunteer = volunteers[0]; // John Doe
        const matchedEvent = findBestMatch(volunteer);
        expect(matchedEvent.name).toBe("Charity Dinner");
    });

    test('matches Jane Smith to First Aid Workshop', () => {
        const volunteer = volunteers[1]; // Jane Smith
        const matchedEvent = findBestMatch(volunteer);
        expect(matchedEvent.name).toBe("First Aid Workshop");
    });

    test('returns null for a volunteer with no matching skills', () => {
        const volunteer = { name: "Bob Brown", skills: ["writing", "drawing"] };
        const matchedEvent = findBestMatch(volunteer);
        expect(matchedEvent).toBeNull();
    });
});


