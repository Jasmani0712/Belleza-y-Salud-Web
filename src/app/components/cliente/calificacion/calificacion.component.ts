import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Firestore, doc, updateDoc } from 'firebase/firestore';
import { Firestore, Timestamp, collection, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent {
  id='';
  stars:number=0;
  texto_calificacion:string='';
  constructor(
  private firestore:Firestore,
  private route:ActivatedRoute,
  private router: Router
  ){}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_reserva');
    this.id = id !== null ? id : '';
    
  }
  onRateChange(rate: number) {
    console.log('Valor seleccionado:', rate);
    this.stars=rate
    // Puedes hacer lo que desees con el valor seleccionado,
    // como guardarlo en una variable, enviarlo a una API, etc.
    // this.btn_calificar(rate);
  }

  btn_calificar(){
    if(isNaN(this.stars)){
      alert("Calificación invalida: "+this.stars);
    }
    else{
      // alert(this.stars+this.texto_calificacion);
    
      const placeRef = doc(this.firestore, 'Bookings', this.id);
      // Datos que deseas modificar en el documento
      const newData = {
        calificacion_r: this.stars,
        opinion_r:this.texto_calificacion
      
      };
      updateDoc(placeRef, newData)
        .then(() => {
          console.log('Documento modificado correctamente');
          alert("Gracias! Tu calificación fue recibida.");
        })
        .catch((error) => {
          console.error('Error al modificar el documento: ', error);
        });
        this.router.navigateByUrl('/'); // Reemplaza 'ruta-destino' por la ruta a la que deseas ir

    }

  }
}
