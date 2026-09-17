import { Injectable, inject } from '@angular/core';
import { Firestore, collection,addDoc, orderBy, query, docData } from '@angular/fire/firestore';
import { NewTask, Taskmodel } from '../models/taskmodel';
import { Observable } from 'rxjs';
import {collectionData} from '@angular/fire/firestore'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';




@Injectable({providedIn: 'root'})
export class TaskService {
    private firestore= inject(Firestore);
    private tasksCollection = collection (this.firestore, 'tasks');

  
    addTask(task: NewTask){
               return addDoc(this.tasksCollection, task);
    };

    getTasks(): Observable<Taskmodel[]> {
        const q = query (this.tasksCollection, orderBy ('createdAt', 'desc'));
        return collectionData (q, {idField:'id'}) as Observable <Taskmodel[]>;
    };

     getTask(id: string): Observable<Taskmodel> {
        const ref = doc (this.firestore, 'tasks', id);
        return docData (ref, {idField:'id'}) as Observable <Taskmodel>;
    };

    updateTask(id:string, changes: Partial<NewTask>){
        console.log ('SERVICE updating', id, changes);
        return updateDoc (doc(this.firestore, 'tasks', id), changes);

    };

    deleteTask (id:string) {
        console.log('SERVICE deleting:', id);
        return deleteDoc (doc(this.firestore, 'tasks', id));

    };

};
