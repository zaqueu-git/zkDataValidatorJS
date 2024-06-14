const zkDataValidator = {
    /**
     * Verifica se o RG é válido.
     * @param {string} value - O valor do RG a ser verificado.
     * @returns {boolean} true se o RG for válido, false caso contrário.
     */
    rg(value) {
        let rg = value;
        rg = rg.replace(/\./g, '');
        rg = rg.replace('-', '');
    
        if (/^(?=.*\d)[A-Za-z0-9]{7,11}$/g.test(rg)) {
            return true;
        };
        return false;        
    },
    /**
     * Verifica se o número de telefone é válido.
     * @param {string} value - O número de telefone a ser verificado.
     * @returns {boolean} true se o número de telefone for válido, false caso contrário.
     */
    phone(value) {
        if (/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/g.test(value)) {
            return true;
        };
        return false;
    },
    /**
     * Verifica se a senha é forte.
     * @param {string} value - A senha a ser verificada.
     * @returns {boolean} true se a senha for forte, false caso contrário.
     */
    password(value) {
        let res = [];

        res[0] = /^[a-zA-Z0-9@#._-]+$/g.test(value);
        res[1] = /[a-zA-Z]+/g.test(value);
        res[2] = /[0-9]+/g.test(value);
        res[3] = /[A-Z]+/g.test(value);
        res[4] = /[@#._-]+/g.test(value);
    
        res = res.filter(function (e) {
            return e == false;
        });
    
        if (res.length == 0) {
            return true;
        }
    
        return false;        
    },
    /**
     * Verifica se o nome completo é válido.
     * @param {string} value - O nome completo a ser verificado.
     * @returns {boolean} true se o nome completo for válido, false caso contrário.
     */
    fullName(value) {
        if (/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]{3,} ([a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+){2,}$/g.test(value)) {
            return true;
        };
        return false;       
    },
    /**
     * Verifica se a data é válida.
     * @param {string} value - A data no formato "YYYY-MM-DD" a ser verificada.
     * @returns {boolean} true se a data for válida, false caso contrário.
     */
    date(value) {
        let array = value.split("-");

        let day = array[2];
        let month = array[1];
        let year = array[0];
    
        let newDate = new Date(year, (month - 1), day);
        let sameDay = parseInt(day, 10) == parseInt(newDate.getDate());
        let sameMonth = parseInt(month, 10) == parseInt(newDate.getMonth()) + 1;
        let sameYear = parseInt(year) == parseInt(newDate.getFullYear());
    
        if ((sameDay) && (sameMonth) && (sameYear)) {
            return true;
        }
        return false;
    },
    /**
     * Verifica se o e-mail é válido.
     * @param {string} value - O e-mail a ser verificado.
     * @returns {boolean} true se o e-mail for válido, false caso contrário.
     */
    email(value) {
        if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/g.test(value)) {
            return true;
        };
        return false;        
    },
    /**
     * Verifica se o CPF é válido.
     * @param {string} value - O CPF a ser verificado.
     * @returns {boolean} true se o CPF for válido, false caso contrário.
     */
    cpf(value) {
        let cpf = value;

        cpf = cpf.replace(/\./g, '');
        cpf = cpf.replace('-', '');
    
        let v1 = 0;
        let v2 = 0;
        let aux = false;
    
        for (var i = 1; cpf.length > i; i++) {
            if (cpf[i - 1] != cpf[i]) {
                aux = true;
            }
        }
    
        if (aux == false) {
            return false;
        }
    
        for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
            v1 += cpf[i] * p;
        }
    
        v1 = ((v1 * 10) % 11);
    
        if (v1 == 10) {
            v1 = 0;
        }
    
        if (v1 != cpf[9]) {
            return false;
        }
    
        for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
            v2 += cpf[i] * p;
        }
    
        v2 = ((v2 * 10) % 11);
    
        if (v2 == 10) {
            v2 = 0;
        }
    
        if (v2 != cpf[10]) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * Verifica se o CNPJ é válido.
     * @param {string} value - O CNPJ a ser verificado.
     * @returns {boolean} true se o CNPJ for válido, false caso contrário.
     */
    cnpj(value) {
        let cnpj = value;

        cnpj = cnpj.replace(/\./g, '');
        cnpj = cnpj.replace('-', '');
        cnpj = cnpj.replace('/', '');
    
        let v1 = 0;
        let v2 = 0;
        let aux = false;
    
        for (var i = 1; cnpj.length > i; i++) {
            if (cnpj[i - 1] != cnpj[i]) {
                aux = true;
            }
        }
    
        if (aux == false) {
            return false;
        }
    
        for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v1 += cnpj[i] * p1;
            } else {
                v1 += cnpj[i] * p2;
            }
        }
    
        v1 = (v1 % 11);
    
        if (v1 < 2) {
            v1 = 0;
        } else {
            v1 = (11 - v1);
        }
    
        if (v1 != cnpj[12]) {
            return false;
        }
    
        for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v2 += cnpj[i] * p1;
            } else {
                v2 += cnpj[i] * p2;
            }
        }
    
        v2 = (v2 % 11);
    
        if (v2 < 2) {
            v2 = 0;
        } else {
            v2 = (11 - v2);
        }
    
        if (v2 != cnpj[13]) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * Verifica se o CEP é válido.
     * @param {string} value - O CEP a ser verificado.
     * @returns {boolean} true se o CEP for válido, false caso contrário.
     */
    cep(value) {
        if (/^[0-9]{2}[0-9]{3}-[0-9]{3}$/g.test(value)) {
            return true;
        }
        return false;
    },
};

console.table({
    cep: zkDataValidator.cep('88108-167'),
    cnpj: zkDataValidator.cnpj('62.193.755/0001-07'),
    cpf: zkDataValidator.cpf('335.516.700-21'),
    data: zkDataValidator.date('2002-10-03'),
    email: zkDataValidator.email('teste@teste.com'),
    nomeCompleto: zkDataValidator.fullName('Nome de teste'),
    senha: zkDataValidator.password('86A489m@'),
    telefone: zkDataValidator.phone('(48) 2775-8157'),
    rg: zkDataValidator.rg('136671949'),
});