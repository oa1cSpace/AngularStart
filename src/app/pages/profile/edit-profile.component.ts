import {Component, OnDestroy, OnInit} from '@angular/core';
import {userEntitySelectors} from "../../store/reducers/user.reducer";
import {select, Store} from "@ngrx/store";
import {getUserSelector} from "../../store/selectors/user.selector";
import {User} from "../../store/models/user.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UserLogOut} from "../../store/actions/user.actions";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store,
    private router: Router,
  ) {
  };

  private user$ = this.store.pipe(select(getUserSelector));
  public user: User;
  public subscriptions: Array<Subscription> = [];

  ngOnInit(): void {
    this.subscriptions.push(
    this.user$.subscribe((userData) => {
      console.log(userData)
      JSON.stringify('===============[ user ]============>', userData);
        this.user = userData;

    }),
    );
  }

  ngOnDestroy(): void {
     this.subscriptions.forEach(s => s.unsubscribe());
  }

  logOut() {
    this.store.dispatch(new UserLogOut());
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
