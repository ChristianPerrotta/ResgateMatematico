const words = ["FILHO", "ESCUDO", "QUATRO", "SOLDADO", "GRANDE", "LIMPO", "SLIDE",
               "CHUVA", "FONTE", "GRANDE", "CENOURA", "COZINHAR", "ABRIGO",
               "LENTO", "GELO", "CEBOLA", "TOMATE", "MAPA", "ESTRELA", "FERRO", 
               "CACHORRO", "LIVRO", "TRIANGULAR", "TAPETE", "PEIXE", "DEZ", "ZERO",
               "SACO", "PRAIA", "RIO", "DINHEIRO", "RUIM", "MOTOCICLETA", "BOLA",
               "COMIDA", "COZINHEIRO", "PAREDE", "BOTA", "PRATO", "ESCADA", "BALEIA",
               "BANANA", "CUBO", "AEROSSOL", "BICICLETA", "REPROVAR", "MANGA",
               "JUDOCA", "OFENSIVO", "SENHOR", "PUGILISTA", "DIA", "SPRAY", "TECIDO",
               "SOL", "MADEIRA", "RECIPIENTE", "VERDE", "LIXEIRA", "SAQUE", "BANDEJA",
               "MALETA", "PESAR", "DADO", "PRESUNTO", "DECAPITAR", "REALIZANDO",
               "TODO", "ALTURA", "INESPERADO", "TURISTAS", "CORUJA", "HORAS", "PASTA",
               "CIGARRO", "FOLHAS", "PANTANAL", "BARRIL", "GASTAR", "COTOVELO",
               "ESQUERDA", "PEDRA", "BEBIDA", "ACUPUNTURA", "BELISCAR", "COVARDE",
               "MACA", "COLO", "ESGOTO", "CARNAVAL", "IMORTAL", "PROPAGANDA",
               "ACETONA", "FAZER", "TIJOLO", "COTOVELO", "AMOR", "BONDINHO",
               "RODOVIA", "ROER", "FILME", "SUCULENTO", "PERFURAR", "DESCONGELAR",
               "ISCA", "SEGADOR", "INSCRITO", "CESTA", "PREFEITO", "HIMALAIA",
               "PRAZER", "ANGULAR", "GUITARRA", "ESTRADA", "BOCA", "SAPATO",
               "MENINA", "DOCE", "ELEFANTE", "COELHO", "ARROZ"];

const ana1_01 = {
    command: 'Quantos são os anagramas da palavra WORD?',
    ans: 'A resposta correta é ANS.',
    math: "A resposta foi calculada usando THEMATH, " + 
            "ou seja, fatorial de NUM, que é o número total de letras da palavraCONT",
    when: "O cálculo do fatorial é utilizado por se tratar de uma permutação.<br>" +
          "Usamos permutação quando todos os elementos são utilizados e a ordem importa. " +
          "Todo anagrama é um caso de permutação, pois todas as letras são utilizadas, " +
          "importanto apenas a ordem em que elas aparecem.",
    tags: ['fatorial', 'permutação', 'anagrama'],
    replace: function (c, a, m, w) {
        //getting random values
        let word = words[Math.floor(Math.random() * words.length)];
        let num = word.length;
        let ans = factorialize(num);
        let rep = count_repeat(word);

        if (rep.size != 0) {
            let q = "";
            rep.forEach (function(value, key) {
            x = factorialize(value);
            ans = ans/x;
            q += value + "!";
            })
            tm = "<table class='frac'><tr class='num'><td>NUM!</td></tr>" +
            "<tr><td style='text-align:center;'>QQQ</td></tr></table>";
            m = m.replace('THEMATH', tm)
            m = m.replace('CONT', ', e QQQ, que é o fatorial de cada letra repetida.')
            m = m.replace(/QQQ/g, q)
            w = w + " No caso de haver letras repetidas, é preciso dividir a permutação pelos fatoriais de cada letra repetida.";
        } else {
            m = m.replace('THEMATH', num.toString() + '!');
            m = m.replace('CONT', '.');
        }

        c = c.replace('WORD', word);

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace(/NUM/g, num.toString());

        return [c, a, m, w, ans];
    }
}

