import { Component, inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { TaskService } from '../../services/task';
import { Router } from '@angular/router';
import { NewTask } from '../../models/taskmodel';
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-create',
  styleUrl: './task-create.css',
  templateUrl: './task-create.html',
})
export class TaskCreate {
  private fb= inject(FormBuilder);
  private taskService = inject(TaskService)
  private router= inject(Router)
  
  taskForm = this.fb.nonNullable.group({
    title: ['',[Validators.required, Validators.minLength(2)]],
    details: [''],
    color: ['yellow'],

  });

  async onSubmit() {
    if (this.taskForm.invalid) return;

    const newTask: NewTask={
      ...this.taskForm.getRawValue(), //
      done:false, 
      createdAt: Date.now(),
    };
    
    console.log('COMPONENT sending:', newTask); //test happens here, make sure to know everything happening now
    await this.taskService.addTask (newTask);
    this.taskForm.reset({color: 'yellow'});
    this.router.navigate(['/tasks']);

  }
}
