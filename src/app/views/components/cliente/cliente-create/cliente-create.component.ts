import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

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
              private service:ClienteService) { }

  ngOnInit(): void {
  }
  create():void{
    this.service.create(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.service.message('Cliente criado com sucesso')
    }, err => {
      console.log(err)
      if(err.error.error.match('já cadastrado ')){
        this.service.message(err.error.error)
      }else if(err.error.errors[0].message === 'número do registro de contribuinte individual brasileiro (CPF) inválido'){
        this.service.message(err.error.errors[0].message)
      }
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
    this.router.navigate(['tecnicos'])
  }

}
