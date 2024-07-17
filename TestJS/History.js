class Volunteer {
    constructor(id, name, startDate, endDate, notes) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes;
    }
}

class VolunteerManager {
    constructor() {
        this.volunteers = []; // Array to store volunteer records
    }

    // Function to add a new volunteer record
    addVolunteer(id, name, startDate, endDate, notes) {
        const newVolunteer = new Volunteer(id, name, startDate, endDate, notes);
        this.volunteers.push(newVolunteer);
    }

    // Function to update an existing volunteer record
    updateVolunteer(id, name, startDate, endDate, notes) {
        const volunteerToUpdate = this.volunteers.find(vol => vol.id === id);
        if (volunteerToUpdate) {
            volunteerToUpdate.name = name;
            volunteerToUpdate.startDate = startDate;
            volunteerToUpdate.endDate = endDate;
            volunteerToUpdate.notes = notes;
        } else {
            console.error(`Volunteer with ID ${id} not found.`);
        }
    }

    // Function to delete a volunteer record
    deleteVolunteer(id) {
        this.volunteers = this.volunteers.filter(vol => vol.id !== id);
    }

    // Function to get all volunteer records
    getAllVolunteers() {
        return this.volunteers;
    }

    // Function to get a specific volunteer record by ID
    getVolunteerById(id) {
        return this.volunteers.find(vol => vol.id === id);
    }
}
