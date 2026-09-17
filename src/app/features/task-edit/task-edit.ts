import { Component, computed, effect, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { TaskService } from '../../services/task';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-edit',
  styleUrl: './task-edit.css',
  templateUrl: './task-edit.html',
})
export class TaskEdit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  taskService = inject (TaskService);
   private fb= inject(FormBuilder);

  private params = toSignal (this.route.paramMap);
  taskId = computed (()=> this.params()?.get('id')?? '');

  private task$= toObservable (this.taskId).pipe (
    filter((id): id is string => id !==''),
    switchMap ((id) => this.taskService.getTask(id)),
  );
 task = toSignal(this.task$);

taskForm= this.fb.nonNullable.group ({
  title: ['', [Validators.required, Validators.minLength(2)]],
  details:[''],
  color: [''],
  
});

constructor(){
  effect(()=> {
       const t= this.task();
    if (!t) return;
    this.taskForm.patchValue({
      title: t.title,
      details: t.details,
      color: t.color,
      
    });
 
  });

}

async onSubmit() {
  if (this.taskForm.invalid) return;
  await this.taskService.updateTask(this.taskId(), this.taskForm.getRawValue());
  this.router.navigate(['/tasks']);

 }


}
