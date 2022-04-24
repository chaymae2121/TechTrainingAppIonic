import { Component ,OnInit } from '@angular/core';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../environments/environment';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit{
  data : any
  user : string
  email: string
  password: string
  
  constructor(private route : ActivatedRoute, private router : Router) {}
  ngOnInit() {
  }

  login() :void {
    signInWithEmailAndPassword(auth,this.email,this.password)
    .then((usr)=>{
      getDoc(doc(db, "Users", usr.user.uid))
      .then((doc) => {
        const userData = doc.data()     
        this.router.navigate(['/home',this.email]);
      })
    }).catch(()=>{alert('Email ou mot de passe est incorrect!');});
  }
  toRegisterPage():void {
    this.router.navigate(['/register']);
  }
}
