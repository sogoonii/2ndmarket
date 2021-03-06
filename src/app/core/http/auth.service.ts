import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, merge } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AFSimpleUser } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  get loginUserInfo(): Observable<AFSimpleUser | null> {
    const user$ = this.afAuth.user.pipe(
      filter(afUser => !!afUser),
      map(({ uid, displayName, photoURL }) => {
        return { uid, displayName, photoURL };
      })
    );

    const noUser$ = this.afAuth.user.pipe(
      filter(afUser => !afUser)
    );

    return merge(user$, noUser$);
  }

  login(target: string) {
    let provider;

    if (target === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    } else if (target === 'github') {
      provider = new firebase.auth.GithubAuthProvider();
    } else if (target === 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider();
    } else if (target === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
    }

    return this.afAuth.auth.signInWithPopup(provider);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  updateDisplayName(displayName: string) {
    return this.afAuth.user.pipe(
      switchMap(user => {
        return user.updateProfile({
          displayName,
          photoURL: user.photoURL
        });
      })
    );
  }

}
