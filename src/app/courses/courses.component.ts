import { Component, OnInit } from '@angular/core';
import { CourseService} from '../services/course.service';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableSelectEvent } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
 public coursesData: any;
  searchTerm: string='';

columns: ITdDataTableColumn[] = [
    { name: 'Name', label: 'Course', tooltip: '' },
    { name: 'ValidPeriod', label: 'Valid Period' },
  ];
  filteredData: any[];
  filteredTotal: number;

  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  sortBy: string = 'Name';
  selectedRows: any[] = [];
  selectedItem: any;
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  clickable = false;
  selectable = true;
  constructor(private courseService: CourseService,
              private dataTableService: TdDataTableService,
              private route: ActivatedRoute,
              private router: Router) {
    
   }

  ngOnInit() {
    this.getPeople();    
  }

  getPeople() {
    this.courseService.getCourses()
      .subscribe(
        people => {
          this.coursesData = people;
          this.filteredData = this.coursesData;
          this.filteredTotal = this.coursesData.length;
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
    this.router.navigate(['/course', item.Id]);
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
    let newData: any[] = this.coursesData;
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
