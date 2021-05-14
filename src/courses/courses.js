const fs = require('fs');

const rawData = fs.readFileSync('courses.json');
export const courseID = JSON.parse(rawData);