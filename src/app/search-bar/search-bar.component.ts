import { Component, OnInit , ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  inputValue: string;
  filteredOptions: string[] = [];
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  selectedValue = 'lucy';

  constructor() {
    this.filteredOptions = this.options;
   }

  ngOnInit(): void {
  }

  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

}
