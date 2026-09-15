//Vamos utilizar o metodo interface, pois ele apenas receberá os dados da API

export interface Estado{
    sigla: string;
    nome: string;
}

export interface Municipio{
    //É importante colocar os mesmos nomes nas variáveis que estão na API
    nome: string;
    codigo_ibge: string;
}