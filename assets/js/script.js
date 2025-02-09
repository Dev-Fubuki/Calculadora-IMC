// Seletores gerais
const notificationsContainer = document.querySelector('.notifications');
const form = document.getElementById('form');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const selectWeight = document.getElementById('weight-unit');
const selectHeight = document.getElementById('height-unit');
const calculatorContainer = document.querySelector('.calculator-container'); // Adicione este seletor

// Função de validação aprimorada
const validateInput = (input, max, unit) => {
    input.value = input.value.trim(); // Remove espaços em branco no início e no fim
    if (!input.value) {
        createToast('warning', 'fa-solid fa-triangle-exclamation', 'Aviso', 'Por favor, preencha este campo.');
        return false;
    }

    const value = parseFloat(input.value.replace(',', '.'));
    if (isNaN(value) || value <= 0 || value > max) {
        input.value = ''; // Limpa o campo
        const unitMessage = unit === 'kg' ? 'kg' : unit === 'lbs' ? 'lbs' : unit === 'cm' ? 'cm' : 'ft';
        createToast('warning', 'fa-solid fa-triangle-exclamation', 'Aviso', `Valor inválido. Insira um número válido em ${unitMessage}.`);
        return false;
    }
    input.value = value.toFixed(2);
    return true;
};

weightInput.addEventListener('blur', () => {
    if (selectWeight.value === 'kg') {
        validateInput(weightInput, 500, 'kg');
    } else {
        validateInput(weightInput, 1102.31, 'lbs'); // 500 kg in lbs
    }
});

heightInput.addEventListener('blur', () => {
  if (selectHeight.value === 'cm') {
    validateInput(heightInput, 300, 'cm');
  } else {
    validateInput(heightInput, 10, 'ft');
  }
});

// Impede entrada de caracteres inválidos
const preventInvalidInput = (event) => {
    if (!/[0-9.,]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
        event.preventDefault();
        createToast('warning', 'fa-solid fa-triangle-exclamation', 'Aviso', 'Apenas números são permitidos.');
    }
};

weightInput.addEventListener('keypress', preventInvalidInput);
heightInput.addEventListener('keypress', preventInvalidInput);

// Formata a entrada de altura em pés
heightInput.addEventListener('input', () => {
    if (selectHeight.value === 'ft') {
        let value = heightInput.value.replace(',', '').replace('.', '');
        if (value.length > 1) {
            value = value.slice(0, 1) + '.' + value.slice(1);
        }
        heightInput.value = value;
    }
});

// Valida se o usuário inseriu ponto ou vírgula
heightInput.addEventListener('blur', () => {
    if (selectHeight.value === 'ft' && !heightInput.value.includes('.') && !heightInput.value.includes(',')) {
        createToast('warning', 'fa-solid fa-triangle-exclamation', 'Aviso', 'Por favor, insira um ponto ou vírgula para separar os pés das polegadas.');
    }
});

// Converte altura
selectHeight.addEventListener('change', function () {
    if (!heightInput.value.trim()) {
        createToast('warning', 'fa-solid fa-triangle-exclamation', 'Aviso', 'Insira a altura antes de alterar a unidade.');
        return;
    }
    if (selectHeight.value === 'cm') {
        if (!validateInput(heightInput, 10, 'ft')) return;
        let value = parseFloat(heightInput.value.replace(',', '.'));
        heightInput.value = (value * 30.48).toFixed(2); // Converte pés para cm
    } else {
        if (!validateInput(heightInput, 300, 'cm')) return;
        let value = parseFloat(heightInput.value.replace(',', '.'));
        heightInput.value = (value / 30.48).toFixed(2); // Converte cm para pés
    }
    createToast('info', 'fa-solid fa-info-circle', 'Conversão concluída', 'Unidade de altura convertida com sucesso.');
});

// Converte peso
selectWeight.addEventListener('change', function () {
    if (!weightInput.value.trim()) {
        createToast('warning', 'fa-solid fa-triangle-exclamation', 'Aviso', 'Insira o peso antes de alterar a unidade.');
        return;
    }
    if (selectWeight.value === 'kg') {
        if (!validateInput(weightInput, 1102.31, 'lbs')) return; // 500 kg in lbs
    } else {
        if (!validateInput(weightInput, 500, 'kg')) return;
    }
    let weight = parseFloat(weightInput.value);
    weightInput.value = (this.value === 'kg')
        ? (weight / 2.20462).toFixed(2)
        : (weight * 2.20462).toFixed(2);
    createToast('info', 'fa-solid fa-info-circle', 'Conversão concluída', 'Unidade de peso convertida com sucesso.');
});

// Criação de notificações
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
    setTimeout(() => newToast.remove(), 5000);
}

// Cálculo de IMC
form.addEventListener('submit', function (event) {
    event.preventDefault();
    
    if (selectHeight.value === 'cm') {
        if (!validateInput(heightInput, 300, 'cm')) return;
    } else {
        if (!validateInput(heightInput, 10, 'ft')) return;
    }
    if (selectWeight.value === 'kg') {
        if (!validateInput(weightInput, 500, 'kg')) return;
    } else {
        if (!validateInput(weightInput, 1102.31, 'lbs')) return; // 500 kg in lbs
    }
    
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value.replace(',', '.'));
    let weightInKg = (selectWeight.value === 'lbs') ? weight * 0.453592 : weight;
    let heightInMeters = (selectHeight.value === 'ft') ? height * 0.3048 : height / 100;
    let bmi = (weightInKg / (heightInMeters ** 2)).toFixed(2);
    
    const value = document.getElementById('value');
    const infos = document.getElementById('infos');
    const description = document.getElementById('description');
    infos.classList.remove('hidden');
    
    const categories = [
        { max: 18.5, text: 'Abaixo do peso', className: 'low', warning: true },
        { max: 24.9, text: 'Peso ideal', className: 'normal', warning: false },
        { max: 29.9, text: 'Sobrepeso', className: 'high', warning: false },
        { max: 34.9, text: 'Obesidade grau 1', className: 'very-high', warning: false },
        { max: Infinity, text: 'Obesidade Mórbida', className: 'extreme', warning: true }
    ];
    
    const { text, className, warning } = categories.find(c => bmi < c.max);
    value.textContent = bmi.replace('.', ',');
    value.className = className;
    description.textContent = text;
    
    if (warning) {
        createToast('warning', 'fa-solid fa-triangle-exclamation', 'Aviso', `Seu IMC indica: ${text}. Consulte um especialista.`);
    }
    
    createToast('success', 'fa-solid fa-circle-check', 'Sucesso', 'IMC calculado com sucesso!');
    
    
});