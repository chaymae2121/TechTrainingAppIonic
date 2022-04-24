import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../environments/environment";
import { getAuth, signOut } from "firebase/auth";
import { Training } from '../Model/training.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  name: string
  email: any
  myCourses: string[]
  courses: string[]
  javaScript: { id: "", name: "", prerequis: "", description: "", prix: "", date: "" }
  ionic: { id: "", name: "", prerequis: "", description: "", prix: "", date: "" }
  angular: { id: "", name: "", prerequis: "", description: "", prix: "", date: "" }
  spring: { id: "", name: "", prerequis: "", description: "", prix: "", date: "" }
  reactJs: { id: "", name: "", prerequis: "", description: "", prix: "", date: "" }
  django: { id: "", name: "", prerequis: "", description: "", prix: "", date: "" }
  VueJs: { id: "", name: "", prerequis: "", description: "", prix: "", date: "" }
  constructor(private route: ActivatedRoute, private router: Router) { }



  async addCourseFb(course: string) {
    await updateDoc(doc(db, "Users", this.email.email), {
      myCourses: arrayUnion(course),
      courses: arrayRemove(course)
    }
    )
    console.log(this.myCourses);
  }


  async recapCourseData(course: string) {

    const docRef = doc(db, "Formations", course);
    const docSnap = await getDoc(docRef);
  }

  consulter(cours: string): void {
    this.router.navigate(['/details', cours])
  }

  addCourse(cours: string) {
    this.myCourses = [...this.myCourses, cours]
    this.addCourseFb(cours)
    this.recapData()

  }

  async recapData() {
    this.email = this.route.snapshot.params
    const docRef = doc(db, "Users", this.email.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.name = docSnap.data().firstName
      this.courses = docSnap.data().courses
      this.myCourses = docSnap.data().myCourses
      console.log(this.courses)
    } else {
      console.log("Aucun document!");
    }
  }

  ngOnInit() {

    this.recapData();
  }

  deconnecter(): void {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    this.router.navigate(['/login'])
  }

}
