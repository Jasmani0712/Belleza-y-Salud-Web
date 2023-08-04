import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { MatCalendar, MatCalendarCellCssClasses, MatDatepickerInputEvent  } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { CalendarEvent, CalendarView } from 'angular-calendar';

declare var $: any;

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css'],
  // standalone: true,
})
export class FechaComponent  implements OnInit {

  viewDate: Date = new Date(); // Suponiendo que viewDate es una propiedad de tipo Date en tu componente

  onViewDateChange2(event: Date) {
    // Aquí puedes manejar la fecha seleccionada
    console.log('Fecha seleccionada:', event);
    
  }

  events: any[] = []; // Aquí defines la propiedad events como un arreglo vacío o con el tipo adecuado para tus eventos

  view: string = 'month'; // Puedes ajustar el valor según el tipo de vista que desees
  // viewDate: Date = new Date(); // Inicializa la variable viewDate con la fecha actual

  onViewDateChange(newDate: Date | null): void {
    if (newDate) {
      this.viewDate = newDate;
      // Aquí puedes realizar cualquier acción adicional que necesites cuando cambia la fecha de vista
    }
  }

  selected!: Date | null;
  id = '';
  servicio='';
  especialista='';
  foto_shop:string;
  fechaSeleccionada1: string;
  fechaSeleccionada2: string;
  loading = true;

  // @ViewChild('datepickerInput') datepickerInput!: ElementRef;
  @ViewChild('datepickerInput') datepickerInput!: MatCalendar<any>;


  constructor(

    private route:ActivatedRoute,    private firestore:Firestore, private _elementRef:ElementRef, private router:Router,


  ) {     this.foto_shop='';
  this.fechaSeleccionada1=''
  this.fechaSeleccionada2=''
  
  }
 
