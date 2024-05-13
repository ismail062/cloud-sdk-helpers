export interface DynamoDBOptions {
    region: string;
    credentials?: {
        accessKeyId: string;
        secretAccessKey: string;
        sessionToken?: string;
    };
}
