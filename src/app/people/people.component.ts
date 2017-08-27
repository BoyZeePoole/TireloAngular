import { Component, OnInit } from '@angular/core';
import { PersonService} from '../services/person.service';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn, ITdDataTableSelectEvent } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})

export class PeopleComponent implements OnInit {  

  public peopleData: any;
  searchTerm: string='';

columns: ITdDataTableColumn[] = [
    { name: 'Surname', label: 'Surname', tooltip: '' },
    { name: 'Initials', label: 'Initials' },
    { name: 'CoyNumber', label: 'Copy Number' },
    { name: 'Role.RoleName', label: 'Role' },
  ];
  filteredData: any[];
  filteredTotal: number;

  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  sortBy: string = 'Surname';
  selectedRows: any[] = [];
  selectedItem: any;
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;
  clickable = true;
  selectable = true;
  constructor(private personService: PersonService,
              private dataTableService: TdDataTableService,
              private route: ActivatedRoute,
              private router: Router) {
    
   }

  ngOnInit() {
    this.getPeople();    
  }

  getPeople() {
    this.personService.getPeople()
      .subscribe(
        people => {
          this.peopleData = people;
          this.filteredData = this.peopleData;
          this.filteredTotal = this.peopleData.length;
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
    let item = clickEvent.row;
    this.router.navigate(['/person', item.Id]);
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
    let newData: any[] = this.peopleData;
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
