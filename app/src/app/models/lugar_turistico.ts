export class LugarTuristico {
  public nombre: string;
  public ubicacion_fisica: string;
  public descripcion: string
  public ubicacion: {
    lat: number,
    lng: number
  };
  public tipo: string;
  public id_administrador: string;
  public foto: string;
}