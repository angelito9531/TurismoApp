export class LugarTuristico {
  public _id: string;
  public nombre: string;
  public ubicacion_fisica: string;
  public descripcion: string
  public ubicacion: {
    lat: number,
    lng: number
  };
  public tipo: string;
  public id_administrador: string;
  public id_promociones:string;
}