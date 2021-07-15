import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';



@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent implements OnInit {

  selTecnico = '';
  selCliente = '';
  selStatus:any;
  selPrioridade:any;

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
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
     this.os.id = this.route.snapshot.paramMap.get('id');
     
     this.findByid();
     this.listarTecnicos();
     this.listarClientes();
  }

  findByid():void{
      this.osservice.findById(this.os.id).subscribe(resposta =>{
        this.os = resposta;
        console.log(" seltec "+resposta.status)
        this.selTecnico = resposta.tecnico.toString();
        this.selCliente = resposta.cliente.toString();
        this.converteDados();
        this.selStatus = this.os.status.toString();
        this.selPrioridade = this.os.prioridade.toString();
       

        
      })
  }

  update():void{
    this.osservice.update(this.os).subscribe(resposta => {
      this.osservice.message("Ordem de Serviço Atualizada com sucesso!")
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

  converteDados():void{
    if(this.os.status == "ABERTO"){
      this.os.status = 0
    }else if(this.os.status == "ANDAMENTO"){
      this.os.status = 1
    }else{
      this.os.status = 2
    }

    if(this.os.prioridade == "BAIXA"){
      this.os.prioridade = 0
    }else if(this.os.prioridade == "MEDIA"){
      this.os.prioridade = 1
    }else{
      this.os.prioridade = 2
    }
  }
}
