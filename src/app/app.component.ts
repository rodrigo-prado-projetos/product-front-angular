import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActionEnum } from './enum/ActionEnum';
import { Products } from './model/product';
import { Security } from './model/security';
import { ProductService } from './service/ProductService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private productService: ProductService) {
    this.segurancaLogin()
  }
  title = 'angular-products';
  selecionarPerfil = true;
  funcionalidade = false;
  options: any;
  // input
  input: any;
  inputDescricao: any;
  inputMarca: any;
  inputValor: any;
  inputId: any;
  security = {};
  response: Security | any
  products: Products | any
  mostrarTabelaDeProdutos = false;
  optionsFuncionalidade: any;
  administrator = false;
  usuario = false;
  isIdInformado = false;
  isBuscarProdutoPorId = false;
  isInserirProduto = false;
  isAlterarProduto = false;
  isExcluirProduto = false;

  perfil(): void {
    if (this.options !== undefined) {
      if (this.options === 'usuario') {
        this.usuario = true;
      } else {
        this.administrator = true;
      }
      this.selecionarPerfil = false;
      this.funcionalidade = true;
    }
  }

  voltarParaSelecionarPerfil() {
    this.selecionarPerfil = true;
    this.funcionalidade = false;
    this.options = undefined;
    this.administrator = false;
    this.usuario = false;
    this.isBuscarProdutoPorId = false;
    this.isInserirProduto = false;
    this.isAlterarProduto = false;
    this.isExcluirProduto = false
    this.mostrarTabelaDeProdutos = false;
    this.input = undefined;
  }

  selecionarFuncionalidade(optionsFuncionalidade: string) {
    if (optionsFuncionalidade === 'buscarTodosOsProdutos') {
      this.buscarTodosOsProdutos()
      this.isBuscarProdutoPorId = false;
      this.isInserirProduto = false;
    } else if (optionsFuncionalidade === 'buscarProdutoPorId') {
      this.isBuscarProdutoPorId = true;
      this.isInserirProduto = false;
      this.mostrarTabelaDeProdutos = false;
    } else if (optionsFuncionalidade === 'inserirProduto') {
      this.isInserirProduto = true;
      this.isAlterarProduto = false;
      this.isBuscarProdutoPorId = false;
      this.mostrarTabelaDeProdutos = false;
    } else if (optionsFuncionalidade === 'alterarProduto') {
      this.isAlterarProduto = true;
      this.isInserirProduto = false;
      this.isBuscarProdutoPorId = false;
      this.mostrarTabelaDeProdutos = false;
    } else if (optionsFuncionalidade === 'excluirProduto') {
      this.isExcluirProduto = true;
      this.isAlterarProduto = false;
      this.isInserirProduto = false;
      this.isBuscarProdutoPorId = false;
      this.mostrarTabelaDeProdutos = false;
    } else {
      console.log('Funcionalidade não conhecida...')
    }
  }

  excluirProdutoPorId() {
    if (this.input === undefined) {
      this.isIdInformado = true;
    } else {
      let headersGet = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer '.concat(this.response?.token))
      this.productService.call(
        'https://appnoderodri.herokuapp.com/api/produtos/'.concat(this.input),
        null,
        headersGet,
        ActionEnum.DELETE).then(result => {
          this.isExcluirProduto = false;
          this.input = undefined;
        }).catch(ex => {
          console.log('Ocorreu um erro na chamada do serviço: '.concat(ex))
        })
    }
  }

  alterarProduto() {
    const body = {
      "descricao": this.inputDescricao,
      "valor": this.inputValor,
      "marca": this.inputMarca
    }
    let headersGet = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer '.concat(this.response?.token))

    this.productService.call(
      'https://appnoderodri.herokuapp.com/api/produtos/'.concat(this.inputId),
      body,
      headersGet,
      ActionEnum.PUT).then(result => {
        this.isAlterarProduto = false;
        this.inputId = undefined;
        this.inputDescricao = undefined;
        this.inputValor = undefined;
        this.inputMarca = undefined;
      }).catch(ex => {
        console.log('Ocorreu um erro na chamada do serviço: '.concat(ex))
      })
  }

  inserirProduto() {
    const body = {
      "descricao": this.inputDescricao,
      "valor": this.inputValor,
      "marca": this.inputMarca
    }
    let headersGet = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer '.concat(this.response?.token))

    this.productService.call(
      'https://appnoderodri.herokuapp.com/api/produtos',
      body,
      headersGet,
      ActionEnum.POST).then(result => {
        this.isInserirProduto = false;
        this.inputDescricao = undefined;
        this.inputValor = undefined;
        this.inputMarca = undefined;
      }).catch(ex => {
        console.log('Ocorreu um erro na chamada do serviço: '.concat(ex))
      })
  }

  buscarProdutoPorId() {
    this.mostrarTabelaDeProdutos = false;
    if (this.input === undefined) {
      this.isIdInformado = true;
    } else {
      let headersGet = new HttpHeaders()
        .append('Content-Type', 'application/json')
        .append('Authorization', 'Bearer '.concat(this.response?.token))

      this.productService.call(
        'https://appnoderodri.herokuapp.com/api/produtos/'.concat(this.input),
        null,
        headersGet,
        ActionEnum.GET).then(result => {
          this.products = JSON.parse(JSON.stringify(result));
          this.mostrarTabelaDeProdutos = true;
        }).catch(ex => {
          console.log('Ocorreu um erro na chamada do serviço: '.concat(ex))
        })
    }
  }

  buscarTodosOsProdutos() {
    this.mostrarTabelaDeProdutos = false;
    let headersGet = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Authorization', 'Bearer '.concat(this.response?.token))

    this.productService.call(
      'https://appnoderodri.herokuapp.com/api/produtos',
      null,
      headersGet,
      ActionEnum.GET).then(result => {
        this.products = JSON.parse(JSON.stringify(result));
        this.mostrarTabelaDeProdutos = true;
      }).catch(ex => {
        console.log('Ocorreu um erro na chamada do serviço: '.concat(ex))
      })
  }

  segurancaLogin() {
    let headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    const body = {
      "login": "admin",
      "senha": "1234"
    }

    this.productService.call(
      'https://appnoderodri.herokuapp.com/api/seguranca/login',
      body,
      headers,
      ActionEnum.POST).then(result => {
        this.response = JSON.parse(JSON.stringify(result));
      }).catch(ex => {
        console.log('Ocorreu um erro na chamada do serviço: '.concat(ex))
      })
  }
}