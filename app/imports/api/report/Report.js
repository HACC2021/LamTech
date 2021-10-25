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
      name: { label: 'Name', type: String },
      date: { label: 'Data', type: Date },
      location: { label: 'Address', type: String },
      behavior: { label: 'AnimalBehavior', type: String },
      characteristics: { label: 'characteristics', type: Array, optional: true },
      'characteristics.$': { type: String,
      },
      beachGoers: { label: 'NumberOfBeachGoer', type: Number },
      phoneNumber: { label: 'PhoneNumber', type: Number },
      image: { label: 'image', type: String },
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
