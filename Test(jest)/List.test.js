// List.test.js
const { JSDOM } = require('jsdom');
const { expect } = require('@jest/globals');
const { displayVolunteers } = require('./List.js'); // Adjust the path to your file

// Mock the DOM
beforeEach(() => {
    document.body.innerHTML = `
        <div id="volunteer-list"></div>
    `;
});

describe('displayVolunteers', () => {
    test('should render the correct number of volunteers', () => {
        const volunteers = [
            { name: 'Alice', email: 'alice@example.com', skills: ['JavaScript', 'HTML'], status: 'Active' },
            { name: 'Bob', email: 'bob@example.com', skills: ['CSS', 'JavaScript'], status: 'Inactive' }
        ];

        displayVolunteers(volunteers);

        const volunteerItems = document.querySelectorAll('.volunteer-item');
        expect(volunteerItems.length).toBe(volunteers.length);
    });

    test('should correctly display volunteer details', () => {
        const volunteers = [
            { name: 'Alice', email: 'alice@example.com', skills: ['JavaScript', 'HTML'], status: 'Active' }
        ];

        displayVolunteers(volunteers);

        const volunteerItem = document.querySelector('.volunteer-item');
        expect(volunteerItem.innerHTML).toContain('Name: Alice');
        expect(volunteerItem.innerHTML).toContain('Email: alice@example.com');
        expect(volunteerItem.innerHTML).toContain('Skills: JavaScript, HTML');
        expect(volunteerItem.innerHTML).toContain('Status: Active');
    });

    test('should clear previous volunteers before rendering new ones', () => {
        let volunteers = [
            { name: 'Alice', email: 'alice@example.com', skills: ['JavaScript', 'HTML'], status: 'Active' }
        ];

        displayVolunteers(volunteers);
        expect(document.querySelectorAll('.volunteer-item').length).toBe(1);

        volunteers = [
            { name: 'Bob', email: 'bob@example.com', skills: ['CSS', 'JavaScript'], status: 'Inactive' }
        ];

        displayVolunteers(volunteers);
        expect(document.querySelectorAll('.volunteer-item').length).toBe(1);
        expect(document.querySelector('.volunteer-item').innerHTML).toContain('Name: Bob');
    });
});
