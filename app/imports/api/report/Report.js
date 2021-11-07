import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ReportsCollection. It encapsulates state and variable values for stuff.
 */
class ReportsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ReportsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      animal: { label: 'Animal', type: String },
      name: { label: 'Name', type: String },
      phoneNumber: { label: 'PhoneNumber', type: Number },
      email: { label: 'Email', type: String },
      date: { label: 'Data', type: Date },
      location: { label: 'Location', type: String },
      longitude: { label: 'Longitude', type: Number, optional: true },
      latitude: { label: 'Latitude', type: Number, optional: true },
      behavior: { label: 'AnimalBehavior', type: String },
      characteristics: { label: 'Characteristics', type: String },
      beachGoers: { label: 'NumberOfBeachGoer', type: Number },
      image: { label: 'Image', type: String, optional: true },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ReportsCollection.
 * @type {ReportsCollection}
 */
export const Reports = new ReportsCollection();
