import { Component, OnInit, inject } from '@angular/core';                                     
import { Firestore, collection, collectionData, doc } from '@angular/fire/firestore';
import { CategoriaService } from 'src/app/services/categoria.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-list-categorias',
  templateUrl: './list-categorias.component.html',
  styleUrls: ['./list-categorias.component.css']
})
export class ListCategoriasComponent implements OnInit {
//  firestore: Firestore = inject(Firestore)
  // items$: Observable<any[]>;

  // constructor(firestore: Firestore) {
  //   const aCollection = collection(this.firestore, 'category')
  //   // this.items$ = collectionData(aCollection);
  // }
  
  categorias: any[]=[];
  constructor(private _categoriaService: CategoriaService){
  } 
  ngOnInit(): void {
    this._categoriaService.getCategorias().subscribe(places => {
      this.categorias = places;
      console.log(places);

    });

  }
  // ngOnInit():void{
  //   this.getCategorias()
  // }
  getCategorias() {

    this._categoriaService.getPlaces().subscribe(categorias => {
      this.categorias = categorias;
    });
    this._categoriaService.getPlaces().subscribe(data => {
      this.categorias=[];
     
      
      // data.forEach((elementAt:any)=>{
      //   console.log(elementAt.payload);
      // });
      data.forEach((element:any) => {
        // console.log(element.payload.doc.id);
        this.categorias.push({
          // id: element.payload.doc.id.element.payload.doc.data()
        })
      });
      // console.log(data);
    });
    
  }

}
