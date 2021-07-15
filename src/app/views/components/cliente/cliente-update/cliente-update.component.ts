import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  id_cli = ''

  cliente: Cliente = {
    nome: '',
    cpf:'',
    telefone:'',
    senha:''
  }

  nome = new FormControl('',Validators.minLength(5));
  cpf = new FormControl('',Validators.required);
  telefone = new FormControl('',Validators.required);
  senha = new FormControl('',Validators.minLength(3));

  constructor(private router:Router,
              private service:ClienteService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cli = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  update():void{
    this.service.update(this.cliente).subscribe(resposta =>{
      this.router.navigate(['clientes']);
      this.service.message('O Registro foi atualizado com sucesso!');
    }, err => {
      console.log(err)
      if(err.error.error.match('já cadastrado ')){
        this.service.message(err.error.error)
      }else if(err.error.errors[0].message === 'número do registro de contribuinte individual brasileiro (CPF) inválido'){
        this.service.message(err.error.errors[0].message)
      }
    })
  }

  findById():void{
    this.service.findById(this.id_cli).subscribe(resposta => {
      this.cliente = resposta;
    })
  }

  validaNome(){
    if(this.nome.invalid){
      return 'O nome deve conter no minímo 5 caracteres'
    }
    return false;
  }

  validaCpf(){
    if(this.cpf.invalid){
      return 'O cpf não pode ser vazio'
    }
    return false;
  }

  validaTelefone(){
    if(this.telefone.invalid){
      return 'O telefone não pode ser vazio'
    }
    return false;
  }

  validaSenha(){
    if(this.senha.invalid){
      return 'O senha deve conter no minímo 14 caracteres'
    }
    return false;
  }

  cancel():void{
    this.router.navigate(['clientes'])
  }

}
