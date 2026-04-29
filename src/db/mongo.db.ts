import { Collection, Db, MongoClient } from "mongodb";
import { DriverType } from "../drivers/types/driver.type";
import { RideType } from "../rides/types/ride.type";
import { SETTINGS } from "../core/settings/settings";

const DRIVER_COLLECTION_NAME = "driver";
const RIDE_COLLECTION_NAME = "ride";

let client: MongoClient;
let driverCollection: Collection<DriverType>;
let rideCollection: Collection<RideType>;

const runDB = async (url: string): Promise<void> => {
  client = new MongoClient(url);
  const db: Db = client.db(SETTINGS.DB_NAME);

  driverCollection = db.collection<DriverType>(DRIVER_COLLECTION_NAME);
  rideCollection = db.collection<RideType>(RIDE_COLLECTION_NAME);

  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log("Connected successfully to server");
  } catch (error) {
    await client.close();
    throw new Error(`Failed to connect to database: ${error}`);
  }
};

const stopDb = async () => {
  if (!client) {
    throw new Error("Client is not initialized");
  }
  await client.close();
};

export { runDB, stopDb, client, driverCollection, rideCollection };
