const BASE_URL =
  "https://2024-03-06.currency-api.pages.dev/v1/currencies/";

const dropdown=document.querySelectorAll(".dropdown select")
const img=document.querySelector("img")
const btn=document.querySelector("form button")
const fromCurr=document.querySelector('.from select')
const toCurr=document.querySelector('.to select')
let msg=document.querySelector(".msg")

for(let select of dropdown ){
    for(currcode in countryList){
      let newOption=document.createElement("Option");
      newOption.innerText=currcode;
      newOption.value=currcode;
      if(select.name==="from" && currcode==="USD"){
        newOption.selected="selected"
      }
      select.append(newOption)
      
    }
    select.addEventListener("change",(event)=>{
      updateFlag(event.target)
    })
}

const updateFlag= (element)=>{
  let currcode=element.value;
  let countryCode=countryList[currcode]
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
  let currimg=element.parentElement.querySelector('img')  //SELECT PARENT ELEMENT
  currimg.src=newSrc  
}


btn.addEventListener('click',async(event)=>{
   event.preventDefault();
   let amount=document.querySelector(".amount input")
   let amtVal=amount.value;
   if(amtVal<0 || amtVal==""){
    amount.value=1
    amtVal=1;
   }
   let URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json` 
   let response=await fetch(URL)
   let data=await response.json();
   console.log(data);
  //  let rate = data[toCurr.value.toLowerCase()];
  //  console.log(rate);
   let finalAmount = (data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]*parseInt(amount.value)).toFixed(2);
   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})
// 1USD = 80INR


