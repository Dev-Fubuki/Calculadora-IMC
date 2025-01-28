const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value) / 100; // Convertendo centímetros para metros

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert('Por favor, insira valores válidos para peso e altura.');
    return;
  }

  let notifications = document.querySelectorAll('.notification');
  let success = document.getElementById('success'); 
  let error = document.getElementById('error');
  let warning = document.getElementById('warning');
  let info = document.getElementById('info');
  
  //continuar codigo 

  
  const bmi = (weight / (height * height)).toFixed(2);

  const value = document.getElementById('value');
  let description = '';

  value.classList.add('low');
  value.classList.add('normal');
  value.classList.add('high');
  value.classList.add('very-high');
  value.classList.add('extreme');
  

  document.getElementById('infos').classList.remove('hidden');

  if (bmi < 18.5) {
    description = 'Abaixo do peso';
    value.classList.add('low');
    value.classList.remove('normal', 'high', 'very-high', 'extreme');
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    description = 'Peso ideal';
    value.classList.add('normal');
    value.classList.remove('low', 'high', 'very-high', 'extreme');
  } else if (bmi >= 25 && bmi <= 29.9) {
    description = 'Sobrepeso';
    value.classList.add('high');
    value.classList.remove('low', 'normal', 'very-high', 'extreme');
  } else if (bmi >= 30 && bmi <= 34.9) {
    description = 'Obesidade grau 1';
    value.classList.add('very-high');
    value.classList.remove('low', 'normal', 'high', 'extreme');
  } else if (bmi >= 35 && bmi <= 39.9) {
    description = 'Obesidade grau 2';
    value.classList.add('extreme');
    value.classList.remove('normal', 'high', 'very-high', 'extreme');
  } else {
    description = 'Obesidade Mórbida';
    value.classList.add('extreme');
    value.classList.remove('low', 'normal', 'high', 'very-high');
  }

  value.textContent = bmi.replace('.', ',');
  document.getElementById('description').textContent = description;

  
});