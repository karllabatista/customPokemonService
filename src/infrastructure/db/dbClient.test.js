import { MongoDBClient } from "./dbClient";
import dotenv from "dotenv";
dotenv.config();

describe("MongoDB Connection", () => {
  let client;
  const mockConnect = jest.fn().mockResolvedValue(true);

  beforeAll(() => {
    const mongoUri = process.env.MONGO_URI;
    client = new MongoDBClient(mongoUri);

    // injetando o mock
    client.client = {
      connect: mockConnect,
      topology: { isConnected: () => false },
    };
  });

  test("should establish connection with MongoServer", async () => {
    await client.connect();
    expect(mockConnect).toHaveBeenCalled();
  });
});