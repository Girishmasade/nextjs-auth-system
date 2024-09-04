import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb connected successfully");
    });

    connection.on("error", (error) => {
      console.log("MongoDb connection error", error);
      process.exit()
    });
  } catch (error) {
    console.log("database connection error", error);
  }
}
