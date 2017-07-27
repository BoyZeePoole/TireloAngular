import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableSelectEvent } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
@Component({
  selector: 'app-person-courses-listing',
  templateUrl: './person-courses-listing.component.html',
  styleUrls: ['./person-courses-listing.component.scss']
})
export class PersonCoursesListingComponent implements OnInit, OnChanges{
  @Input() coursePersonData : any;
  searchTerm: string='';
columns: ITdDataTableColumn[] = [
    { name: 'CourseName', label: 'Course Name', tooltip: '' },
    { name: 'DateCompleted', label: 'Date Completed' },
    { name: 'DateRegistered', label: 'Date Registered' }
  ];
  filteredData: any[];
  filteredTotal: number;

  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  sortBy: string = 'CourseName';
  selectedRows: any[] = [];
  selectedItem: any;
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  clickable = false;
  selectable = true;

  constructor( private dataTableService: TdDataTableService) { }
  ngOnChanges() {
    this.filter();
  }
  ngOnInit() {
    this.filter();
  }
sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }
  selectEvent(clickEvent: ITdDataTableSelectEvent): void {
    this.selectedItem = clickEvent;
    let item = this.selectedRows[0];
    //this.router.navigate(['/person', item.Id]);
  }
  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter(); 
  }

  filter(): void {
    let newData: any[] = this.coursePersonData;
    if (this.coursePersonData == null) return;
    let excludedColumns: string[] = this.columns
    .filter((column: ITdDataTableColumn) => {
      return ((column.filter === undefined && column.hidden === true) ||
              (column.filter !== undefined && column.filter === false));
    }).map((column: ITdDataTableColumn) => {
      return column.name;
    });
    newData = this.dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = (newData) ? newData.length : 0;
    newData = this.dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this.dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }
}
