import React, { useEffect, useState } from 'react';
import { Container, ConteudoTitulo, Titulo, ButtomSuccess, BotaoAcao, AnteriorProximo, ButtomPrimary, Table, TextDanger, TextSuccess, Background}
from '../../styles/custom_adm';
import  './index.css'

export const Home = () => {

  const [data, setData] = useState([]);

  var dataAtual = new Date();
  var ano = dataAtual.getFullYear();
  var mes = dataAtual.getMonth() + 1;
  //console.log(mes + "/" + ano);

  const [dataView, setDataView] = useState({
      ano,
      mes
  });

  const anterior = async () => {
    if (dataView.mes === 1) {
    setDataView({
        ano: dataView.ano - 1,
        mes: 12
    });
    } else {
      setDataView({
        ano: dataView.ano,
        mes: dataView.mes - 1
      });
    }
  };

  const proximo = async () => {
    if (dataView.mes === 12) {
      setDataView({
          ano: dataView.ano + 1,
          mes: 1
      })
    } else {
      setDataView({
          ano: dataView.ano,
          mes: dataView.mes + 1
      })
    }
  }

    const listarExtrato = async e => {
        var valores = [
            {
                "id": 3,
                "nome": "Água",
                "valor": 347,
                "tipo": 1,
                "situacao": "Pago"
            },
            {
                "id": 2,
                "nome": "Luz",
                "valor": 347.68,
                "tipo": 1,
                "situacao": "Pendente"
            },
            {
                "id": 1,
                "nome": "Salário",
                "valor": 1100,
                "tipo": 2,
                "situacao": ""
            }
        ]

        setData(valores);
    }

    useEffect(() => {
        listarExtrato();
    }, []);

    return (
      <Background>
        <Container>
            <ConteudoTitulo>
                <Titulo>Listar Situação Financeira</Titulo>
                <BotaoAcao>
                    <ButtomSuccess>Cadastrar</ButtomSuccess>
                </BotaoAcao>
            </ConteudoTitulo>

            <AnteriorProximo>
                <ButtomPrimary type="button" onClick={() => anterior()}>Anterior</ButtomPrimary>
                <span>{dataView.mes + "/" + dataView.ano}</span>
                <ButtomPrimary type="button" onClick={() => proximo()}>Próximo</ButtomPrimary>
            </AnteriorProximo>

            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Situação</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.tipo === 1 ? <TextDanger>Pagamento</TextDanger> : <TextSuccess>Recebido</TextSuccess>}</td>
                            <td>{item.situacao}</td>
                            <td>{item.valor}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                      <td>Total</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>586.15</td>
                  </tr>
                </tfoot>
            </Table>
        </Container>
        </Background>
    );
};