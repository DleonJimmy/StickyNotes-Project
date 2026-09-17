import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task';
import { toSignal } from '@angular/core/rxjs-interop';
import { Taskmodel } from '../../models/taskmodel';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-task-board',
  styleUrl: './task-board.css',
  templateUrl: './task-board.html',
})
export class TaskBoard {
  private taskService = inject(TaskService);
  
  tasks= toSignal (this.taskService.getTasks(), {initialValue: [] as Taskmodel[]});
openCount= computed(() => this.tasks().filter(t => !t.done).length);
totalCount = computed(()=> this.tasks().length);

async remove(id: string) {
  if (!confirm ('Delete this task?')) return;
  await this.taskService.deleteTask(id);
  // console.log('DELETE clicked for id:', id);   // <-- the TEST
}

}