const ana2_01 = {
    command: 'Quantos são os anagramas da palavra WORD que VERB com a letra "LETTER"?',
    ans: 'A resposta correta é ANS.',
    math: "A resposta foi calculada usando THEMATH, " + 
          "ou seja, fatorial de NUM, que é o número total de letras da palavra " +
          'depois que retiramos a letra "LETTER"CONT',
    when: "O cálculo do fatorial é utilizado por se tratar de uma permutação.<br>" +
          "Usamos permutação quando todos os elementos são utilizados e a ordem importa. " +
          "Todo anagrama é um caso de permutação, pois todas as letras são utilizadas, " +
          "importanto apenas a ordem em que elas aparecem. " +
          'Quando a palavra deve começar ou terminar com uma determinada letra ' +
          '(no caso, "LETTER"), esta letra deve ser retirada da conta, ' +
          'já que sua posição é fixa e ela não será permutada.',
    tags: ['fatorial', 'permutação', 'anagrama'],
    replace: function (c, a, m, w) {
        //getting random values
        let word = words[Math.floor(Math.random() * words.length)];
        let verb = ['começam', 'terminam'][Math.floor(Math.random() * 2)];
        let lt = word[Math.floor(Math.random() * word.length)];
        let del_word = word.replace(lt, '');
        let num = del_word.length;
        let ans = factorialize(num);
        let rep = count_repeat(del_word);

        if (rep.size != 0) {
            let q = "";
            rep.forEach (function(value, key) {
            x = factorialize(value);
            ans = ans/x;
            q += value + "!";
            })
            tm = "<table class='frac'><tr class='num'><td>NUM!</td></tr>" +
            "<tr><td style='text-align:center;'>QQQ</td></tr></table>";
            m = m.replace('THEMATH', tm)
            m = m.replace('CONT', ', e QQQ, que é o fatorial de cada letra repetida.')
            m = m.replace(/QQQ/g, q)
            w = w + " No caso de haver letras repetidas, é preciso dividir a permutação pelos fatoriais de cada letra repetida.";
        } else {
            m = m.replace('THEMATH', num.toString() + '!');
            m = m.replace('CONT', '.');
        }

        //replacing in command
        c = c.replace('WORD', word);
        c = c.replace('VERB', verb);
        c = c.replace('LETTER', lt);

        //replacing in math
        m = m.replace(/NUM/g, num.toString());
        m = m.replace('LETTER', lt);

        //replacing in when
        w = w.replace('LETTER', lt);

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        return [c, a, m, w, ans];
    }
}

