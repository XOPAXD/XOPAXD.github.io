import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements  OnInit {

  
  lista: OS[] = [];

  displayedColumns: string[] = ['id' ,'tecnico','cliente','dataAbertura', 'dataFechamento','prioridade','status','action'];
  dataSource = new MatTableDataSource<OS>(this.lista);

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private osservice:OsService,
              private router:Router,
              private tecnicoservice:TecnicoService,
              private clienteservice:ClienteService,
              private route:ActivatedRoute){
                 
              }

  ngOnInit() {
    this.findAll(); 
  }

  

  findAll():void{
    this.osservice.findAll().subscribe((resposta) => {
        //this.lista = resposta;
        resposta.forEach(x=>{
          if(x.status != 'ENCERRADO'){
            this.lista.push(x);
          }
        });

        this.listarTecnico();
        this.listarCliente();
        this.dataSource = new MatTableDataSource<OS>(this.lista);
        this.dataSource.paginator = this.paginator;
    })
  }

  listarTecnico():void{
    this.lista.forEach(x => {
      this.tecnicoservice.findById(x.tecnico).subscribe(resposta =>{
        x.tecnico = resposta.nome;
      })
    })
  }

  listarCliente():void{
    this.lista.forEach(x => {
      this.clienteservice.findById(x.cliente).subscribe(resposta =>{
        x.cliente = resposta.nome;
      })
    })
  }

  prioridade(x : any){
    
    if(x == "BAIXA"){
      
        return 'baixa'
    }else if(x == "MEDIA"){
        return 'media'
    }else{
        return 'alta'
    }
  }

  navigateToCreate():void{
      this.router.navigate(['os/create'])
  }
}