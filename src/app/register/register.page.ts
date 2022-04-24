import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { setDoc, doc, getDoc } from "firebase/firestore";

import { db } from 'src/environments/environment';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  data: any
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  CoursesList: {}
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  async addUser() {
    await setDoc(doc(db, "Users", this.email), {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      myCourses: [],
      courses: ["javaScript", "ionic", "angular", "spring", "reactJs","django","VueJs"]
    })

  }

  signUp(): void {
    if (this.password === this.confirmPassword) {
      createUserWithEmailAndPassword(auth, this.email, this.password);
      console.log(this.CoursesList);
      this.addUser();
      this.router.navigate(['/home', this.email])
    }

    else { alert("Echec de crée le document !!"); }
  }

  async recapCoursesListe() {

    const docRef = doc(db, "Formations");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.CoursesList = docSnap.data();


    } else {
      console.log("Aucun document!");
    }
  }

  dejaInscris(): void {
    this.router.navigate(['login'])
  }


}

