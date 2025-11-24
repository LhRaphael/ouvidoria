export function validationEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function validationPass(password0, password1) {
    if (password0 !== password1) {
        return false;
    }
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(password0);
}

export function validationCPF(cpf) {
    // 1. O CPF precisa ter exatamente 11 dígitos
    if (cpf.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;


    let sum = 0;
    let remainder;

    // 2. Cálculo do primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;

    // Se o cálculo não bater com o dígito 10 (primeiro DV), CPF é inválido
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    // 3. Cálculo do segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;

    // Se não bater com o último dígito, CPF inválido
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    // 4. Se passou por todas as validações, CPF é válido
    return true;
}

export function validationCNPJ(cnpj) {
    // CNPJ deve ter exatamente 14 dígitos
    if (cnpj.length !== 14) return false;

    // Rejeita sequências repetidas (ex: 11111111111111)
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    // Cálculo do primeiro dígito verificador
    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    // Cálculo do segundo dígito verificador
    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
}
