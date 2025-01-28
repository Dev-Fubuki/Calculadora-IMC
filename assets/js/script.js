// Seletores gerais
const notificationsContainer = document.querySelector('.notifications');
const success = document.getElementById('success');
const error = document.getElementById('error');
const weightInput = document.getElementById('weight');
const weightUnit = document.getElementById('weight-unit');
const form = document.getElementById('form');

// Formata automaticamente quando o usuário sai do campo
weightInput.addEventListener('blur', function () {
  if (this.value) {
    this.value = parseFloat(this.value).toFixed(2); // Formata para duas casas decimais
  }
});

// Atualiza automaticamente o valor ao mudar a unidade (kg/lbs)
weightUnit.addEventListener('change', function () {
  let weight = parseFloat(weightInput.value);
  if (!weight) return; // Evita erro se o campo estiver vazio

  if (this.value === 'kg') {
    weightInput.value = (weight / 2.20462).toFixed(2);
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

// Ações para cada botão
success.onclick = () => createToast('success', 'fa-solid fa-circle-check', 'Sucesso', 'Operação concluída com sucesso!');
error.onclick = () => createToast('error', 'fa-solid fa-circle-exclamation', 'Erro', 'Algo deu errado!');

// Cálculo de IMC
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const weight = parseFloat(weightInput.value);
  const weightUnitValue = weightUnit.value;
  const height = parseFloat(document.getElementById('height').value);

  if (!weight || !height) {
    createToast('error', 'fa-solid fa-circle-exclamation', 'Erro', 'Por favor, preencha todos os campos.');
    return;
  }

  let weightInKg = weightUnitValue === 'lbs' ? weight * 0.453592 : weight;
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
