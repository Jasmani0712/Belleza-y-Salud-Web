import { Component, OnInit } from '@angular/core';
import { Storage,getDownloadURL,listAll,ref, uploadBytes } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecialistaInterface } from 'src/app/interfaces/especialista.interface';
import { CatService } from 'src/app/services/cat.services';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { ComunicacionesService } from 'src/app/servicios/comunicaciones.service';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-especialista-list',
  templateUrl: './especialista-list.component.html',
  styleUrls: ['./especialista-list.component.css']
})
export class EspecialistaListComponent implements OnInit {
   
  cats: EspecialistaInterface[];
  photo: string[];
  contador:number =0;
  id = '';
  servicio_id = '';
  servicio='';
  foto_shop:string;

  constructor(
    private catService: EspecialistaService,
    private comunicaionesService:ComunicacionesService,
    private router2:Router,
    private route:ActivatedRoute,
    private firestore:Firestore,
    private router: Router,
    private dataSharingService: DataSharingService,

  ) {
    this.cats = [{
      name_especialista: 'Prueba de dssitio',
      description: 'Esto es una prueba',
      shop: "40",
      photo:'assets/bys.jpg'
    }];
    this.photo = [];
    this.foto_shop='';

  }
  async ngOnInit(): Promise<void> {
  
       // this.id=this.route.snapshot.paramMap.get('id');
       const id = this.route.snapshot.paramMap.get('id');
       this.id = id !== null ? id : '';

       const servicio = this.route.snapshot.paramMap.get('servicio');
       this.servicio = servicio !== null ? servicio : '';
       console.log(this.id+" y "+this.servicio);

       const servicio_id = this.route.snapshot.paramMap.get('servicio_id');
       this.servicio_id = servicio_id !== null ? servicio_id : '';
       console.log(this.id+" y "+this.servicio+" y tambien: "+this.servicio_id)

       const auth = getAuth();
       onAuthStateChanged(auth, (user) => {
         if (user) {           
          //  this.mail=user.uid!;
           console.log('User:', user.uid);
           // this.add_token(token,user.uid)
           // this.router.navigate(['/especialistas/'+this.id+'/'+this.nombreservicio]);
   
           // routerLink="/especialistas/{{id}}/{{resultados.nombre}}/"
         } else {
           console.log('No se encuentra el usuario en especialista :(',user );
          //  this.router.navigate(['/']); solo esto cambia el no tener usuario
          //  alert("No se encuentra el usuario.")
           this.dataSharingService.setString(this.id);

         }
       });
       


      //  console.log("cat siisisi f"+this.servicio_id)
    this.catService.getEspecialistas(this.id,this.servicio_id).subscribe(cat => {
      this.cats = cat;
      console.log("cat es; "+cat)
      // console.log("cat siisisi :"+this.cats[0].name_especialista)

    })

    const queryRef = query(collection(this.firestore, 'shop'),  where('name', '==', this.id));
    try {
     const querySnapshot = await getDocs(queryRef);
     querySnapshot.forEach((doc) => {   
       const foto =  doc.data()['photo'];   
       this.foto_shop=foto;
      });
   } catch (error) {
     console.error('Error al obtener los documentos:', error);
   }
 
  }
  
  }
  