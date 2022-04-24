import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";
import { Training } from '../Model/training.interface';
import { HomePage } from '../home/home.page';

import { db } from "../../environments/environment";
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  cours: any
  id: string
  name: string
  date: string
  prerequis: string
  prix: string
  description: string
  email: any
  image: any

  constructor(private route: ActivatedRoute, private router: Router) { }

  async recapData() {
    this.cours = this.route.snapshot.params


    const docRef = doc(db, "Formations", this.cours.cours);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.id = docSnap.data().id
      this.name = docSnap.data().name
      this.prerequis = docSnap.data().prerequis
      this.date = docSnap.data().date
      this.prix = docSnap.data().prix
      this.description = docSnap.data().description
      this.image = docSnap.data().image
    } else {

      console.log("Aucun document!");
    }
  }
 

  ngOnInit() {
    this.recapData()
    console.log(this.email)
  }
  
  goBack(){
    this.router.navigate(['/home', this.email])
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
