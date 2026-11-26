import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  request: IDBOpenDBRequest;
  db: IDBDatabase;
  store: IDBObjectStore;

  constructor() {
    this.request = indexedDB.open("sleeptracker-db");
    this.db = this.request.result;
    this.store = this.db.createObjectStore("sleeptracker-db");
  }

  init() {
    this.store.createIndex("name", "name");
    this.store.createIndex("overnight-data", "overnight-data");
    this.store.createIndex("sleepiness-data", "sleepiness-data");
    let transaction: IDBTransaction = this.db.transaction("sleeptracker-db", "readwrite");
    let init_store: IDBObjectStore = transaction.objectStore("sleeptracker-db");
    init_store.add("name", "");
    init_store.add("overnight-data", []);
    init_store.add("sleepiness-data", []);
  }

  add(key: string, value: any) {
    let transaction: IDBTransaction = this.db.transaction("sleeptracker-db", "readwrite");
    let init_store: IDBObjectStore = transaction.objectStore("sleeptracker-db");
    init_store.put(key, value);
  }

  get(key: string) {
    let transaction: IDBTransaction = this.db.transaction("sleeptracker-db", "readwrite");
    let init_store: IDBObjectStore = transaction.objectStore("sleeptracker-db");

    let value:any = init_store.get(key);
    if (value == null) {
      return "";
    }

    return value;
  }
}
