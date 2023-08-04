import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, Timestamp, collection, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ReservaInterface } from 'src/app/interfaces/reserva.interface';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-citas-list',
  templateUrl: './citas-list.component.html',
  styleUrls: ['./citas-list.component.css']
})
export class CitasListComponent implements OnInit{
  id = '';
  uid2:string="";
  name2:string="";
  mail:string="";
  cats: ReservaInterface[];
  resultados: any[] ; // Array para almacenar los resultados
  resultadosShop: any[] ; // Array para almacenar los resultados

  constructor(
    private reservasService: ReservasService,
    private route:ActivatedRoute, 
    private firestore:Firestore,

    ){
      this.cats = [{
        cliente_comentario_r: '',
        celular_r: '',
        salon_r: '',
        servicio_r: '',
        cliente_r:'',
        especialista_r:'',
        fechahora_r:Timestamp.fromDate(new Date()),
        photo_r: 'assets/bys.jpg',
        opinion_r:'',
        calificacion_r:0,
        correo_r:'',
        oculto:'',
      }];
      this.resultados=[];
      this.resultadosShop=[];

    }
  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const name=user.displayName;
        // const mail=user.email;

        console.log("uid de usuario:>> "+uid+" name: "+name+" mail: "+user.email);
        this.uid2=uid;
        this.name2=name!;
        this.mail=user.email!;  
      } else {
        // User is signed out
        // ...
      }
    }); 
    const id = this.route.snapshot.paramMap.get('id_socio');
    this.id = id !== null ? id : '';
    this.reservasService.getReservasSocio(this.id).subscribe(cat => {
      this.cats = cat;
      console.log("consulta la lista :"+this.uid2)

    })

    this.get_image_shop(this.id);

  }
    convertirATextoFecha(timestamp: Timestamp): string {
      const date = timestamp.toDate();
      return date.toLocaleDateString(); // Ajusta el formato según tus necesidades
    }
    convertirAHora(timestamp: Timestamp): string {
      const date = timestamp.toDate();
      return date.toLocaleTimeString(); // Ajusta el formato según tus necesidades
    }
    convertirAHora2(timestamp: Timestamp): string {
      const date = timestamp.toDate();
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false // Ajusta a `false` si deseas usar formato de 24 horas
      };
      return date.toLocaleTimeString(undefined, options);
    }
    // aun no funciona
    convertirCaracter(timestamp: string): string {
      console.log("shop::: "+timestamp)

      let date = timestamp.replace("&","y")
      //  date = timestamp.replace("&","y")
      console.log("shop2::: "+date)
      // const textoOriginal = "Monish Lash & Spa";
      // const textoReemplazado = textoOriginal.replace("&", "y");
      // console.log(textoReemplazado); // Imprime "Monish Lash y Spa"
      

      return date;
    }
    ocultar_reserva(id:string){
      alert("Reserva Oculta");
      const placeRef = doc(this.firestore, 'Bookings', id);
      // Datos que deseas modificar en el documento
      const newData = {
        oculto: 'si',
      };
      updateDoc(placeRef, newData)
        .then(() => {
          console.log('Documento modificado correctamente');
        })
        .catch((error) => {
          console.error('Error al modificar el documento: ', error);
        });
    }    
    // para mostrar la imagen del negocio en el titulo
    async get_image_shop( id_name_shop: string) {
      const queryRef = collection(this.firestore, 'shop');
      // const filteredQuery = query(queryRef, where('name', '==', servicio), where('shop', '==', id_name_shop));
  
        const filteredQuery = query(queryRef, where('name', '==', id_name_shop));
        try {
          const querySnapshot = await getDocs(filteredQuery);
          this.resultados = []; // Limpiar el array antes de llenarlo con los nuevos resultados
    
          querySnapshot.forEach((doc) => {
            // const id = doc.id;
            // const visible = doc.data()['visible'];
            const foto_shop =  doc.data()['photo'];

    
            this.resultados.push({ foto_shop }); // Agregar el resultado al array
          });
        } catch (error) {
          console.error('Error al obtener los documentos:', error);
        }
    }



}
