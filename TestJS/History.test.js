const VolunteerManager = require('./History'); // Assuming VolunteerManager class is defined in VolunteerManager.js

describe('VolunteerManager', () => {
    let manager;

    beforeEach(() => {
        manager = new VolunteerManager();
        manager.addVolunteer(1, 'Alice', '2023-01-01', '2023-06-30', 'Excellent performance.');
        manager.addVolunteer(2, 'Bob', '2023-02-15', '2023-08-31', 'Dedicated worker.');
    });

    afterEach(() => {
        manager = null;
    });

    test('addVolunteer should add a new volunteer', () => {
        manager.addVolunteer(3, 'Carol', '2023-03-01', '2023-09-30', 'Highly skilled.');
        expect(manager.getAllVolunteers()).toHaveLength(3);
    });

    test('updateVolunteer should update an existing volunteer', () => {
        manager.updateVolunteer(1, 'Alice Smith', '2023-01-01', '2023-07-15', 'Promoted to team lead.');
        const updatedVolunteer = manager.getVolunteerById(1);
        expect(updatedVolunteer.name).toBe('Alice Smith');
        expect(updatedVolunteer.endDate).toBe('2023-07-15');
    });

    test('deleteVolunteer should delete a volunteer', () => {
        manager.deleteVolunteer(2);
        expect(manager.getAllVolunteers()).toHaveLength(1);
        expect(manager.getVolunteerById(2)).toBeUndefined();
    });

    test('getAllVolunteers should return all volunteers', () => {
        const allVolunteers = manager.getAllVolunteers();
        expect(allVolunteers).toHaveLength(2);
        expect(allVolunteers[0].name).toBe('Alice');
        expect(allVolunteers[1].name).toBe('Bob');
    });

    test('getVolunteerById should return the correct volunteer', () => {
        const volunteer = manager.getVolunteerById(1);
        expect(volunteer.name).toBe('Alice');
    });

    test('updateVolunteer should handle invalid volunteer ID', () => {
        manager.updateVolunteer(99, 'Invalid', '2023-01-01', '2023-07-15', 'Invalid update.');
        expect(console.error).toHaveBeenCalledWith('Volunteer with ID 99 not found.');
    });
});
