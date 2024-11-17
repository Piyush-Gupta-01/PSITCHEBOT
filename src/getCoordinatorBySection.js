const fs = require('fs').promises;

const filePath = "../data/faculty.json";

async function getCoordinatorData() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading or parsing JSON file:', err);
    }
}

async function getCoordinatorBySection(section) {
    const data = await getCoordinatorData();

    if (!data) {
        console.error('No data found.');
        return 'No data found.';
    }

    console.log('Available data:', data);
    console.log('Searching for section:', section); 

    const coordinator = data.find(coord => coord.section.trim() === section.trim());
    if (!coordinator) {
        console.error('Section not found:', section);
    }
    return coordinator || 'Section not found';
}


module.exports = {
    getCoordinatorBySection
};
