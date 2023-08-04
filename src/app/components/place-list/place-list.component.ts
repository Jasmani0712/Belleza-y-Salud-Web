import { Component, OnInit } from '@angular/core';
import { Storage,getDownloadURL,listAll,ref, uploadBytes } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import Place from 'src/app/interfaces/place.interface';
import { PlacesService } from 'src/app/services/places.service';
import { ComunicacionesService } from 'src/app/servicios/comunicaciones.service';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit{
  places: Place[];
  images: string[];
  contador:number =0;
  id = '';

  constructor(
    private placesService: PlacesService,private storage: Storage,
    private comunicaionesService:ComunicacionesService,
    private router2:Router,private route:ActivatedRoute

  ) {
    this.places = [{
      name: 'Prueba de sitio',
      description: 'Esto es una prueba',
      latitude: 40,
      longitude: -3,
      image: 'https://media.timeout.com/images/105718969/750/422/image.jpg'
    }];
    this.images = [];

  }
  ngOnInit(): void {
    this.placesService.getPlaces().subscribe(places => {
      this.places = places;
      console.log("place siisisi :"+this.places[0].name)

    })

       // this.id=this.route.snapshot.paramMap.get('id');
       const id = this.route.snapshot.paramMap.get('id');
       this.id = id !== null ? id : '';
      //  console.log("place siisisi f"+this.places[0].name)

  }

  async onClickDelete(place: Place) {
    const response = await this.placesService.deletePlace(place);
    console.log(response);
  }
  async onClickUpdate(place: Place) {
    const response = await this.placesService.updatePlace(place);
    console.log(response);
  }


//storage
  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `images/${file.name}`);

    uploadBytes(imgRef, file)
      .then(response => {
        console.log(response)
        this.getImages();
      })
      .catch(error => console.log(error));

  }
  getImages() {
    const imagesRef = ref(this.storage, 'images');

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

  pasarDatos(flag: boolean){
    if (flag) {
      this.contador ++;
    }
    else{
      this.contador --;

    }
    // this.comunicaionesService.contador.emit(this.contador);
  }
}
