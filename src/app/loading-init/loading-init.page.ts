import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loading-init',
  templateUrl: './loading-init.page.html',
  styleUrls: ['./loading-init.page.scss'],
  standalone: false

})

  export class LoadingInitPage {
    constructor(private router: Router) {}
  
    ngOnInit() {
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }
  }
