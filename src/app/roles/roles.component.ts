import { Component, OnInit } from '@angular/core';
import { RoleService} from '../services/role.service';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableSelectEvent } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
public rolesData: any;
  searchTerm: string='';

  columns: ITdDataTableColumn[] = [
    { name: 'RoleName', label: 'Role', tooltip: 'This is what the person is employed as' },
  ];
  filteredData: any[];
  filteredTotal: number;
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  sortBy: string = 'RoleName';
  selectedRows: any[] = [];
  selectedItem: any;
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  clickable = false;
  selectable = true;

  constructor(private roleService: RoleService,
              private dataTableService: TdDataTableService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getRoles();    
  }
  getRoles() {
    this.roleService.getRoles()
      .subscribe(
        roles => {
          this.rolesData = roles;
          this.filteredData = this.rolesData;
          this.filteredTotal = this.rolesData.length;
          this.filter();
        },
        error => {
          //his.popToast('error', 'Error', this.errorService.displayError(error));
        });
  }
  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }
  selectEvent(clickEvent: ITdDataTableSelectEvent): void {
    this.selectedItem = clickEvent;
    let item = this.selectedRows[0];
    this.router.navigate(['/role', item.Id]);
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.rolesData;
    let excludedColumns: string[] = this.columns
    .filter((column: ITdDataTableColumn) => {
      return ((column.filter === undefined && column.hidden === true) ||
              (column.filter !== undefined && column.filter === false));
    }).map((column: ITdDataTableColumn) => {
      return column.name;
    });
    newData = this.dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    newData = this.dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this.dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

}
