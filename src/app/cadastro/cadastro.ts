import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectChange, MatSelectModule} from '@angular/material/select'
import { Cliente } from './cliente';
import { Clienteservice } from '../clienteservice';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brasilapiservice } from '../brasilapiservice';
import { Estado, Municipio } from '../brasilapi.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    CommonModule,
    FlexLayoutModule, 
    MatCardModule, 
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    MatSelectModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = []
  municipios: Municipio[] = []

  constructor(
    private service: Clienteservice,
    private route: ActivatedRoute,
    private router: Router,
    private brasilApiService: Brasilapiservice
  ) {}

  ngOnInit(): void {
    // Tratamento seguro do queryParamMap
    this.route.queryParamMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        const clienteEncontrado = this.service.buscarClientePorId(id);
        if (clienteEncontrado) {
          this.atualizando = true;
          this.cliente = { ...clienteEncontrado }; // Clona para evitar mutações indesejadas na memória
          if(this.cliente.uf){
            const event = { value: this.cliente.uf}
            this.carregarMunicipios(event as MatSelectChange)
          }
        }
      }
    });

    this.carregarUFs()
  }

  carregarUFs() {
    this.brasilApiService.listarUFs().subscribe({
      next: (listaEstados: Estado[]) => {
        // Ordena alfabeticamente pela sigla antes de atribuir
        this.estados = listaEstados.sort((a, b) => a.sigla.localeCompare(b.sigla));
      },
      error: (erro: any) => {
        console.error('Erro ao carregar UFs:', erro);
      }
    });
  }

  //Vai disparar toda vez que o select for alterado
  carregarMunicipios(event: MatSelectChange){
    const ufSelecionada = event.value
    this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => this.municipios = listaMunicipios,
      error: erro => console.log('Ocorreu um erro: ', erro)
    })
  }

  salvar(): void {
    if (this.atualizando) {
      this.service.atualizar(this.cliente);
      this.mostrarMensagem("Atualizado com sucesso!");
      this.router.navigate(['/consulta']);
    } else {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem("Salvo com sucesso!");
    }
  }

  mostrarMensagem(mensagem: string): void {
    this.snack.open(mensagem, "Ok", {
      duration: 3000
    });
  }
}