import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Livre } from '../livre';
import { LivreService } from '../livre.service';

@Component({
  selector: 'app-livres',
  templateUrl: './livres.component.html',
  styleUrls: ['./livres.component.css']
})
export class LivresComponent implements OnInit {

  lesLivres:Livre[]=[];
  livreForm: FormGroup = new FormGroup({});

  constructor(private livreService:LivreService,
    private fb:FormBuilder) { }

  ngOnInit(): void {
this.livreForm = this.fb.group({
  titre:[''],
  prix:[],
  nouveau:[false]
})

    this.livreService.getLivres()
    .subscribe(
      livres => this.lesLivres = livres
    )
  }

  onAjouterLivre(){
     this.livreService.addLivre(this.livreForm.value)
     .subscribe(
       data => this.lesLivres.push(data)     
     )     
  }

  onModifierLivre(id:number){
    this.livreService.updateLivre(id, this.livreForm.value)
    .subscribe(
      livre => {
        let position = this.lesLivres.findIndex(l =>l.id == livre.id);
        this.lesLivres[position]= livre;
      }      
    )
  }

  onSupprimerLivre(id:number){
    this.livreService.deleteLivre(id)
    .subscribe(
      ()=>
      this.lesLivres = this.lesLivres.filter(l=>l.id !=id)
    )
  }

}
