import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Storage,getDownloadURL,listAll,ref, uploadBytes } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { EspecialistaInterface } from 'src/app/interfaces/especialista.interface';
import { CatService } from 'src/app/services/cat.services';
import { EspecialistaService } from 'src/app/services/especialista.service';
import { ComunicacionesService } from 'src/app/servicios/comunicaciones.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {
   
  cats: EspecialistaInterface[];
  photo: string[];
  contador:number =0;
  id = '';
  servicio='';
  // resultados: any[] ; // Array para almacenar los resultados
  resultados: any[] = [];
  resultados2: any[] = [];
  horasActualizadas: string[] = [];
  especialista='';
  fecha='';
  foto_shop:string;
  miBotonDeshabilitado: boolean = false;
  horaactual:any
  fechaactual:any
  fechastring:any
  constructor(
    private catService: EspecialistaService,
    private comunicaionesService:ComunicacionesService,
    private router2:Router,
    private route:ActivatedRoute,
    private firestore:Firestore

  ) {
    this.cats = [{
      name_especialista: '',
      description: '',
      shop: "",
      photo: 'https://media.timeout.com/images/105718969/750/422/image.jpg'
    }];
    this.photo = [];
    this.resultados=[];
    this.foto_shop='';
  }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id !== null ? id : '';
    const servicio = this.route.snapshot.paramMap.get('servicio');
    this.servicio = servicio !== null ? servicio : '';
    const especialista = this.route.snapshot.paramMap.get('especialista');
    this.especialista = especialista !== null ? especialista : '';
    const fecha = this.route.snapshot.paramMap.get('fecha');
    this.fecha = fecha !== null ? fecha : '';
    console.log(this.id+" y "+this.servicio+" y "+this.especialista);

      //  console.log("cat siisisi f"+this.cats[0].name)
    // this.catService.getEspecialistas(this.id ).subscribe(cat => {
    //   this.cats = cat;
    //   // console.log("cat siisisi :"+this.cats[0].name_especialista)
    // })

    this.getShops2(this.id,this.servicio);
    const queryRef = query(collection(this.firestore, 'shop'),  where('name', '==', this.id));
    try {
     const querySnapshot = await getDocs(queryRef);
     querySnapshot.forEach((doc) => {   
       const foto =  doc.data()['photo'];   
       this.foto_shop=foto;
             console.log("this.foto_shop :"+this.foto_shop)

      });
   } catch (error) {
     console.error('Error al obtener los documentos:', error);
   }
 
  }

  async getShops2(id_name_shop: string,servicio: string) {
    //referencia al negocio
    const queryRef = collection(this.firestore, 'shop');    
    const filteredQuery = query(queryRef, where('name', '==', id_name_shop));

    //referencia al servicio
    const queryRef2 = collection(this.firestore, 'servicios');    
    const filteredQuery2 = query(queryRef2, where('name', '==', servicio));

    //obtengo horarios del negocio y dentro de eso al horario del servicio
    try {
      const querySnapshot = await getDocs(filteredQuery);
      this.resultados = [];        
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const hora_inicio = doc.data()['hora_inicio'];
        const hora_fin = doc.data()['hora_fin'];
        const hora_inicio2 = doc.data()['hora_inicio2'];
        const hora_fin2 = doc.data()['hora_fin2'];
        // const hora_intervalo = doc.data()['hora_intervalo'];//el intervalo es segun el servicio no segun negocio
        this.resultados.push({ id, hora_inicio, hora_fin,hora_inicio2,hora_fin2 });
      });
      
      const querySnapshot2 = await getDocs(filteredQuery2);
      this.resultados2 = [];        
      querySnapshot2.forEach((doc) => {
        const id2 = doc.id;
        const hora_intervalo = doc.data()['hora_intervalo'];
        this.resultados2.push({ id2, hora_intervalo });
      });
      
      //saco horarios  del array
      const array_horarios = this.resultados[0];
      const hora_inicio = array_horarios.hora_inicio;
      console.log("hora inicio: "+hora_inicio);
      const hora_fin = array_horarios.hora_fin;
      console.log("hora fin: "+hora_fin);
      const hora_inicio2 = array_horarios.hora_inicio2;
      console.log("hora inicio1: "+hora_inicio2);
      const hora_fin2 = array_horarios.hora_fin2;
      console.log("hora fin2: "+hora_fin2);
      //saco horarios  del array
      const array_intervalo = this.resultados2[0];
      // const hora_intervalo = array_intervalo.hora_intervalo;
      let hora_intervalo =0;

      console.log("intervalo: "+hora_intervalo);
      // const horaInicio = new Date(id1) 
      // const horaFinal= new Date(id2);
      // const horaIntervalo=hora_intervalo;
      const horaInicio = moment(hora_inicio + ":00", "HH:mm");
      const horaFinal = moment(hora_fin + ":00", "HH:mm");
      const horaInicio2 = moment(hora_inicio2 + ":00", "HH:mm");
      const horaFinal2 = moment(hora_fin2 + ":00", "HH:mm");
      if (horaInicio.isBefore(horaFinal)) {
        const primeraHoraString = horaInicio.format("HH:mm");
        console.log("inicio: "+primeraHoraString); // Imprimir la primera hora sin incrementar
        // this.horasActualizadas.push(primeraHoraString);
        const now = new Date();
        const currentHour = now.getHours().toString().padStart(2, '0');
        const currentMinute = now.getMinutes().toString().padStart(2, '0');
        const currentTime = `${currentHour}:${currentMinute}`;
        // const currentDay = (now.getDay()-1).toString().padStart(2, '0');
        const currentDay = (now.getDate()).toString().padStart(2, '0');
        const currentMonth = (now.getMonth()+1).toString().padStart(2, '0');
        const currentYear = now.getFullYear().toString().padStart(2, '0');
        const currentDate = `${currentDay}/${currentMonth}/${currentYear}`;
        // alert(this.fecha+" y "+currentDate);
        console.log(this.fecha+" y "+currentDate);
        const fecha = new Date(this.fecha);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const formato = `${dia}/${mes}/${anio}`;
        // alert(formato+" y "+currentDate);
        console.log(formato+" y/o "+currentDate);

        while (horaInicio.isBefore(horaFinal) || horaInicio.isSame(horaFinal)) {
          const horaActualizada = horaInicio.add(hora_intervalo, 'minutes');
          const nuevaHoraString = horaActualizada.format("HH:mm");        
          if (horaActualizada.isAfter(horaFinal)) {
            break; // Si la hora actualizada supera la hora final, salir del bucle
          }        
          console.log("Siguiente hora "+nuevaHoraString); // Imprimir la hora actualizada
          // this.horasActualizadas.push(nuevaHoraString);
          // horaInicio.add(1, 'second'); // Agregar 1 segundo para evitar duplicados en la próxima iteración

          //con hora actual un if si da o noo
          //pero eso haria pa todos los dias porque no esta tomando en cuenta la fecha
           //solo entrar al if de hora si la fecha en posterior a hoy, eso es otro if
           // Obtener la hora actual en formato "08:30"
          
          // this.fecha
          // Hora a comparar en formato "08:30"
          // const horaComparar = "18:30";
          this.horaactual=currentTime
          this.fechaactual=currentDate
          this.fechastring=formato
          // Comparar las horas
          if (currentTime > nuevaHoraString) {
            // no funciona en el bucle de los botones
            // if(formato==currentDate){
            //   this.miBotonDeshabilitado = true; // Para deshabilitar el botón
            //   // alert("si")
            // }
            // this.miBotonDeshabilitado = false; // Para habilitar el botón
            this.horasActualizadas.push(nuevaHoraString);
            console.log("La hora actual es mayor que "+nuevaHoraString+" "+this.miBotonDeshabilitado);

          } else if (currentTime < nuevaHoraString) {
            // La hora actual es menor que "08:30"
            this.miBotonDeshabilitado = false; // Para habilitar el botón
            this.horasActualizadas.push(nuevaHoraString);
            console.log("La hora actual es menor que "+nuevaHoraString+" "+this.miBotonDeshabilitado);

          } else {
            // La hora actual es igual a "08:30"
            console.log("La hora actual es igual a "+nuevaHoraString);
          }
          hora_intervalo = array_intervalo.hora_intervalo;
          //  if(nuevaHoraString){
          //  }
        }
      }
      if (horaInicio2.isBefore(horaFinal2)) {
        const primeraHoraString = horaInicio2.format("HH:mm");
        console.log("inicio2: "+primeraHoraString); // Imprimir la primera hora sin incrementar
        this.horasActualizadas.push(primeraHoraString);
      
        while (horaInicio2.isBefore(horaFinal2) || horaInicio2.isSame(horaFinal2)) {
          const horaActualizada = horaInicio2.add(hora_intervalo, 'minutes');
          const nuevaHoraString = horaActualizada.format("HH:mm");        
          if (horaActualizada.isAfter(horaFinal2)) {
            break; // Si la hora actualizada supera la hora final, salir del bucle
          }        
          console.log("Siguiente hora2 "+nuevaHoraString); // Imprimir la hora actualizada
          this.horasActualizadas.push(nuevaHoraString);
          // horaInicio.add(1, 'second'); // Agregar 1 segundo para evitar duplicados en la próxima iteración
        }
      }
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }
    
  }
  
  }
  