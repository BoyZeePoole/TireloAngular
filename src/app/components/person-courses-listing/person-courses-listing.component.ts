import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableSelectEvent } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

@Component({
  selector: 'app-person-courses-listing',
  templateUrl: './person-courses-listing.component.html',
  styleUrls: ['./person-courses-listing.component.scss']
})
export class PersonCoursesListingComponent implements OnInit, OnChanges{
  @Input() coursePersonData : any;
  @Output() onDeleted = new EventEmitter<any[]>();
  searchTerm: string='';
columns: ITdDataTableColumn[] = [
    { name: 'Id', label: '', tooltip: '', hidden: true },
    { name: 'CourseName', label: 'Course Name', tooltip: '' },
    { name: 'DateCompleted', label: 'Date Completed' },
    { name: 'DateRegistered', label: 'Date Registered' },
    { name: 'Manager', label: 'Manager' },
    { name: 'Period', label: 'Period' },
    { name: 'Expire', label: 'Date Expire' },
    { name: 'DaysLeft', label: 'Days left'}
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
    this.onDeleted.emit(this.selectedRows);
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
    this.onDeleted.emit(this.selectedRows);
  }
  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter(); 
  }

  add_months(dt, n){
   return new Date(dt.setMonth(dt.getMonth() + n));      
  }
  getDateField(date: string) {
    let dt = new Date(date);
    return date ? ("0" + dt.getDate()).slice(-2) + "-" + ("0"+(dt.getMonth()+1)).slice(-2) + "-" +
    dt.getFullYear() : '';
  }

  getDaysFromDates(dateFirst :string, dateSecond: string) {
      let days = Math.floor(( Date.parse(dateFirst) - Date.parse(dateSecond) ) / 86400000);
      return days >= 0 ? days : 'Expired';
  }
  
  getDaysLeft(validPeriod, registerDate, completedDate) {
    if(completedDate) {
      let validityDate = this.add_months(new Date(completedDate), validPeriod)
      return this.getDaysFromDates(validityDate.toDateString(), new Date().toDateString()); 
    }
      if(registerDate) {
        return (new Date(registerDate) > new Date()) ? '('+this.getDaysFromDates(registerDate, new Date().toDateString()) +')' : 'Late';
      }
      
  }

  filter(): void {
     if (this.coursePersonData == null) return;
     let newData: any[] = this.coursePersonData.map(o => {
      let validPeriod = o.Course.ValidPeriod;
      let validityDate = o.DateCompleted ? this.add_months(new Date(o.DateCompleted), validPeriod) : null;
      return {
              Id: o.Id,
              CourseName: o.Course.Name,
              DateCompleted: this.getDateField(o.DateCompleted) ,
              DateRegistered: this.getDateField(o.DateExpired),
              Expire: o.DateCompleted ? this.getDateField(validityDate.toDateString()) : 'N/A',
              //DaysLeft: validityDate ? this.getDaysFromDates(new Date().toDateString(), validityDate.toDateString()) : '',
              DaysLeft: this.getDaysLeft(validPeriod, o.DateExpired, o.DateCompleted),
              Period: o.Course.ValidPeriod,
              Manager: o.Manager ? o.Manager.Initials + ' ' + o.Manager.Surname : '' };
    });
   
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
