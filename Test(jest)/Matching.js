const volunteers = [
    { name: "John Doe", skills: ["cooking", "serving", "organizing"] },
    { name: "Jane Smith", skills: ["first aid", "teaching", "organizing"] }
];

const events = [
    { name: "Charity Dinner", requiredSkills: ["cooking", "serving"] },
    { name: "First Aid Workshop", requiredSkills: ["first aid", "teaching"] },
    { name: "Community Cleanup", requiredSkills: ["cleaning", "organizing"] }
];

// Function to find the best match for a volunteer
function findBestMatch(volunteer) {
    let bestMatch = null;
    let maxSkillsMatched = 0;

    events.forEach(event => {
        const skillsMatched = event.requiredSkills.filter(skill => volunteer.skills.includes(skill)).length;

        // Check if this event has more matched skills than the current best
        if (skillsMatched > maxSkillsMatched) {
            maxSkillsMatched = skillsMatched;
            bestMatch = event;
        }
    });

    return bestMatch; // Will return the best match or null
}

module.exports = { findBestMatch, volunteers, events };