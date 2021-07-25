import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, throttleTime } from 'rxjs/operators';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy{

  hideNavigation = false;
  subscription!: Subscription;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    title: Title,
    public userService: UserService, 
    router: Router
    ) {
    this.subscription = router.events.pipe(filter(e => e instanceof ActivationEnd), throttleTime(0)).subscribe((e: any) => {
      title.setTitle(e.snapshot.data?.title);
      this.hideNavigation = !!e.snapshot.data?.noNavigation;
    });
  }

  loginHandler(): void {
  this.userService.login( {email: '', password: ''} );
  }

  logoutHandler(): void {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}