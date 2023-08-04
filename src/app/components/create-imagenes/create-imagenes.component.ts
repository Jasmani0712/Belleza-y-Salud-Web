import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-create-imagenes',
  templateUrl: './create-imagenes.component.html',
  styleUrls: ['./create-imagenes.component.css']
})
export class CreateImagenesComponent {
  createImagen: FormGroup;
  submitted=false;
  loading=false;
  constructor(private fb: FormBuilder,
              private _imagenService: CategoriaService,
              private router: Router,
              private toastr: ToastrService){
    this.createImagen=this.fb.group({
      Nombre:['',Validators.required],
      Descripcion:['',Validators.required],
      Foto:['',Validators.required]
    })
  }

  ngOnInit():void{}
  agregarImagen(){
    this.submitted=true;
    if(this.createImagen.invalid){
      return;
    }
    const imagen:any={
      nombre:this.createImagen.value.Nombre,
      foto:this.createImagen.value.Foto,
      descripcion:this.createImagen.value.Descripcion,
      fechaCreacion:new Date(),
      fechaActualizacion: new Date()

    }
    // console.log(this.createImagen);
    this.loading=true;
    this._imagenService.agregarImagen(imagen).then(()=>{
      console.log('imagen registrada con exito');
      this.toastr.success('La imagen fue registrada con exito!', 'Imagen Registrada!',{positionClass:'toast-bottom-right'});
      this.loading=false;
      this.router.navigate(['/list-categorias'])
    }).catch(error=>{
      console.log(error);
      this.loading=false;

    })

    // console.log(imagen);

  }
}
