export interface AkashApiWrapper {
  find: (query: object) => Promise<unknown[]>;
  insertOne: (doc: unknown) => Promise<unknown>;
}
