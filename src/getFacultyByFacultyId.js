const fs = require('fs').promises;

const filePath = "../data/faculty.json"; // Adjust this path as needed

async function getCoordinatorData() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading or parsing JSON file:', err);
        return null; 
    }
}

async function getFacultyByFacultyId(facultyId) {
    const data = await getCoordinatorData();

    if (!data) {
        throw new Error('No data found.'); 
    }

    const coordinator = data.find(coord => coord.employeeCode === facultyId);
    return coordinator || null; 
}

module.exports = {
    getFacultyByFacultyId
};