const ana2_02 = {
    command: 'Quantos são os anagramas da palavra WORD que começam com "LETTER1" ' +
             'e terminam com "LETTER2"?',
    ans: 'A resposta correta é ANS.',
    math: "A resposta foi calculada usando THEMATH, " + 
          "ou seja, fatorial de NUM, que é o número total de letras da palavra " +
          'depois que retiramos as letras "LETTER1" e "LETTER2"CONT',
    when: "O cálculo do fatorial é utilizado por se tratar de uma permutação.<br>" +
          "Usamos permutação quando todos os elementos são utilizados e a ordem importa. " +
          "Todo anagrama é um caso de permutação, pois todas as letras são utilizadas, " +
          "importanto apenas a ordem em que elas aparecem. " +
          'Quando a palavra deve começar ou terminar com uma determinada letra ' +
          '(no caso, "LETTER1" e "LETTER2"), estas letras devem ser retiradas da conta, ' +
          'já que suas posições são fixas e elas não serão permutadas.',
    tags: ['fatorial', 'permutação', 'anagrama'],
    replace: function (c, a, m, w) {
        //getting random values
        let word = words[Math.floor(Math.random() * words.length)];
        let lt1 = word[Math.floor(Math.random() * word.length)];
        let del_word = word.replace(lt1, '');
        let lt2 = del_word[Math.floor(Math.random() * del_word.length)];
        del_word = del_word.replace(lt2, '');
        if (lt1 == 'C' && lt2 == 'U') {
            lt1 = 'U';
            lt2 = 'C';
        }
        let num = del_word.length;
        let ans = factorialize(num);
        let rep = count_repeat(del_word);

        if (rep.size != 0) {
            let q = "";
            rep.forEach (function(value, key) {
            x = factorialize(value);
            ans = ans/x;
            q += value + "!";
            })
            tm = "<table class='frac'><tr class='num'><td>NUM!</td></tr>" +
            "<tr><td style='text-align:center;'>QQQ</td></tr></table>";
            m = m.replace('THEMATH', tm)
            m = m.replace('CONT', ', e QQQ, que é o fatorial de cada letra repetida.')
            m = m.replace(/QQQ/g, q)
            w = w + " No caso de haver letras repetidas, é preciso dividir a permutação pelos fatoriais de cada letra repetida.";
        } else {
            m = m.replace('THEMATH', num.toString() + '!');
            m = m.replace('CONT', '.');
        }

        //replacing in command
        c = c.replace('WORD', word);
        c = c.replace('LETTER1', lt1);
        c = c.replace('LETTER2', lt2);

        //replacing in math
        m = m.replace(/NUM/g, num.toString());
        m = m.replace(/LETTER1/g, lt1);
        m = m.replace(/LETTER2/g, lt2);

        //replacing in when
        w = w.replace('LETTER1', lt1);
        w = w.replace('LETTER2', lt2);

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        return [c, a, m, w, ans];
    }
}

const ana2_03 = {
    command: 'Quantos são os anagramas da palavra WORD que VERB com "DOUBLE"?',
    ans: 'A resposta correta é ANS.',
    math: "A resposta foi calculada usando THEMATH, " + 
          "ou seja, fatorial de NUM, que é o número total de letras da palavra " +
          'depois que retiramos as letras "LETTER1" e "LETTER2"CONT',
    when: "O cálculo do fatorial é utilizado por se tratar de uma permutação.<br>" +
          "Usamos permutação quando todos os elementos são utilizados e a ordem importa. " +
          "Todo anagrama é um caso de permutação, pois todas as letras são utilizadas, " +
          "importanto apenas a ordem em que elas aparecem. " +
          'Quando a palavra deve começar ou terminar com um determinado par de letras ' +
          '(no caso, "DOUBLE"), estas letras devem ser retiradas da conta, ' +
          'já que suas posições são fixas e elas não serão permutadas.',
    tags: ['fatorial', 'permutação', 'anagrama'],
    replace: function (c, a, m, w) {
        //getting random values
        let word = words[Math.floor(Math.random() * words.length)];
        let lt1 = word[Math.floor(Math.random() * word.length)];
        let del_word = word.replace(lt1, '');
        let lt2 = del_word[Math.floor(Math.random() * del_word.length)];
        del_word = del_word.replace(lt2, '');
        if (lt1 == 'C' && lt2 == 'U') {
            lt1 = 'U';
            lt2 = 'C';
        }
        let verb = ['começam', 'terminam'][Math.floor(Math.random() * 2)];
        let dbl = lt1 + lt2;
        let num = del_word.length;
        let ans = factorialize(num);
        let rep = count_repeat(del_word);

        if (rep.size != 0) {
            let q = "";
            rep.forEach (function(value, key) {
            x = factorialize(value);
            ans = ans/x;
            q += value + "!";
            })
            tm = "<table class='frac'><tr class='num'><td>NUM!</td></tr>" +
            "<tr><td style='text-align:center;'>QQQ</td></tr></table>";
            m = m.replace('THEMATH', tm)
            m = m.replace('CONT', ', e QQQ, que é o fatorial de cada letra repetida.')
            m = m.replace(/QQQ/g, q)
            w = w + " No caso de haver letras repetidas, é preciso dividir a permutação pelos fatoriais de cada letra repetida.";
        } else {
            m = m.replace('THEMATH', num.toString() + '!');
            m = m.replace('CONT', '.');
        }

        //replacing in command
        c = c.replace('WORD', word);
        c = c.replace('DOUBLE', dbl);
        c = c.replace('VERB', verb);

        //replacing in math
        m = m.replace(/NUM/g, num.toString());
        m = m.replace(/LETTER1/g, lt1);
        m = m.replace(/LETTER2/g, lt2);

        //replacing in when
        w = w.replace('DOUBLE', dbl);

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        return [c, a, m, w, ans];
    }
}