  async ngOnInit() {
    // Simula el proceso de carga, esto puede ser una llamada a una API o cualquier proceso asincrónico
    this.simularCarga().then(() => {
      // Después de 5 segundos, oculta la capa de carga y habilita la interacción con la página
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
    this.calendarioHabilitado = false;


    const id = this.route.snapshot.paramMap.get('id');
    this.id = id !== null ? id : '';
    const servicio = this.route.snapshot.paramMap.get('servicio');
    this.servicio = servicio !== null ? servicio : '';
    const especialista = this.route.snapshot.paramMap.get('especialista');
    this.especialista = especialista !== null ? especialista : '';
    this.obtener_fechas();

    
    // console.log(this.id+" y "+this.servicio+" y "+this.especialista);

    // $(this.datepickerInput.nativeElement).datepicker();

    // this.selected=0;
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
  simularCarga(): Promise<void> {
    return new Promise<void>(resolve => {
      // Simula el proceso de carga aquí
      // Por ejemplo, puedes hacer una llamada a una API con un delay
      setTimeout(() => {
        resolve();
      }, 1000); // Simula una carga de 3 segundos (ajusta el tiempo según tus necesidades)
    });
  }

  // dateClassCallback(date: Date): string {
  //   if (date.getDay() === 0) { // 0 representa el domingo
  //     return 'disabled'; // Clase CSS para deshabilitar el estilo de los domingos
  //   }
  //   return '';
  // }

  dateFilterCallback2(date: Date): boolean {
    return date.getDay() !== 0; // Devuelve false (no disponible) si la fecha es un domingo
  }

  // dateFilterCallback(date: Date): boolean {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo las fechas

  //   return date >= today; // Devuelve false (no disponible) si la fecha es anterior a la fecha actual
  // }
  dateClassAndFilterCallback(date: Date): MatCalendarCellCssClasses {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo las fechas
    if (date.getDay() === 0) { // 0 representa el domingo
      return 'disabled';
    }
    if (date < today) {
      return 'disabled';
    }
    return '';
  }

  dateFilter:any

  calendarioHabilitado:boolean=false ;

  async obtener_fechas(){
    
    this.calendarioHabilitado = true;




    const queryRef = collection(this.firestore, 'shop');
    const filteredQuery = query(queryRef, where('name', '==', this.id));
    try {
      const querySnapshot =  getDocs(filteredQuery);
      (await ((querySnapshot))).forEach((doc1) => {
        const id = doc1.id; // Obtiene el ID del documento directamente

        this.fechaSeleccionada1=doc1.data()['desh_fecha_inicio'];   
        this.fechaSeleccionada2=doc1.data()['desh_fecha_fin'];  
        console.log("siisis    console.log(this.fechaSeleccionada1) :"+this.fechaSeleccionada1)

       
      });
    } catch (error) {
      console.error('Error al obtener los documentos:', error);
    }








    this.dateFilter = (date: Date | null): boolean => {
      // this.obtener_fechas();
  
      if (date !== null) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo las fechas
    
        const isSunday = date.getDay() === 0; // Verificar si es domingo, 0 es domingo
        const isPastDate = date < today; // Verificar si es una fecha anterior a la fecha actual
    
        // Fechas de inicio y fin del rango deshabilitado
        // const fechaInicio = new Date('2023-08-08');
        // const fechaFin = new Date('2023-08-29');
        const fechaInicio = new Date(this.fechaSeleccionada1);
        const fechaFin = new Date(this.fechaSeleccionada2);
        // Convertir la fecha seleccionada a objeto Date
        const fechaSeleccionada = new Date(date);
        console.log(" fechas1 :"+this.fechaSeleccionada1)
  
        // Comprobar si la fecha está dentro del rango deshabilitado
        const isDisabledRange = fechaSeleccionada >= fechaInicio && fechaSeleccionada <= fechaFin;
    
        return !isSunday && !isPastDate && !isDisabledRange;
      }else{
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo las fechas
    
        // const isSunday = date.getDay() === 0; // Verificar si es domingo, 0 es domingo
        // const isPastDate = date < today; // Verificar si es una fecha anterior a la fecha actual
    
        // Fechas de inicio y fin del rango deshabilitado
        // const fechaInicio = new Date('2023-08-08');
        // const fechaFin = new Date('2023-08-29');
  
        const fechaInicio = new Date(this.fechaSeleccionada1);
        const fechaFin = new Date(this.fechaSeleccionada2);
        // Convertir la fecha seleccionada a objeto Date
        const fechaSeleccionada = new Date();
    
        // Comprobar si la fecha está dentro del rango deshabilitado
        const isDisabledRange = fechaSeleccionada >= fechaInicio && fechaSeleccionada <= fechaFin;
    
        return  !isDisabledRange;
      }
    
      return false; // Devolver false si la fecha es null (no se deshabilita ninguna fecha)
    };










    
  }

  dateFilter2 = (date: Date | null): boolean => {
    // Lista de fechas deshabilitadas (puedes obtenerlas de tu base de datos o cualquier otra fuente)
    const disabledDates = [
      new Date( this.fechaSeleccionada1),
      new Date( this.fechaSeleccionada2),
      new Date('08-08-2023'),
      new Date('08-29-2023'),

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

  dateFilter_rango = (date: Date | null): boolean => {

    
    // Fechas de inicio y fin del rango deshabilitado
    const fechaInicio = new Date('2023-08-08');
    const fechaFin = new Date('2023-08-29');
  
    // Si la fecha es nula, no se deshabilita
    if (!date) {
      return true;
    }
  
    // Convertir la fecha seleccionada a objeto Date
    const fechaSeleccionada = new Date(date);
  
    // Comprobar si la fecha está dentro del rango deshabilitado
    if (fechaSeleccionada > fechaInicio && fechaSeleccionada <= fechaFin) {
      return false; // La fecha está dentro del rango deshabilitado, se deshabilita
    }
  
    return true; // La fecha no está dentro del rango deshabilitado, no se deshabilita
  };


// dateFilterCallback(date: Date): boolean {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo las fechas

//   return date >= today;
// }
maxDate: Date = new Date();
onDateChange(event: MatDatepickerInputEvent<Date>) {
  // Aquí puedes realizar cualquier acción que necesites cuando la fecha cambia
  console.log('Fecha seleccionada:', event.value);
  console.log("    console.log(this.fechaSeleccionada1) :"+this.fechaSeleccionada1)

}
dateFilterCallback(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo las fechas

  const isSunday = date.getDay() === 0; // Verificar si es domingo, 0 es domingo
  const isPastDate = date < today; // Verificar si es una fecha anterior a la fecha actual

  return !isSunday && !isPastDate ; // Devolver true si no es domingo y no es una fecha pasada
}
// ngAfterViewInit() {
  //   const today = new Date();
  //   this.datepickerInput.nativeElement.min = today.toISOString().split('T')[0];
  // }

  // ngAfterViewInit() {
  //   const today = new Date();
  //   this.selected = today; // Establece la fecha mínima inicialmente
  //   this.datepickerInput.minDate = today;
  // }

  // validateDate(event: any) {
  //   const selectedDate = new Date(event.target.value);
  //   const today = new Date();
  
  //   if (selectedDate < today) {
  //     event.target.value = null;
  //     this.selected = null; // Reinicia el valor de selected
  //   } else {
  //     const id = this.id;
  //     const servicio = this.servicio;
  //     const especialista = this.especialista;
  
  //     const formattedDate = `${selectedDate.getFullYear()}-${this.padNumber(selectedDate.getMonth() + 1)}-${this.padNumber(selectedDate.getDate())}`;
  
  //     this.router.navigate(['/horario', id, servicio, especialista, formattedDate]);
  //   }
  // }
  
  // padNumber(number: number): string {
  //   return number.toString().padStart(2, '0');
  // }
  // validateDate(event: any) {
  //   const selectedDate = new Date(event.target.value);
  //   const today = new Date();

  //   if (selectedDate < today) {
  //     event.target.value = null;
  //   }
  // }


}