document.getElementById('imcForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var sexo = document.getElementById('sexo').value;
    var alturaCm = parseFloat(document.getElementById('altura').value); 
    var peso = parseFloat(document.getElementById('peso').value);
    
    if (isNaN(alturaCm) || isNaN(peso)) {
        alert('Por favor, insira valores válidos.');
        return;
    }
  
    var alturaMetros = alturaCm / 100; 
    
    var imc = peso / (alturaMetros * alturaMetros);
    var resultado = '';

    if (sexo === 'masculino') {
        if (imc < 18.5) {
            resultado = 'Abaixo do peso';
        } else if (imc >= 18.5 && imc <= 24.9) {
            resultado = 'Peso normal';
        } else if (imc >= 25 && imc <= 29.9) {
            resultado = 'Sobrepeso';
        } else {
            resultado = 'Obesidade';
        }
    } else if (sexo === 'feminino') {
        if (imc < 18.5) {
            resultado = 'Abaixo do peso';
        } else if (imc >= 18.5 && imc <= 24.9) {
            resultado = 'Peso normal';
        } else if (imc >= 25 && imc <= 29.9) {
            resultado = 'Sobrepeso';
        } else {
            resultado = 'Obesidade';
        }
    }

    document.getElementById('resultado').innerText = `Seu IMC é ${imc.toFixed(2)}: ${resultado}`;
});