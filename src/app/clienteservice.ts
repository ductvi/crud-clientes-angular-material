//Service -> O Angular tem um repósitório onde salva as classes que possamos utilizar e injetar onde precisa.
import { Injectable } from '@angular/core';
import {Cliente} from './cadastro/cliente'

//Decorator
@Injectable({
  providedIn: 'root',
})


export class Clienteservice {
  
  static REPO_CLIENTES = "CLIENTES";
  
  salvar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.push(cliente);
    
    localStorage.setItem(Clienteservice.REPO_CLIENTES, JSON.stringify(storage))
  }

  atualizar(cliente: Cliente){
    const storage = this.obterStorage()
    storage.forEach(c => {
      if(c.id ===  cliente.id){
        Object.assign(c, cliente)
      }
    })
    localStorage.setItem(Clienteservice.REPO_CLIENTES, JSON.stringify(storage))
  }

  deletar(cliente: Cliente): void {
    const storage = this.obterStorage();
    // Filtra mantendo apenas os clientes que possuem ID diferente do informado
    const novaLista = storage.filter(c => c.id !== cliente.id);
      
    localStorage.setItem(Clienteservice.REPO_CLIENTES, JSON.stringify(novaLista));
  }

  pesquisarClientes(nomeBusca: string) : Cliente[] {
    const clientes = this.obterStorage()

    if(!nomeBusca){
      return clientes
    }

    // cliente.nome = "José da Silva"
    // nomeBusca: josé
    // Esse nome emn nome busca tem no nome do cliente?
    return clientes.filter(cliente => cliente.nome?.indexOf(nomeBusca) !== -1)
  }

  buscarClientePorId(id: string) : Cliente | undefined{
    const clientes = this.obterStorage()
    return clientes.find(cliente => cliente.id == id)
  }

  //Criação do local storage
  private obterStorage() : Cliente[] {

    //Criação da variavel do repositorio de clientes, que irá capturar as informações contidas do LocalStorage
    const repositorioClientes = localStorage.getItem(Clienteservice.REPO_CLIENTES)

    //Caso o localStorage já tenha sido criado
    if(repositorioClientes){
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }

    //Lógica para criar o localStorage
    const clientes: Cliente[] = [];

    //Obtém os itens do localStorage em Json e converte para string, e guarda no array clientes
    localStorage.setItem(Clienteservice.REPO_CLIENTES, JSON.stringify(clientes))
    return clientes;
  }
}
