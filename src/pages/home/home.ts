import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AngularFireAuth, AngularFireDatabase]
})
export class HomePage {
  mensagens: FirebaseListObservable<any[]>;
  usuario: any;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth,
    private af: AngularFireDatabase) { }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(usr => this.usuario = usr);

    this.mensagens = this.af.list('/mensagens', {
      query: {
        limitToLast: 10
      }
    })

  }

  enviarMensagem(msg) {
    this.mensagens.push({ mensagem: msg, usuario: this.usuario.displayName })
  }

  autenticar() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        this.usuario = res.user;
      })
  }

  sair() {
    this.afAuth.auth.signOut();
  }
}
