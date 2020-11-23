const fs = require('fs');

export const courses = {
  ve482: 've482',
  ve477: 've477',
  vg101: 'vg101',
};

let rawData = fs.readFileSync('courses.json');
export const courseID = JSON.parse(rawData);