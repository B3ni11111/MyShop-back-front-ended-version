const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const MONGO_URI = 'mongodb://mongo:27017/myshop';
const COLLECTION_NAME = 'itemData';

async function seed() {
  let client;

  try {
    // Read items data from JSON file
    const itemsPath = path.join(__dirname, 'src', 'data', 'items.json');
    const itemsData = JSON.parse(fs.readFileSync(itemsPath, 'utf-8'));

    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();

    // Drop existing collection if it exists
    const collections = await db.listCollections({ name: COLLECTION_NAME }).toArray();
    if (collections.length > 0) {
      console.log(`Dropping existing '${COLLECTION_NAME}' collection...`);
      await db.collection(COLLECTION_NAME).drop();
      console.log('Collection dropped');
    }

    // Insert all documents
    console.log('Inserting documents...');
    const result = await db.collection(COLLECTION_NAME).insertMany(itemsData);

    console.log(`Successfully inserted ${result.insertedCount} documents into '${COLLECTION_NAME}' collection`);

  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  } finally {
    // Disconnect
    if (client) {
      await client.close();
      console.log('Disconnected from MongoDB');
    }
  }
}

seed();
