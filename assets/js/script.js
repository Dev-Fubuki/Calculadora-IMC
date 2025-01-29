// Seletores gerais
const notificationsContainer = document.querySelector('.notifications');

const success = document.getElementById('success');
const error = document.getElementById('error');

const form = document.getElementById('form');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const SelectWeight = document.getElementById('weight-unit');
const SelectHeight = document.getElementById('height-unit');

// Formata automaticamente quando o usuário sai do campo
weightInput.addEventListener('blur', function () {
  if (this.value) {

    this.value = parseFloat(this.value).toFixed(2); // Formata para duas casas decimais
    
  }
});

heightInput.addEventListener('blur', function () {
  if (this.value) {

    this.value = parseFloat(this.value).toFixed(2); // Formata para duas casas decimais
    
  }
});


SelectHeight.addEventListener('change', function() {
 
  let value = parseFloat(heightInput.value.replace(',', '.'));
 
  if (isNaN(value)) {
    console.error("Valor inválido");
    return;
  }

  if (this.value == 'cm') {

    const resultCm = (value / 0.0328).toFixed(2)
    heightInput.value = resultCm; // Atualiza o campo com o valor formatado

  }
  else if (this.value === 'ft') {

    const resultFts = (value * 0.0328084).toFixed(2)
    heightInput.value = resultFts; // Atualiza o campo com o valor formatado

  }
});



// Atualiza automaticamente o valor ao mudar a unidade (kg/lbs)
SelectWeight.addEventListener('change', function () {
  let weight = parseFloat(weightInput.value.replace(',', '.')); // Substitui vírgula por ponto
  if (!weight) return; // Evita erro se o campo estiver vazio
  

  if (this.value === 'kg') {
    weightInput.value = (weight / 2.20462).toFixed(2)
  } else if (this.value === 'lbs') {
    weightInput.value = (weight * 2.20462).toFixed(2);
  }
});


// Função para criar notificações
function createToast(type, icon, title, text) {

  const newToast = document.createElement('div');

  newToast.className = `toast ${type}`;
  
  newToast.innerHTML = `
    <i class="${icon}"></i>
    <div class="content">
      <div class="title">${title}</div>
      <span>${text}</span>
    </div>
    <i class="fa-solid fa-xmark" onclick="this.parentElement.remove()"></i> 
  `;

  notificationsContainer.appendChild(newToast);

  setTimeout(() => {
    newToast.remove();
  }, 5000);
}

// Cálculo de IMC
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const weight = parseFloat(weightInput.value);
  const SelectWeightValue = SelectWeight.value;
  const height = parseFloat(document.getElementById('height').value);

  if (!weight || !height) {
    createToast('error', 'fa-solid fa-circle-exclamation', 'Erro', 'Por favor, preencha todos os campos.');
    return;
  }

  let weightInKg = SelectWeightValue === 'lbs' ? weight * 0.453592 : weight;
  let bmi = (weightInKg / ((height / 100) * (height / 100))).toFixed(2);

  const value = document.getElementById('value');
  let description = '';
  document.getElementById('infos').classList.remove('hidden');

  if (bmi < 18.5) {
    description = 'Abaixo do peso';
    value.className = 'low';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    description = 'Peso ideal';
    value.className = 'normal';
  } else if (bmi >= 25 && bmi <= 29.9) {
    description = 'Sobrepeso';
    value.className = 'high';
  } else if (bmi >= 30 && bmi <= 34.9) {
    description = 'Obesidade grau 1';
    value.className = 'very-high';
  } else {
    description = 'Obesidade grau 2 ou maior';
    value.className = 'extreme';
  }

  value.textContent = bmi.replace('.', ',');
  document.getElementById('description').textContent = description;

  createToast('success', 'fa-solid fa-circle-check', 'Sucesso', 'IMC calculado com sucesso!');
});
