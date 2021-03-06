import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable()
export class UserServiceProvider {

  constructor(public afAuth: AngularFireAuth,
              public db: AngularFireDatabase) {
    console.log('Hello UserServiceProvider Provider');
  }

  public loginUser(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public registerUser(newUser: User){
    return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then((u) => {
      this.db.object(`users/${u.uid}`).set(newUser);
    });
  }

  public getCurrentUserEmail(): string{
    return this.afAuth.auth.currentUser.email;
  }

  public getCurrentUserId(): string{
    return this.afAuth.auth.currentUser.uid;
  }

  public getCurrentUser(){
    return this.db.object(`users/${this.getCurrentUserId()}`).valueChanges();
  }

  public checkAuthState(){
    return this.afAuth.authState;
  }

  public logOut(){
    this.afAuth.auth.signOut();
  }
}
