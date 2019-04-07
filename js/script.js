const radios = document.querySelectorAll('input[type=radio]');
const checkboxes = document.querySelectorAll('input[type=checkbox]');
const cart = document.querySelector('.cart');
const cartSum = document.querySelector('.cart__sum');

let checkSum = 0;

let calc = function(event) {
  const cheeses = [].slice.call(document.getElementsByName('cheese'));
  const veggies = [].slice.call(document.getElementsByName('veggies'));
  const protein = [].slice.call(document.getElementsByName('protein'));
  const other = [].slice.call(document.getElementsByName('other'));
  const toppings = cheeses.concat(veggies, protein, other);

  let toppingsNumber = 0;
  for(let i = 0; i < toppings.length; i++) {
    if(toppings[i].checked) {
      toppingsNumber++;
    }
  }

  if(toppingsNumber > 8) {
    event.stopPropagation();
    event.preventDefault();
    return;
  }

  if(event.target.type === "checkbox") {
    if(event.target.checked) {
      checkSum += Number(event.target.value);
    } else {
      checkSum -= Number(event.target.value);
    }
  }

  let radioSum = 0;
  for(let i = 0; i < radios.length; i++) {
    if(radios[i].checked) {
      radioSum += Number(radios[i].value);
    }
  }

  let discount = 0;
  let factor = 1;
  const sizes = document.getElementsByName('size');
  const dips = document.getElementsByName('dip');
  const beverages = document.getElementsByName('beverages');
  const d = new Date();

  if(d.getDay() === 1) {
    factor = 0.8;
  }
  else if(sizes[1].checked) {
    let freeDipsCount = 1;
    for(let i = 0; i < dips.length; i++) {
      if(freeDipsCount !== 0 && dips[i].checked) {
        discount += Number(dips[i].value);
        freeDipsCount--;
      }
    }
  } else if(sizes[2].checked) {
    let freeDipsCount = 2;
    for(let i = 0; i < dips.length; i++) {
      if(freeDipsCount !== 0 && dips[i].checked) {
        discount += Number(dips[i].value);
        freeDipsCount--;
      }
    }
  } else if(sizes[3].checked) {
    let freeDipsCount = 2;
    let freeDrinksCount = 2;
    for(let i = 0; i < dips.length; i++) {
      if(freeDipsCount !== 0 && dips[i].checked) {
        discount += Number(dips[i].value);
        freeDipsCount--;
      }
    }
    for(let i = 0; i < beverages.length; i++) {
      if(freeDrinksCount !== 0 && beverages[i].checked) {
        discount += Number(beverages[i].value);
        freeDrinksCount--;
      }
    }
  }

  cartSum.innerHTML = '$ ' + ((checkSum + radioSum - discount) * factor).toFixed(2);
}

for(let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener('click', function() {
    calc(event);
  });
}

for(let i = 0; i < radios.length; i++) {
  radios[i].addEventListener('click', function() {
    calc(event);
  });
}
