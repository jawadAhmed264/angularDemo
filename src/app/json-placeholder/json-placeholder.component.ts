import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Post } from '../Models/post';
import { JsonPlaceholderService } from '../sharedServices/json-placeholder.service';

@Component({
  selector: 'app-json-placeholder',
  templateUrl: './json-placeholder.component.html',
  styleUrls: ['./json-placeholder.component.css']
})
export class JsonPlaceholderComponent implements OnInit {
  postList: Post[];
  totalRecords: number;
  loading: boolean;

  constructor(private JsonService: JsonPlaceholderService) { }

  ngOnInit(): void {
    this.loading = true;
  }
  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
      this.JsonService.getPost(event).subscribe(res => {
        this.postList = res;
        this.totalRecords = 100;
        this.loading = false;
      })
    }, 1000);
  }
}
