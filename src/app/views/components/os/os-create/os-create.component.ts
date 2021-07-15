import { Component, OnInit } from '@angular/core';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {
  
  os: OS = {
    tecnico :'',
    cliente:'',
    observacoes:'',
    status:'',
    prioridade:'',
    dataAbertura:'',
    dataFechamento:''
  }

  tecnicos : Tecnico[] = []
  clientes : Cliente[] = []

  constructor(private tecnicoservice:TecnicoService,
              private clienteservice:ClienteService,
              private osservice:OsService,
              private router:Router) { }

  ngOnInit(): void {
     this.listarTecnicos();
     this.listarClientes();
  }
  create():void{
    this.osservice.create(this.os).subscribe(resposta => {
      this.osservice.message("Ordem de Serviço Criada com sucesso!")
      this.router.navigate(['os'])
    })
  }

  listarTecnicos():void{
    this.tecnicoservice.findAll().subscribe(resposta => {
        this.tecnicos = resposta;
    })
  }

  listarClientes():void{
    this.clienteservice.findAll().subscribe(resposta => {
        this.clientes = resposta;
    })
  }

  cancel():void{
    this.router.navigate(['os'])
  }
}
