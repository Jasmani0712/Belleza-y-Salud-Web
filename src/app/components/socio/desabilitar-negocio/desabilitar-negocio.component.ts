import { Component, OnInit } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-desabilitar-negocio',
  templateUrl: './desabilitar-negocio.component.html',
  styleUrls: ['./desabilitar-negocio.component.css']
})
export class DesabilitarNegocioComponent implements OnInit{
  foto_shop:string;
  id='';
  btn='Deshabilitar';
  fechaSeleccionada1: Date | null;
  fechaSeleccionada2: Date | null;
  hab_btn2:boolean=true
  hab_btn1:boolean=false
  estadofecha:string=''
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_socio');
    this.id = id !== null ? id : '';
    console.log("id: "+id)
    this.img_shop();
    this.f_estadofecha()

    
  }
  async f_estadofecha() {
    // const placeRef = doc(this.firestore, 'shop', this.id);
    const queryRef = collection(this.firestore, 'shop');
    const filteredQuery = query(queryRef, where('name', '==', this.id));
    try {
      const querySnapshot =  getDocs(filteredQuery);
      (await (querySnapshot)).forEach((doc1) => {
        const id = doc1.id; // Obtiene el ID del documento directamente
        const estadoActual = doc1.data()['desh_fecha_inicio']; 
        const estadoActual2 = doc1.data()['desh_fecha_fin']; 

        if(estadoActual){
          this.estadofecha="Negocio deshabilitado desde (mm/dd/yyyy): "+estadoActual+" hasta: "+estadoActual2
          // alert("si")
          this.hab_btn1=true
          this.hab_btn2=false
        }else{
          this.estadofecha="Negocio habilitado "+estadoActual
          // alert("no")
          this.hab_btn1=false
          this.hab_btn2=true
        }
      });
  } catch (error) {
    console.error('Error al obtener los documentos:', error);
  }
}
  constructor(
    private firestore:Firestore, 
    private router: Router,
    private route:ActivatedRoute,

  )   {  
  this.foto_shop='';
  // this.images = [];
  this.fechaSeleccionada1=null
  this.fechaSeleccionada2=null
  }
  async img_shop(){
    const queryRef = query(collection(this.firestore, 'shop'),  where('name', '==', this.id));
    try {
      
     const querySnapshot = await getDocs(queryRef);
     querySnapshot.forEach((doc) => {   
        const foto =  doc.data()['photo'];   
        this.foto_shop=foto;
        console.log("this.foto_shop :"+this.foto_shop)

      });
   }
    catch (error) {
     console.error('Error al obtener los documentos:', error);
   }
  }


  dateFilter = (date: Date | null): boolean => {
    // Lista de fechas deshabilitadas (puedes obtenerlas de tu base de datos o cualquier otra fuente)
    const disabledDates = [
      new Date('07-25-2023'),
      new Date('07/30/2023'),
      // Agrega más fechas deshabilitadas si es necesario
    ];
  
    // Si la fecha es nula, no se deshabilita
    if (!date) {
      return true;
    }
  
    // Si la fecha está en la lista de fechas deshabilitadas, se deshabilita
    const isDisabled = disabledDates.some(disabledDate =>
      disabledDate.getTime() === date.getTime()
    );
  
    return !isDisabled; // Devuelve true si la fecha no está deshabilitada
  };

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    // Aquí puedes realizar cualquier acción que necesites cuando la fecha cambia
    console.log('Fecha seleccionada:', event.value);
    this.fechaSeleccionada1 = event.value;

    // this.btn_deshabilitar(event.value);
  }
  onDateChange2(event: MatDatepickerInputEvent<Date>) {
    // Aquí puedes realizar cualquier acción que necesites cuando la fecha cambia
    console.log('Fecha seleccionada:', event.value);
    this.fechaSeleccionada2 = event.value;

    // this.btn_deshabilitar(event.value);
  }
  btn_deshabilitar(){
    //  alert("dsfd")

    if (this.fechaSeleccionada1 && this.fechaSeleccionada2) {
      // Aquí puedes realizar cualquier acción que necesites con las fechas seleccionadas
      console.log('Fecha seleccionada 1:', this.fechaSeleccionada1);
      console.log('Fecha seleccionada 2:', this.fechaSeleccionada2);
      this.add_desh_fechas();
    } else {
      // Si alguna de las fechas no está seleccionada, muestra un mensaje o realiza otra acción
      console.log('Debe seleccionar ambas fechas');
    }
  }
  async add_desh_fechas(){
    const placeRef = doc(this.firestore, 'shop', this.id);
    const queryRef = collection(this.firestore, 'shop');
    const filteredQuery = query(queryRef, where('name', '==', this.id));
    try {
      const querySnapshot =  getDocs(filteredQuery);
      (await (querySnapshot)).forEach((doc1) => {
        const id = doc1.id; // Obtiene el ID del documento directamente
        const estadoActual = doc1.data()['fechaString']; 
        const estadoActual2 = doc1.data()['fechaString']; 

        // if(estadoActual){
        //   this.estadofecha=estadoActual
        // }else{
        //   this.estadofecha=estadoActual

        // }
        // Datos que deseas modificar en el documento
        const placeRef = doc(this.firestore, 'shop', id);
        let fechaString='';
        let fechaString2='';

        if (this.fechaSeleccionada1 !== null) {
        const dia = this.fechaSeleccionada1.getDate().toString().padStart(2, '0'); // Día con dos dígitos
        const mes = (this.fechaSeleccionada1.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos (los meses comienzan desde 0)
        const anio = this.fechaSeleccionada1.getFullYear().toString(); // Año de cuatro dígitos
        fechaString = `${mes}-${dia}-${anio}`;

        } else {
          console.log('La fecha seleccionada es nula.');
        }
        if (this.fechaSeleccionada2 !== null) {
        const dia = this.fechaSeleccionada2.getDate().toString().padStart(2, '0'); // Día con dos dígitos
        const mes = (this.fechaSeleccionada2.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos (los meses comienzan desde 0)
        const anio = this.fechaSeleccionada2.getFullYear().toString(); // Año de cuatro dígitos
        fechaString2 = `${mes}-${dia}-${anio}`;

        } else {
          console.log('La fecha2 seleccionada es nula.');
        }
        const newData = {
          desh_fecha_inicio:fechaString,
          desh_fecha_fin:fechaString2
        
        };
        updateDoc(placeRef, newData)
          .then(() => {
            console.log('Documento modificado correctamente');
            alert(this.id+" deshabilitado desde "+fechaString+" hasta "+fechaString2);
            this.estadofecha="Negocio deshabilitado desde (mm/dd/yyyy): "+fechaString+" hasta: "+fechaString2+"."

            // this.router.navigateByUrl('/'); // Reemplaza 'ruta-destino' por la ruta a la que deseas ir
            this.hab_btn2=false
            this.hab_btn1=true


          })
          .catch((error) => {
            console.error('Error al modificar el documento: ', error);
          });
      });
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }


  }



  async btn_habilitar(){
    const queryRef = collection(this.firestore, 'shop');
    const filteredQuery = query(queryRef, where('name', '==', this.id));
    try {
      const querySnapshot =  getDocs(filteredQuery);
      (await (querySnapshot)).forEach((doc1) => {
        const id = doc1.id; // Obtiene el ID del documento directamente
        // Datos que deseas modificar en el documento
        const placeRef = doc(this.firestore, 'shop', id);
        let fechaString='';
        let fechaString2='';

        // if (this.fechaSeleccionada1 !== null) {
        // const dia = this.fechaSeleccionada1.getDate().toString().padStart(2, '0'); // Día con dos dígitos
        // const mes = (this.fechaSeleccionada1.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos (los meses comienzan desde 0)
        // const anio = this.fechaSeleccionada1.getFullYear().toString(); // Año de cuatro dígitos
        // fechaString = `${mes}-${dia}-${anio}`;

        // } else {
        //   console.log('La fecha seleccionada es nula.');
        // }
        // if (this.fechaSeleccionada2 !== null) {
        // const dia = this.fechaSeleccionada2.getDate().toString().padStart(2, '0'); // Día con dos dígitos
        // const mes = (this.fechaSeleccionada2.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos (los meses comienzan desde 0)
        // const anio = this.fechaSeleccionada2.getFullYear().toString(); // Año de cuatro dígitos
        // fechaString2 = `${mes}-${dia}-${anio}`;

        // } else {
        //   console.log('La fecha2 seleccionada es nula.');
        // }
        const newData = {
          desh_fecha_inicio:'',
          desh_fecha_fin:''
        
        };
        updateDoc(placeRef, newData)
          .then(() => {
            console.log('Documento modificado correctamente');
            alert(this.id+"habilitado de manera normal.");
            this.estadofecha=this.id+" habilitado de manera normal."

            // this.router.navigateByUrl('/'); // Reemplaza 'ruta-destino' por la ruta a la que deseas ir
            this.hab_btn2=true
            this.hab_btn1=false


          })
          .catch((error) => {
            console.error('Error al modificar el documento: ', error);
          });
      });
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }
  }
}
