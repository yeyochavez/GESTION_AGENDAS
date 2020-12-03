import {Injectable} from "@angular/core";
import Formulario from "../models/formulario.model";
import EstudianteRequest from "../models/estudiante_request.model";
import {EstudianteTable} from "../util/interface_tables/estudiante_table.interface";
import {FormularioTable} from "../util/interface_tables/formulario_table.interface";
import * as moment from "moment";
import SolicitudResponse from "../models/solicitud_response.model";
import {SolicitudTable} from "../util/interface_tables/solicitud_table.interface";
import SolicitudEstudiante from "../models/solicitud_estudiante.model";
import {AutorizacionTable} from "../util/interface_tables/autorizacion_table.interface";
import DirectorResponse from "../models/director_response.model";
import {DirectorTable} from "../util/interface_tables/director_table.interface";

@Injectable()
export class ConverterService {

  constructor() {
  }

  converterToTableEstudiantes(listEstudiantes: EstudianteRequest[]): EstudianteTable [] {
    let auxList = new Array<EstudianteTable>();
    for (let est of listEstudiantes) {
      let estTable: EstudianteTable = {
        id: est.estudiante_data.id,
        codigo: est.estudiante_data.codigo_estudiante,
        nombre: est.estudiante_data.nombre_estudiante,
        correo: est.estudiante_data.correo_estudiante
      }
      auxList.push(estTable)
    }
    return auxList;
  }

  converterToTableDirector(listDirectores: DirectorResponse[]): DirectorTable [] {
    let auxList = new Array<DirectorTable>();
    for (let dir of listDirectores) {
      let dirTable: DirectorTable = {
        id: dir.usuario.id,
        codigo: dir.codigo_director,
        nombre: dir.usuario.nombre,
        correo: dir.usuario.correo,
      }
      auxList.push(dirTable)
    }
    return auxList;
  }


  converterToTableFormularios(listFormularios: Formulario[]): FormularioTable [] {
    let auxList = new Array<FormularioTable>();
    for (let form of listFormularios) {
      let formTable: FormularioTable = {
        id: form.id,
        nombre: form.nombre_formulario,
        creacion: moment(form.fecha_registro).format("YYYY-MM-DD"),
      }
      auxList.push(formTable)
    }
    return auxList;
  }

  converterToTableSolicitudes(listSolicitudes: SolicitudResponse[]): SolicitudTable [] {
    let auxList = new Array<SolicitudTable>();
    for (let sol of listSolicitudes) {
      let estTable: SolicitudTable = {
        id: sol.id,
        fecha: moment(sol.horario_data.fecha_horario).format("YYYY-MM-DD"),
        horaInicio: this.formatHora(sol.horario_data.inicio_horario),
        horaFin: this.formatHora(sol.horario_data.fin_horario),
        estudiantes: this.estudiantesAsesoria(sol.estudiantes_data)
      }
      auxList.push(estTable)
    }
    return auxList;
  }

  converterToTableAutorizaciones(listSolicitudes: SolicitudResponse[]): AutorizacionTable [] {
    let auxList = new Array<AutorizacionTable>();
    for (let sol of listSolicitudes) {
      let estTable: AutorizacionTable = {
        id: sol.id,
        fecha: moment(sol.horario_data.fecha_horario).format("YYYY-MM-DD"),
        horaInicio: this.formatHora(sol.horario_data.inicio_horario),
        horaFin: this.formatHora(sol.horario_data.fin_horario),
        estudiantes: this.estudiantesAsesoria(sol.estudiantes_data)
      }
      auxList.push(estTable)
    }
    return auxList;
  }

  /***AUXILIARES****/
  formatHora(hora: string): string {
    return hora.split(':')[0] + ":" + hora.split(':')[1];
  }

  estudiantesAsesoria(estudiantes_data: SolicitudEstudiante[]) {
    let estudiantesAux = '';
    if (estudiantes_data.length >= 0) {
      if (estudiantes_data.length == 1) {
        estudiantesAux = estudiantes_data[0].nombre_estudiante;
      } else {
        estudiantesAux = estudiantes_data[0].nombre_estudiante + "...";
      }
    }
    return estudiantesAux;
  }

}
