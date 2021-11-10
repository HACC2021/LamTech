import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Reports } from '../../api/report/Report';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addReport(report) {
  console.log(`  Adding: ${report.name} (${report.email})`);
  Reports.collection.insert(report);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Reports.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default report.');
    Meteor.settings.defaultReport.map(report => addReport(report));
  }
}
