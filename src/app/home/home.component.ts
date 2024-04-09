import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    let params = new HttpParams();
    params = params.append('id', '1');
    this.http.get('http://localhost:5000/api/products', {params}).subscribe((data) => {
      console.log(data);
    });
  }
}
