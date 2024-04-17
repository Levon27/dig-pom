import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { budget_tree } from '../budget_tree';
import { TreeComponent } from "./tree/tree.component";
import { IBudget } from './interfaces/budget';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, TreeComponent]
})
export class AppComponent {
  title = 'dig-pom';
  tree: IBudget[] = []


  /* 
  0 - department
  1 - group
  2 - catgeory
  */
  toggle(level: number) { 
    let i = 0;
    let tree = this.tree;
    while (tree.length > 0) {
      if (i < level)
        tree.forEach(item => item.expanded = true)
      else if (i == level)
        tree.forEach(item => item.expanded = !item.expanded)
      else if (i > level)
        tree.forEach(item => item.expanded = false)

      let newTree: IBudget[] = []
      tree.forEach(i => newTree.push(...i.children ?? []))
      tree = newTree
      i++;
    }
  }

  constructor() {
    let department_ids: Number[] = []
    let category_ids: Number[] = []
    let group_ids: Number[] = []
    let sub_cat_ids: Number[] = []


    budget_tree.forEach(i => {
      if (!department_ids.includes(i.department_id)) {
        this.tree.push({ id: i.department_id, name: i.department_nm, budgeted: Number(i.current_department_am)})

        department_ids.push(i.department_id)
      }

      if (!group_ids.includes(i.group_id)) {
        let dep = this.tree.find(b => b.id == i.department_id)
        let newItem: IBudget = { id: i.group_id, name: i.group_nm, budgeted: Number(i.current_group_am)}

        if (dep?.children) dep?.children.push(newItem)
        else dep!.children = [newItem]

        group_ids.push(i.group_id)
      }

      if (!category_ids.includes(i.category_id)) {
        let group = this.tree
          .find(b => b.id == i.department_id)?.children
          ?.find(b => b.id == i.group_id);

        let newItem: IBudget = { id: i.category_id, name: i.category_nm, budgeted: Number(i.current_cat_am)}

        if (group?.children) group?.children.push(newItem)
        else group!.children = [newItem]

        category_ids.push(i.category_id)
      }

      if (!sub_cat_ids.includes(i.sub_cat_id)) {
        let cat = this.tree
          .find(b => b.id == i.department_id)?.children
          ?.find(b => b.id == i.group_id)?.children
          ?.find(b => b.id == i.category_id)

        let newItem: IBudget = { id: i.sub_cat_id, name: i.sub_cat_nm, budgeted: Number(i.current_sub_cat_am)}

        if (cat?.children) cat?.children.push(newItem)
        else cat!.children = [newItem]

        sub_cat_ids.push(i.sub_cat_id)
      }
    })

    console.log(this.tree)
  }
}
