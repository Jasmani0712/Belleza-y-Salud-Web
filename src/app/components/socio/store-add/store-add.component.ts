import { Component, OnInit } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { DocumentReference, Firestore, Timestamp, addDoc, collection, doc, getDocs, getFirestore, query, serverTimestamp, setDoc, where } from '@angular/fire/firestore';
import { Storage,StorageReference, getDownloadURL, listAll, ref, uploadBytes } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-store-add',
  templateUrl: './store-add.component.html',
  styleUrls: ['./store-add.component.css']
})
export class StoreAddComponent implements OnInit{
  id='';
  foto_shop:string;
  formulario: FormGroup;
  selectedImage: File | undefined ;
  // imageUrl: string = '';
  images: string[];
  imageUrl: string | ArrayBuffer = '';
  url_image_storage:string='';
  constructor(
    private firestore:Firestore, 
    private route:ActivatedRoute,
    // private r:FirebaseApp,
    //  private dialog: MatDialog,
    private router: Router,
    private storage: Storage,
  )   {  
  this.formulario = new FormGroup({
  //   celular_r: new FormControl(),
  //   cliente_comentario_r: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    name:new FormControl(),
    photo:new FormControl(),

    // image: new FormControl()
  })

  this.foto_shop='';
  this.images = [];

  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id_socio');
    this.id = id !== null ? id : '';
    this.img_shop()  
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
  async onSubmit(url:string) {
    try {
      const data = {
        // Define los campos y valores del documento que deseas agregar         
        title:this.formulario.get('title')!.value,
        description:this.formulario.get('description')!.value,
        price:this.formulario.get('price')!.value,
        timestamp: serverTimestamp(),
        name:this.id,
        photo:url,
      };   
      // const queryRef = collection(this.firestore, 'store');
      // const queryRef2 = doc(queryRef, 'galery');
      // const queryRef3 = collection(queryRef2, this.id);

      // // Crear un ID personalizado que incluya la fecha actual
      // const date = new Date();
      // const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      // const idWithDate = `${formattedDate}-${queryRef.doc().id}`;
      // const firebaseApp = initializeApp(firebaseConfig)

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Los meses se indexan desde 0, por lo que sumamos 1 para obtener el valor real.
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      const id=`${year}${month}${day}_${hours}${minutes}${seconds}`+this.formulario.get('title')!.value
      await setDoc(doc(this.firestore, "store", id), {
        title:this.formulario.get('title')!.value,
        description:this.formulario.get('description')!.value,
        price:this.formulario.get('price')!.value,
        timestamp: serverTimestamp(),
        name:this.id,
        photo:url,
      })

      // addDoc(queryRef, data)
      .then(() => {
        window.alert('Producto agregado correctamente!');
        this.router.navigate(['/admin-socio/'+this.id]);
      })
      .catch((error) => {
        window.alert('Error al agregar la imagen');
      });      
    } catch (error) {
      console.error('Error en la galería', error);
    }
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    // Mostrar la imagen seleccionada antes de cargarla.
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = e => {
        if (typeof e.target!.result === 'string' || e.target!.result instanceof ArrayBuffer) {
          this.imageUrl = e.target!.result;
        }
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      this.imageUrl = '';
    }
  }
  
  //storage
  uploadImage($event: any) {
    // const file = $event.target.files[0];
    const file = this.selectedImage;
    console.log(file);
    const imgRef = ref(this.storage, `images/${file!.name}`);
    uploadBytes(imgRef, file!)
      .then(response => {
        console.log(response)
        // this.getImages();
        this.getDownloadURL(imgRef); // Obtener URL de descarga      
      })
      .catch(error => alert(error)
      );
  }

  getImages() {
    const imagesRef = ref(this.storage, 'store');
    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.images = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
      })
      .catch(error => console.log(error));
  }

  getDownloadURL(imgRef: StorageReference) {
    getDownloadURL(imgRef)
      .then((url) => {
        console.log("URL de descarga:", url);
        this.url_image_storage=url;
        this.onSubmit(url);
      })
      .catch((error) => {
        console.error("Error al obtener la URL de descarga:", error);
      });
  }
}
