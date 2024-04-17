export interface IBudget {
    name: string;
    id: number;
    children?: IBudget[];
    expanded?: Boolean;
    budgeted: number;
    // hierarchy: 'department' | 'group' | 'category' | 'sub categ';
}