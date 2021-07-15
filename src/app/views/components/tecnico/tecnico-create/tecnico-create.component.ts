import { TypeCheckCompiler } from '@angular/compiler/src/view_compiler/type_check_compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {
  tecnico: Tecnico = {
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
              private service:TecnicoService) { }

  ngOnInit(): void {
  }
  create():void{
    this.service.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos'])
      this.service.message('Técnico criado com sucesso')
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
