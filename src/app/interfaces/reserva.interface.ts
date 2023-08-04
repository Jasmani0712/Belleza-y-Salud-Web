import { Timestamp } from "@angular/fire/firestore";

export interface ReservaInterface {
    id?:string;
    // name:string;
    // adress:string;
    // attention_days:string;
    // category:Array<any>;
    // cel:string;
    // city:string;
    // description:string;
    // face:string;
    // hora_fin:string;
    // hora_inicio:string;
    // insta:string;
    // map:string;
    // map_link:string;
    // photo:string;
    // tiktok:string;
    // visible:boolean

    celular_r:string;
    cliente_comentario_r:string;
    // cliente_id_r:string;
    cliente_r:string;
    correo_r:string;
    especialista_r:string;
    fechahora_r:Timestamp;
    photo_r:string;
    salon_r:string;
    servicio_r:string;
    // timestamp:Date;
    opinion_r:string;
    calificacion_r:number;
    oculto:string;
}
