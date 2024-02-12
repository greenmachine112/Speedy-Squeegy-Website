function slide() {
    console.log('success')
    let sliders = document.getElementsByClassName("slider");
  
    for (let i = 0; i < sliders.length; i++) {
      let slideValue = sliders[i].value;
      let myImg = sliders[i].closest('.container').querySelector('.my-img');
  
      myImg.style.clipPath = "polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)";
      console.log("polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)");
    }
  }