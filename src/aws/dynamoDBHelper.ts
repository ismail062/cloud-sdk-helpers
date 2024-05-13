import { DynamoDBClient, PutItemCommand, GetItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBOptions } from './types'
import logger from '../logger'

class DynamoDBHelper {
    private client: DynamoDBClient;

    constructor(private options: DynamoDBOptions) {
        this.client = new DynamoDBClient({
            region: options.region,
            credentials: options.credentials
        });
    }

    async putItem(tableName: string, item: Record<string, any>): Promise<void> {
        const params = {
            TableName: tableName,
            Item: item
        };

        const command = new PutItemCommand(params);

        try {
            await this.client.send(command);
            logger.info("Item added successfully");
        } catch (error) {
            logger.error("Error putting item:", error);
            throw error;
        }
    }

    async getItem(tableName: string, key: Record<string, any>): Promise<Record<string, any> | null> {
        const params = {
            TableName: tableName,
            Key: key
        };

        const command = new GetItemCommand(params);

        try {
            const { Item } = await this.client.send(command);
            return Item ? JSON.parse(JSON.stringify(Item)) : null;
        } catch (error) {
            logger.error("Error getting item:", error);
            throw error;
        }
    }

    async deleteItem(tableName: string, key: Record<string, any>): Promise<void> {
        const params = {
            TableName: tableName,
            Key: key
        };

        const command = new DeleteItemCommand(params);

        try {
            await this.client.send(command);
            logger.info("Item deleted successfully");
        } catch (error) {
            logger.error("Error deleting item:", error);
            throw error;
        }
    }
}

export { DynamoDBHelper };