const ana2_04 = {
    command: 'Quantos são os anagramas da palavra WORD em que as letras "LETTER1" ' +
             'e "LETTER2" aparecem sempre juntas, nesta ordem?',
    ans: 'A resposta correta é ANS.',
    math: "A resposta foi calculada usando THEMATH.<br> " + 
          'Para este caso, consideramos as letras "LETTER1" e "LETTER2" como uma ' +
          'letra só, como se fosse a letra "DOUBLE". ' +
          'Assim, a palavra WORD passaria a ter N1 letras, uma a menos do que o total. ',
    when: "O cálculo do fatorial é utilizado por se tratar de uma permutação.<br>" +
          "Usamos permutação quando todos os elementos são utilizados e a ordem importa. " +
          "Todo anagrama é um caso de permutação, pois todas as letras são utilizadas, " +
          "importanto apenas a ordem em que elas aparecem. " +
          'Quando a palavra precisar ter um par de letras sempre juntas ' +
          '(no caso, "LETTER1" e "LETTER2"), estas letras devem ser contadas ' +
          'como uma só, diminuindo o total de letras em 1 unidade para as contas.',
    tags: ['fatorial', 'permutação', 'anagrama'],
    replace: function (c, a, m, w) {
        //getting random values
        let word = words[Math.floor(Math.random() * words.length)];
        let lt1 = word[Math.floor(Math.random() * word.length)];
        let del_word = word.replace(lt1, '');
        let lt2 = del_word[Math.floor(Math.random() * del_word.length)];
        del_word = del_word.replace(lt2, '');
        if (lt1 == 'C' && lt2 == 'U') {
            lt1 = 'U';
            lt2 = 'C';
        }
        let dbl = lt1 + lt2;
        let num = del_word.length + 1;
        let ans = factorialize(num);
        let rep = count_repeat(del_word);

        if (rep.size != 0) {
            let q = "";
            rep.forEach (function(value, key) {
            x = factorialize(value);
            ans = ans/x;
            q += value + "!";
            })
            tm = "<table class='frac'><tr class='num'><td>NUM!</td></tr>" +
            "<tr><td style='text-align:center;'>QQQ</td></tr></table>";
            m = m.replace('THEMATH', tm)
            m += " Também dividimos por QQQ, que é o fatorial de cada letra repetida na palavra.";
            m = m.replace(/QQQ/g, q)
            w = w + " No caso de haver letras repetidas, é preciso dividir a permutação pelos fatoriais de cada letra repetida.";
        } else {
            m = m.replace('THEMATH', num.toString() + '!');
            m = m.replace('CONT', '.');
        }

        //replacing in command
        c = c.replace('WORD', word);
        c = c.replace('LETTER1', lt1);
        c = c.replace('LETTER2', lt2);

        //replacing in math
        m = m.replace(/DOUBLE/g, dbl);
        m = m.replace(/LETTER1/g, lt1);
        m = m.replace(/LETTER2/g, lt2);
        m = m.replace(/WORD/g, word)
        m = m.replace('N1', num.toString());
        m = m.replace('NUM', num.toString());

        //replacing in when
        w = w.replace(/LETTER1/g, lt1);
        w = w.replace(/LETTER2/g, lt2);

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        return [c, a, m, w, ans];
    }
}

