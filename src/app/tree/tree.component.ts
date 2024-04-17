import { Component, Input } from '@angular/core';
import { IBudget } from '../interfaces/budget';

@Component({
  selector: 'app-tree',
  standalone: true,
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss'
})
export class TreeComponent {

  @Input() data: IBudget[] = [];

  toggleExpanded(item: IBudget) {
    item.expanded = !item.expanded 
  }
}
