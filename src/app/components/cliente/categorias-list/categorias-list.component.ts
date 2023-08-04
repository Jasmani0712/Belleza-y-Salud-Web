import { Component, OnInit } from '@angular/core';
import { Storage,getDownloadURL,listAll,ref, uploadBytes } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
// import { Cat } from 'src/app/interfaces/cat.interface';
import { Cate } from 'src/app/interfaces/cate';
import { CatService } from 'src/app/services/cat.services';
import { ComunicacionesService } from 'src/app/servicios/comunicaciones.service';

@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.css']
})
export class CategoriasListComponent implements OnInit{
  cats: Cate[];
  photo: string[];
  contador:number =0;
  id = '';

  constructor(
    private catService: CatService,
    private comunicaionesService:ComunicacionesService,
    private router2:Router,private route:ActivatedRoute

  ) {
    this.cats = [{
      name: 'Prueba de dssitio',
      description: 'Esto es una prueba',
      latitude: 40,
      longitude: -3,
      photo: 'assets/bys.jpg'
      

    }];
    this.photo = [];

  }
  ngOnInit(): void {
    this.catService.getCats().subscribe(cat => {
      this.cats = cat;
      console.log("cat siisisi :"+this.cats[0].name)

    })

       // this.id=this.route.snapshot.paramMap.get('id');
       const id = this.route.snapshot.paramMap.get('id');
       this.id = id !== null ? id : '';
       console.log();
      //  console.log("cat siisisi f"+this.cats[0].name)
  }

  async onClickDelete(cat: Cate) {
    const response = await this.catService.deleteCat(cat);
    console.log(response);
  }
  async onClickUpdate(cat: Cate) {
    const response = await this.catService.updateCat(cat);
    console.log(response);
  }
  

  goToRuta2(id:number){
    this.router2.navigate(['/app-place-list',id])
  }
}
