import {Component, OnInit, ElementRef} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {User} from '../models/user.interface';
import {HttpService} from '../services/http.service';
import {Response} from "@angular/http";

declare var gnMenu: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [HttpService]
})
export class SidebarComponent implements OnInit {
  public id: number;
  public reg: boolean;
  items: User[]= [];
  term: User;

  constructor(private sidebarEl: ElementRef, private httpService: HttpService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    //localStorage.setItem('id',"1");
    new gnMenu(this.sidebarEl.nativeElement.querySelector('.gn-menu-main'));
    this.id = parseInt(localStorage.getItem('id'));
    console.log(localStorage.getItem('id'));

    this.httpService.getAllUsers()
      .subscribe((resp: Response) => {
        const userList = resp.json();
        for (const index in userList){
          const user = userList[index];
          this.items.push(user);
        }
        //console.log(this.listCities);
      });

    if (localStorage.getItem('id') !== 'null' ){
      this.reg = true;
    }else {
      this.reg = false;
    }
    return this.reg;
  }
  logout() {
    this.id = null;
    localStorage.setItem('id', null);
    console.log(localStorage.getItem('id'));
  }
}
