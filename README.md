
<img src="https://raw.githubusercontent.com/DouglasAugustoJunior/SimuladorContagioCoronaVirusJS/master/img/banner.jpg" alt="Corona Vírus">

# :mask: Simulador de contágio Corona Vírus

Projeto referente a resolução da atividade proposta pelo professor [Dirceu Semighini Filho](https://www.blogger.com/profile/06563099677916258865 "author profile") para a disciplina de Sistemas Distribuídos.

[Link para testar o Projeto](https://douglasaugustojunior.github.io/SimuladorContagioCoronaVirusJS/)

<img src="https://raw.githubusercontent.com/DouglasAugustoJunior/SimuladorContagioCoronaVirusJS/master/img/projeto.png" alt="Corona Vírus">

## :mortar_board: Atividade Proposta

No começo de 2020, aconteceu no mundo, uma pandemia de Corona Vírus, apelidado de COVID-19. Uma das principais características deste vírus, era a sua fácil transmissão, que se dava por via aérea, ou seja, gotículas originadas por espirros, tosse, ou mesmo deixadas nas mãos, era repassadas de uma pessoa para outra pelo ar, e isso fez com que a transmissão deste vírus, entre as pessoas fosse bem rápida.
Até o momento temos que 20% das pessoas contaminadas, necessitam de internação em um hospital, para usar respirador artificial, 5% das pessoas infectadas, necessitam de leitos de UTI. Devido a rápida transmissão deste vírus, existe uma grande chance dele extrapolar a quantidade de leitos disponíveis, então quanto mais atrasarmos o seu espalhamento, melhor será.
Apesar de se espalhar rápido, ele mata muito poucas pessoas, mas a taxa de mortalidade, tem uma influencia direta sobre quantas pessoas morrem, uma vez que, quando o sistema de saúde fica sobrecarregado, as equipes médicas tem que escolher quem tratar, ou não, o que tem acontecido na Itália.
Uma das medidas mais eficazes, de contenção do vírus, é o isolamento das pessoas, pois quanto mais isoladas, mais devagar o vírus se espalha, e isto atenua a pressão sobre o sistema hospitalar de uma localidade.
Na aula de sincronização, aprendemos um protocolo de epidemia, que é um dos protocolos utilizados para sincronizar dados em sistemas distribuídos.

**a)** Implemente um software que contenha uma área (uma matriz quadrada, escolha o tamanho), que pode ser ocupada por pontos (escolha a quantidade), chamado de elementos (pessoas). A cada ciclo (unidade temporal), cada pessoa se movimentará dentro desta área, em uma velocidade aleatória, e ao entrar em contato com outros elementos. Ao final de cada ciclo, se uma pessoa estiver próxima de outra pessoa, ela pode transmitir a doença para os elementos que estão em volta de si (considere o posicionamento dentro da matriz, mais a probabilidade de transmissão da doença para este cálculo). Pesquise qual é a probabilidade de uma pessoa infectada pelo COVID-19 para implementar esta parte da transmissão.

**b)** Calcule quantos ciclos são necessários para se contaminar todos os elementos do grupo.

**c)** Qual é a influencia da quantidade de pessoas que estão circulando pelas ruas, na velocidade de contaminação das pessoas? Faça exercícios de limitando a movimentação dos elementos na matriz, e calcule, quanto isso influencia na velocidade de contaminação dos elementos. Qual é a diferença entre o tempo que demora para contaminar todos os elementos no b, e com a limitação da movimentação.

**d)** No protocolo de epidemia, estudado em classe, nem todos os elementos do sistema podem receber as informações mais atualizadas, isto acontece neste caso? Demonstre.

**e)** Adicione o componente temporal, e comece a considerar que as pessoas se curam, depois de algum tempo, e que algumas morrem. O que muda neste cenário? Quantos ciclos demora pras pessoas serem contaminadas, quantas pessoas morrem?

**f)** Como comparar o espalhamento de um vírus, com a consistência de um banco de dados?

**g)** Como você compara cada indivíduo deste exercício, com processos e threads em um sistema distribuído?

:link: [Fonte do exercício](https://dirceuprofessor.blogspot.com/2020/03/exercicios-pra-epocas-de-pandemia.html)

## :clipboard: Respostas



- [x] **a)** Parte prática implementada no projeto.

- [x] **b)** Os ciclos necessários para contaminar todos os elementos varia conforme a taxa de contaminação e a quantidade de pessoas na matriz.

- [x] **c)** Com base nos testes com mais pessoas em casa e circulando pode-se concluir que quanto mais pessoas circulando mais rapidamente os elementos são contaminados.

- [x] **d)** Ocorre por conta das pessoas que ficam em casa, já que não tem contato com o virus.

- [x] **e)** A quantidade de pessoas contaminadas vai variar conforme a taxa informada. Já as mortes estão ocorrendo em sua maioria para pessoas com idade avançada, porém a taxas baixas, entre 3% e 1%.

- [x] **f)** Assim como no espalhamento de um virus, em um banco de dados num sistema distribuído não necessariamente haverá a mesma informação em todos os elementos.

- [x] **g)** Assim como os processos cada elementos está agindo individualmente, onde cada um possui suas ações (threads).