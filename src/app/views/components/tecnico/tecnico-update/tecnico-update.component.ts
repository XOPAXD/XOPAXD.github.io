import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {
  id_tec = ''

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
              private service:TecnicoService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  update():void{
    this.service.update(this.tecnico).subscribe(resposta =>{
      this.router.navigate(['tecnicos']);
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
    this.service.findById(this.id_tec).subscribe(resposta => {
      this.tecnico = resposta;
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
