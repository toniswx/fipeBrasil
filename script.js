const grid = document.querySelector(".grid")
const info = document.querySelector(".info")
const floatbtn = document.querySelector(".float-btn")
const classCar = document.querySelector(".class-car")
const listName = document.querySelector(".auto-name")



               //VALORES DEFAULT DAS VARIAVEIS NA API
                let marcaDoCarro = ""
                let arrAno = ""
                let arrModelo = ""
                let veiculo = ""


             //MOSTRA AS OPÇÕES DE VEICULO
 
             function escolha(){
              
              grid.innerHTML +=`
              <div class="element-choosen box" data-veiculo="carros" data-veic="Carros">
              <p data-veiculo="carros"> Carros</p>
              </div>
              <div class="element-choosen box" data-veiculo="motos"  data-veic="Motos">
              <p data-veiculo="motos"  > Motos</p>
              </div>
              <div class="element-choosen box"data-veiculo="caminhoes"  data-veic="Caminhões">
              <p data-veiculo="caminhoes"> Caminhões</p>
              </div>
              `
              listName.innerHTML += `<p class="type"> Tipo de veiculo > </p>`
            
              // PEGA O ARRAY COM TODAS AS OPÇÕES DE VEICULO


              const opcaoDeVeiculo = document.querySelectorAll(".element-choosen")
             opcaoDeVeiculo.forEach(automovel => {

              //QUANDO CLICADA,A OPÇÃO VAI MUDAR A VARIAVEL VEICULO PARA O DATASET 
              //DO VEICULO SELECIONADO,QUE VAI SER CHAMADO NA API EM SEGUIDA



                automovel.addEventListener("click",()=>{
                  classCar.innerHTML =""
                  floatbtn.innerHTML= ""
                  listName.innerHTML += `<p class="type">  Marca do veiculo > </p>`
                  classCar.innerHTML = `<p >${automovel.dataset.veic}</p>`
                  veiculo = automovel.dataset.veiculo  
                  escolherVeiculo()
                  grid.innerHTML=""  
                })})}

                 escolha()                 


           ///CHAMA A API E MOSTRA AS 3 OPÇÕES
                   function escolherVeiculo(){  
                   var requestOptions = {
                    method: 'GET'
                   };
                    fetch(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas`, requestOptions)
                    .then(response => response.json())
                    .then(data =>         
                     marcaDoVeiculo(data)
                  )}




               

              //MOSTRA TODAS AS MARCAS DO VEICULO SELECIONADO
              function marcaDoVeiculo(data){
              data.forEach(element => {  
              grid.innerHTML += `
              <div class="box">
              <div class="car-info">
              <p class ="carro" data-nome="${element.nome}" data-codigo="${element.codigo}">${element.nome}</p> 
              </div>
               </div>`            
                })
              
                //PEGA O ARRAY COM TODOS OS VEICULOS E ADICIONA O ID DO CARRO
                //EM SEGUIDA CHAMA O MODELO DE CARRO DA MARCA SELECIONADA
                  const veiculo = document.querySelectorAll(".carro")
                  veiculo.forEach(element => {
                  element.addEventListener("click",()=>{
                  info.innerHTML =""
                  floatbtn.innerHTML = ""
                  marcaDoCarro = element.dataset.codigo
                  modelos(element.dataset.codigo)                  
                  listName.innerHTML += `<p class="type"> Modelo do veiculo >  </p>`
                  floatbtn.innerHTML +=`<p class="selected">${element.dataset.nome} </p>`
                  grid.innerHTML =  ""
                  
                })            
                })}



            //CHAMA A API PARA MOSTRAR OS MODELOS DO CARRO SELECIONADO
             function modelos(carsId){
              var requestOptions = {
                  method: 'GET'
                };
                fetch(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas/${carsId}/modelos`, requestOptions)
                  .then(response => response.json())
                  .then(data =>
                   displayModelo(data)
                    
                  )     
                 }
              
          //MOSTRA TODOS OS MODELOS 
            function displayModelo(data){
            data.modelos.forEach(modelo => {  
            grid.innerHTML += `
            <div class="box"> 
            <div class="img-box">
            </div>
            <div class="car-info">
            <p class ="carro" data-modelo="${modelo.codigo}" data-nome="${modelo.nome}" >${modelo.nome}</p>
            </div>
            </div>
            `
            })

            //PEGA O ARRAY COM TODOS OS MEDELOS
            const carros = document.querySelectorAll(".carro")
            carros.forEach(carro =>{
            carro.addEventListener("click",()=>{
            arrModelo = carro.dataset.modelo
            escolherAno()
            floatbtn.innerHTML +=`<p class="selected">${carro.dataset.nome} </p>`
            listName.innerHTML += `<p class="type">Ano do veiculo > </p>`
            grid.innerHTML =""   
            })})
            }

            //CHAMA A API E MOSTRA OS ANOS DISPONIVEIS
                function escolherAno(){
                var requestOptions = {
                method: 'GET'};
                 fetch(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas/${marcaDoCarro}/modelos/${arrModelo}/anos`, requestOptions)
                .then(response => response.json())
                .then(data => 
                 mostrarAno(data))}


           //MOTRA TODOS OS ANOS DISPONVEIS
              function mostrarAno(data){
                data.forEach(ano => { 
                grid.innerHTML += `
                <div class="box"> 
                <div class="img-box">
                </div>
                <div class="car-info">
                <p class ="carro" data-ano="${ano.codigo}" data-nome="${ano.nome}" >${ano.nome}</p>
                </div>
                </div>             
                `
              })
              //PEGA O ARRAY COM TODOS OS ANOS E CHAMA A API PARA MOSTRAR TODAS AS INFOS DO CARRO SELECIONADO
               const carros = document.querySelectorAll(".carro")
               carros.forEach(ano =>{
                  ano.addEventListener("click",()=>{
                  arrAno = ano.dataset.ano
                  console.log(arrAno,arrModelo,marcaDoCarro)
                  displayAllinfo()           
                  floatbtn.innerHTML +=`<p class="selected">${ano.dataset.ano} </p>`
                  grid.innerHTML =""
                })
                })}
                  
                    //CHAMA A API PARA MOSTRAR TODAS AS INFOS DO CARRO SELECIONADO 
                    function displayAllinfo(){
                    var requestOptions = {
                       method: 'GET'
                    };
                     fetch(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas/${marcaDoCarro}/modelos/${arrModelo}/anos/${arrAno}`, requestOptions)
                      .then(response => response.json())
                      .then(data => 
                       mostrar(data)
                        )

                    }

                   //MOSTRA TODAS AS INFOS DO CARRO
                    function mostrar(data){
                      console.log(data)
                        info.innerHTML = `
                      <div class="car-price-info">
                      <h3 class ="valor-do-carro carro " data-ano="${data.AnoModelo}" data-nome="${data. Modelo}">${data.Valor}</h3>
                      <p class=" fipe">VALOR TABELA FIPE </p>
                      <p class="modelo-veiculo">Modelo: ${data.Modelo}</p>
                      <p>Marca :${data.Marca}</p>
                      <p>Última atualização : ${data.MesReferencia}</p>
                      <p>Combustivel : ${data.Combustivel}</p>
                      
                      </div>
                        `
                        //RESETA TODOS OS VALORES DEFAULT PARA FAZER UMA NOVA PESQUISA
                        listName.innerHTML =""
                        marcaDoCarro = ""
                        arrAno = ""
                        arrModelo = ""
                        veiculo = ""
                        grid.innerHTML = ""
                        escolha()
                    }