const ana2_05 = {
    command: 'Quantos são os anagramas da palavra WORD em que as letras "LETTER1" ' +
             'e "LETTER2" aparecem sempre juntas, em qualquer ordem?',
    ans: 'A resposta correta é ANS.',
    math: "A resposta foi calculada usando THEMATH.<br> " + 
          'Para este caso, consideramos as letras "LETTER1" e "LETTER2" como uma ' +
          'letra só, como se fosse a letra "DOUBLE". ' +
          'Assim, a palavra WORD passaria a ter N1 letras, uma a menos do que o total. ' +
          'Também multiplicamos por 2!, indicando a permutação dessas duas letras.',
    when: "O cálculo do fatorial é utilizado por se tratar de uma permutação.<br>" +
          "Usamos permutação quando todos os elementos são utilizados e a ordem importa. " +
          "Todo anagrama é um caso de permutação, pois todas as letras são utilizadas, " +
          "importanto apenas a ordem em que elas aparecem. " +
          'Quando a palavra precisar ter um par de letras sempre juntas ' +
          '(no caso, "LETTER1" e "LETTER2"), estas letras devem ser contadas ' +
          'como uma só, diminuindo o total de letras em 1 unidade para as contas. ' +
          'Além disso, se as duas letras podem aparecer em qualquer ordem, ' +
          'precisamos ainda multiplicar as permutações por 2!, que é o número ' +
          'de permutações dessas duas letras.',
    tags: ['fatorial', 'permutação', 'anagrama'],
    replace: function (c, a, m, w) {
        //getting random values
        let word = words[Math.floor(Math.random() * words.length)];
        let lt1 = word[Math.floor(Math.random() * word.length)];
        let del_word = word.replace(lt1, '');
        let lt2 = del_word[Math.floor(Math.random() * del_word.length)];
        del_word = del_word.replace(lt2, '');
        if (lt1 == 'C' && lt2 == 'U') {
            lt1 = 'U';
            lt2 = 'C';
        }
        let dbl = lt1 + lt2;
        let num = del_word.length + 1;
        let ans = factorialize(num)*2;
        let rep = count_repeat(del_word);

        if (rep.size != 0) {
            let q = "";
            rep.forEach (function(value, key) {
            x = factorialize(value);
            ans = ans/x;
            q += value + "!";
            })
            tm = "<table class='frac'><tr class='num'><td>NUM!</td></tr>" +
            "<tr><td style='text-align:center;'>QQQ</td></tr></table>・2!";
            m = m.replace('THEMATH', tm)
            m = m + ' A divisão por QQQ ocorre devido às letras repetidas na palavra.';
            m = m.replace(/QQQ/g, q)
            w = w + " No caso de haver letras repetidas, é preciso dividir a permutação pelos fatoriais de cada letra repetida.";
        } else {
            m = m.replace('THEMATH', num.toString() + '!・2!');
        }

        //replacing in command
        c = c.replace('WORD', word);
        c = c.replace('LETTER1', lt1);
        c = c.replace('LETTER2', lt2);

        //replacing in math
        m = m.replace("NUM", num.toString());
        m = m.replace(/DOUBLE/g, dbl);
        m = m.replace(/LETTER1/g, lt1);
        m = m.replace(/LETTER2/g, lt2);
        m = m.replace(/WORD/g, word)
        m = m.replace('N1', num.toString());

        //replacing in when
        w = w.replace(/LETTER1/g, lt1);
        w = w.replace(/LETTER2/g, lt2);

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        return [c, a, m, w, ans];
    }
}

const anagram1 = [ana1_01];

const anagram2 = [ana2_01, ana2_02, ana2_03, ana2_04, ana2_05];

const anagram3 = [ana2_05];

const anagram4 = [];

var problems = [anagram1, anagram2, anagram3, anagram4];