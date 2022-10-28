const grid = document.querySelector(".grid")
const info = document.querySelector(".info")
const floatbtn = document.querySelector(".float-btn")
let marcaDoCarro = ""
let arrAno = ""
let arrModelo = ""
let veiculo = ""
const classCar = document.querySelector(".class-car")
const listName = document.querySelector(".auto-name")

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
 const veiculoSelecionado = document.querySelectorAll(".element-choosen")

 veiculoSelecionado.forEach(automovel => {
  automovel.addEventListener("click",()=>{
    
    classCar.innerHTML =""
    floatbtn.innerHTML= ""
    listName.innerHTML += `<p class="type">  Marca do veiculo > </p>`
    classCar.innerHTML = `<p >${automovel.dataset.veic}</p>`
    veiculo = automovel.dataset.veiculo
    
    apiAllCars()
    grid.innerHTML=""
    
  })
  
})
}
escolha()

function apiAllCars(){  
    var requestOptions = {
        method: 'GET'
      };
      fetch(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas`, requestOptions)
        .then(response => response.json())
        .then(data =>         
               tesfunction(data) )    
               }
              


function tesfunction(data){
  data.forEach(element => {  
    
    grid.innerHTML += `
    <div class="box">
    <div class="img-box">
    
    </div>
    <div class="car-info">
    <p class ="carro" data-nome="${element.nome}" data-codigo="${element.codigo}">${element.nome}</p> 
    </div>
      </div>`
    
      })
    
  const carros = document.querySelectorAll(".carro")
  carros.forEach(element => {
      element.addEventListener("click",()=>{
        info.innerHTML =""
        floatbtn.innerHTML = ""
        marcaDoCarro = element.dataset.codigo
        apiSelectedCars(element.dataset.codigo)
        
        listName.innerHTML += `<p class="type"> Modelo do veiculo >  </p>`
        floatbtn.innerHTML +=`<p class="selected">${element.dataset.nome} </p>`
        
        grid.innerHTML =  ""
        
      })
      
  });
}
const btn = document.querySelector(".search-btn")
btn,addEventListener("click",()=>{
  
})
function apiSelectedCars(carsId){
   
  var requestOptions = {
      method: 'GET'
    };
    fetch(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas/${carsId}/modelos`, requestOptions)
      .then(response => response.json())
      .then(data =>
        displayModelo(data)
        
      )      
      
    

}
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
   } )
   const carros = document.querySelectorAll(".carro")
   carros.forEach(carro =>{
     carro.addEventListener("click",()=>{
      arrModelo = carro.dataset.modelo
      displayAno()
      floatbtn.innerHTML +=`<p class="selected">${carro.dataset.nome} </p>`
      listName.innerHTML += `<p class="type">Ano do veiculo > </p>`
      grid.innerHTML =""
     
     })
   })
}

function displayAno(){
  var requestOptions = {
    method: 'GET'
  };
  fetch(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas/${marcaDoCarro}/modelos/${arrModelo}/anos`, requestOptions)
    .then(response => response.json())
    .then(data => 
      escolherAno(data)
      )

  }

function escolherAno(data){
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
   const carros = document.querySelectorAll(".carro")
   carros.forEach(ano =>{
     ano.addEventListener("click",()=>{
      arrAno = ano.dataset.ano
      console.log(arrAno,arrModelo,marcaDoCarro)
      displayAllinfo()
     
      floatbtn.innerHTML +=`<p class="selected">${ano.dataset.ano} </p>`
      grid.innerHTML =""
     })
    })
}

function displayAllinfo(){
  var requestOptions = {
    method: 'GET'
  };
  fetch(`https://parallelum.com.br/fipe/api/v1/${veiculo}/marcas/${marcaDoCarro}/modelos/${arrModelo}/anos/${arrAno}`, requestOptions)
    .then(response => response.json())
    .then(data => 
        showCar(data)
      )

  }


function showCar(data){
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
    listName.innerHTML =""
    marcaDoCarro = ""
    arrAno = ""
    arrModelo = ""
    veiculo = ""
    grid.innerHTML = ""
    escolha()
}
