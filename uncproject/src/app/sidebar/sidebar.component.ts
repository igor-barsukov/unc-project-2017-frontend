import {Component, OnInit, ElementRef} from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import {User} from '../models/user.interface';
import {HttpService} from '../services/http.service';
import {Response} from '@angular/http';
import { Country } from '../models/country.interface';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

declare var gnMenu: any;



export class Items{
  constructor(public id: number,
    public lastName: string)
  { }
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [HttpService]
})
export class SidebarComponent implements OnInit {
  public id: number;
  public regUser: boolean;
  public items: User[]= [];
  public userId: number;
  private routeSubscription: Subscription;


  constructor(private _location: Location, private routing: Router,  private route: ActivatedRoute, private sidebarEl: ElementRef, private httpService: HttpService, private localStorageService: LocalStorageService) {
    this.routeSubscription = this.route.params.subscribe(params => this.userId = params['id']);
  }

  ngOnInit() {
    //// localStorage.setItem('id',"1");
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
      });

  }
  logout() {
    this.id = null;
    localStorage.setItem('id', null);
    console.log(localStorage.getItem('id'));
  }

  ifReg(){
    if (localStorage.getItem('id') !== 'null' ){
      this.regUser = true;
    }else {
      this.regUser = false;
    }
    return this.regUser;
  }

  goToUser(uid) {
    this.routing.navigateByUrl('/user/' + uid);
    console.log(uid);
  }


}
