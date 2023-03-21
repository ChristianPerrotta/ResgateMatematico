const order_verbs = ['ordenar', 'enfileirar', 'organizar em linha reta', 'perfilar',
                     'dispor em linha reta', 'organizar em fila', 'dispor em fila']

const things = ["livros", "pessoas", "selos", "cores", "cadeiras",
                "caixas", "meninos", "meninas", "homens", "mulheres", "bandeiras", 
                "medalhas", "crianças", "troféus"];

const things2 = ["livros", "selos", "cadernos", "caixas", "medalhas", "troféus", 
                 "chocolates", "doces", "reais (sem usar centavos)", "pontos, em uma competição,",
                 "ingressos", "livros", "revistas", "brindes", "adesivos", "biscoitos",
                 "canetas", "lápis", "borrachas", "bottons", "pingentes", "chaveiros",
                 "balas", "almofadas personalizadas", "bichos de pelúcia", "fotos"];
const people2 = ["meninos", "meninas", "homens", "mulheres", "pessoas", "alunos",
                 "alunas", "estudantes", "funcionários", "jovens"];

const places = ["escola", "festa", "cerimônia", "confraternização", "reunião", "competição de talentos"];

const perm1_01 = {
    command: "De quantas maneiras podemos VERB NUM OBJECT?",
    ans: 'A resposta correta é ANS.',
    math: 'A resposta foi calculada usando NUM!, ou seja, fatorial de NUM.',
    when: 'O fatorial foi utilizado por se tratar de uma permutação. ' +
          'Usamos permutação quando todos os elementos são utilizados ' +
          'e a ordem importa.',
    tags: ["fatorial", "permutação"],
    replace: function (c, a, m, w) {
        //replacing in command
        let num = randint(3,7);
        c = c.replace(/NUM/g, num.toString());
        let verb = order_verbs[Math.floor(Math.random() * order_verbs.length)];
        c = c.replace('VERB', verb)
        let obj = things[Math.floor(Math.random() * things.length)];
        c = c.replace('OBJECT', obj)

        //replacing in answer
        let ans = factorialize(num);
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace(/NUM/g, num.toString());
        return [c, a, m, w, ans];
    }
}

const perm2_01 = {
    command: "De quantas maneiras podemos VERB NUM OBJECT, de modo que " +
             "OBJ1 e OBJ2 estejam sempre juntos, nesta ordem?",
    ans: 'A resposta correta é ANS.',
    math: 'A resposta foi calculada usando N-1!, ou seja, fatorial de N-1, ' +
          'que é o número total de OBJ.PLURAL menos 1, já que consideramos ' +
          'OBJ1 e OBJ2 como um só OBJ.NAME.<br>',
    when: "O cálculo do fatorial é utilizado por se tratar de uma permutação.<br>" +
           "Usamos permutação quando todos os elementos são utilizados e a ordem importa. " +
           "Como dois elementos devem estar juntos, eles são tratados como um só, " +
           "e isso diminui em 1 unidade o total de elementos a permutar.",
    tags: ["fatorial", "permutação"],
    replace: function (c, a, m, w) {

        //defining random values
        let num = randint(3,7);
        let obj = all_obj[Math.floor(Math.random() * all_obj.length)];
        let obj1 = obj.examples[Math.floor(Math.random() * obj.examples.length)];
        let obj2 = obj1;
        do {
            obj2 = obj.examples[Math.floor(Math.random() * obj.examples.length)];
        } while (obj1 == obj2)
        let ans = factorialize(num-1);
        let verb = order_verbs[Math.floor(Math.random() * order_verbs.length)];

        //replacing in command
        c = c.replace('NUM', num.toString());
        c = c.replace('VERB', verb);
        c = c.replace('OBJECT', obj.plural);
        c = c.replace('OBJ1', obj1);
        c = c.replace('OBJ2', obj2);

        if (obj.examples == people_list) {
            c = c.replace('juntos', 'lado a lado');
        }

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace(/NUM/g, num.toString());
        m = m.replace(/N-1/g, (num-1).toString());
        m = m.replace('OBJ.PLURAL', obj.plural);
        m = m.replace('OBJ1', obj1);
        m = m.replace('OBJ2', obj2);
        m = m.replace('OBJ.NAME', obj.name);

        if (obj.gender == 'f') {
            m = m.replace('um só', 'uma só');
        }
        return [c, a, m, w, ans];
    }
}

const perm2_02 = {
    command: "De quantas maneiras podemos VERB NUM OBJECT, de modo que " +
             "OBJ1 e OBJ2 estejam sempre juntos, em qualquer ordem?",
    ans: 'A resposta correta é ANS.',
    math: 'A resposta foi calculada usando N-1!・2!, ou seja, fatorial de N-1, ' +
          'que é o número total de OBJ.PLURAL menos 1, já que consideramos ' +
          'OBJ1 e OBJ2 como um só OBJ.NAME, e o fatorial de 2, já que ' +
          'OBJ1 e OBJ2 podem vir em qualquer ordem.<br>',
    when: "O cálculo do fatorial é utilizado por se tratar de uma permutação.<br>" +
          "Usamos permutação quando todos os elementos são utilizados e a ordem importa. " +
          "Como dois elementos devem estar juntos, eles são tratados como um só, " +
          "e isso diminui em 1 unidade o total de elementos a permutar." +
          " Além disso, como os elementos podem vir em qualquer ordem," +
          " precisamos ainda multiplicar a permutação pelo fatorial dos elementos" +
          " que vêm juntos.",
    tags: ["fatorial", "permutação"],
    replace: function (c, a, m, w) {
        
        //defining random values
        let num = randint(3,7);
        let obj = all_obj[Math.floor(Math.random() * all_obj.length)];
        let obj1 = obj.examples[Math.floor(Math.random() * obj.examples.length)];
        let obj2 = obj1;
        do {
            obj2 = obj.examples[Math.floor(Math.random() * obj.examples.length)];
        } while (obj1 == obj2)
        let ans = factorialize(num-1)*2;
        let verb = order_verbs[Math.floor(Math.random() * order_verbs.length)];

        //replacing in command
        c = c.replace('NUM', num.toString());
        c = c.replace('VERB', verb);
        c = c.replace('OBJECT', obj.plural);
        c = c.replace('OBJ1', obj1);
        c = c.replace('OBJ2', obj2);

        if (obj.examples == people_list) {
            c = c.replace('juntos', 'lado a lado');
        }

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace(/NUM/g, num.toString());
        m = m.replace(/N-1/g, (num-1).toString());
        m = m.replace('OBJ.PLURAL', obj.plural);
        m = m.replace(/OBJ1/g, obj1);
        m = m.replace(/OBJ2/g, obj2);
        m = m.replace('OBJ.NAME', obj.name);

        if (obj.gender == 'f') {
            m = m.replace('um só', 'uma só');
        }
        return [c, a, m, w, ans];
    }
}

const perm2_03 = {
    command: "De quantas maneiras podemos VERB NUM OBJECT, de modo que " +
             "OBJ1 e OBJ2 nunca estejam juntos?",
    ans: 'A resposta correta é ANS.',
    math: 'A resposta foi calculada usando NUM! - (NUM - 1)!・2!, ' +
          'ou seja, fatorial de NUM, que é o número total de OBJ.PLURAL, ' +
          'sem nenhuma restrição, menos duas vezes o fatorial de ' +
          '(NUM - 1), que é o total de casos em que OBJ1 e OBJ2 aparecem ' +
          'lado a lado, em qualquer ordem. Multiplicamos por 2! para realizar ' +
          'a permutação entre OBJ1 e OBJ2.<br>',
    when: "O cálculo do fatorial é utilizado por se tratar de uma permutação.<br>" +
          "Usamos permutação quando todos os elementos são utilizados e a ordem importa. " +
          "Como dois elementos devem não podem estar juntos, calculamos o total de casos, " +
          "sem restrição, e subtraímos os casos em que os elementos vêm juntos.",
    tags: ["fatorial", "permutação"],
    replace: function (c, a, m, w) {
        //defining random values
        let num = randint(3,7);
        let obj = all_obj[Math.floor(Math.random() * all_obj.length)];
        let obj1 = obj.examples[Math.floor(Math.random() * obj.examples.length)];
        let obj2 = obj1;
        do {
            obj2 = obj.examples[Math.floor(Math.random() * obj.examples.length)];
        } while (obj1 == obj2)
        let ans = factorialize(num) - (factorialize(num - 1) * 2);
        let verb = order_verbs[Math.floor(Math.random() * order_verbs.length)];

        //replacing in command
        c = c.replace('NUM', num.toString());
        c = c.replace('VERB', verb);
        c = c.replace('OBJECT', obj.plural);
        c = c.replace('OBJ1', obj1);
        c = c.replace('OBJ2', obj2);

        if (obj.examples == people_list) {
            c = c.replace('juntos', 'lado a lado');
        }

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace(/NUM/g, num.toString());
        m = m.replace('OBJ.PLURAL', obj.plural);
        m = m.replace(/OBJ1/g, obj1);
        m = m.replace(/OBJ2/g, obj2);
        m = m.replace('OBJ.NAME', obj.name);

        if (obj.gender == 'f') {
            m = m.replace('um só', 'uma só');
        }
        return [c, a, m, w, ans];
    }
}

const perm3_01 = {
    command: 'Quantas soluções naturais possui a equação x + y = NUM?',
    ans: 'A resposta correta é ANS.',
    math: "A resposta foi calculada usando " + 
            "<table class='frac'><tr class='num'><td>N1!</td></tr>" +
            "<tr><td style='text-align:center;'>NUM!</td></tr></table>, " +
            "que é um caso de permutação com repetição.<br>" +
            "O número N1 vem do valor NUM, dado ao final da equação, " +
            'somado a 1, que é a quantidade de "separadores". ' +
            "Podemos aqui interpretar esse separador como o sinal de +, " +
            "que separa as duas incógnitas.",
    when: "Este tipo de cálculo deve ser feito sempre que é pedido o número " +
            "de soluções naturais de uma equação deste tipo, com apenas " +
            "duas incógnitas.",
    tags: ["fatorial", "permutação", "permutação com repetição"],
    replace: function (c, a, m, w) {
        //replacing in command
        let num = randint(3,10);
        c = c.replace(/NUM/g, num.toString());

        //replacing in answer
        let ans = num + 1;
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace(/N1/g, (num+1).toString());
        m = m.replace(/NUM/g, num.toString());

        return [c, a, m, w, ans];
    }
};

const perm3_02 = {
    command: 'Quantas soluções naturais possui a equação x + y + z = NUM?',
    ans: 'A resposta correta é ANS.',
    math: "A resposta foi calculada usando " + 
            "<table class='frac'><tr class='num'><td>N2!</td></tr>" +
            "<tr><td style='text-align:center;'>NUM!・2!</td></tr></table>, "+
            " que é um caso de permutação com repetição.<br>" +
            "O número N2 vem do valor NUM, dado ao final da equação, " +
            'somado a 2, que é a quantidade de "separadores". ' +
            "Podemos aqui interpretar esses separadores como os sinais de +, " +
            "que separam as três incógnitas.",
    when: "Este tipo de cálculo deve ser feito sempre que é pedido o número " +
            "de soluções naturais de uma equação deste tipo, com apenas " +
            "três incógnitas.",
    tags: ["fatorial", "permutação", "permutação com repetição"],
    replace: function (c, a, m, w) {
        //replacing in command
        let num = randint(3,12);
        c = c.replace(/NUM/g, num.toString());

        //replacing in answer
        let ans = factorialize(num+2)/(factorialize(num)*2);
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace(/N2/g, (num+2).toString());
        m = m.replace(/NUM/g, num.toString());

        return [c, a, m, w, ans];
    }
};

const perm3_03 = {
    command: 'Em uma PLACE, será feita a distribuição de NUM1 OBJECT iguais ' +
               'para NUM2 PEOPLE. De quantas maneiras isso pode ser feito, ' +
               'sabendo que é possível alguma pessoa não receber nada?',
    ans: 'A resposta correta é ANS.',
    math: "A resposta foi calculada usando " + 
            "<table class='frac'><tr class='num'><td>SUM!</td></tr>" +
            "<tr><td style='text-align:center;'>NUM1!・NS!</td></tr></table>, "+
            " que é um caso de permutação com repetição.<br>" +
            'É possível representar essa situação pela equação:</p>' + 
            "<p style='text-align:center'>EQUATION</p>" + 
            "<p>O número SUM vem da soma entre NUM1, que é o total de OBJECT a distribuir, " +
            'e NS, que é a quantidade de "separadores". ' +
            "Podemos aqui interpretar esses separadores como a quantidade de " +
            'divisões a serem feitas para NUM2 PEOPLE, dado por NUM2 - 1. ' +
            'Também é possível pensar nos separadores como os sinais de "+" na equação.<br>' +
            'A divisão por NUM1! e NS! é feita porque há repetição de OBJECT e ' +
            'de separadores.',
    when: "Este tipo de cálculo deve ser feito sempre que for preciso  " +
            "dividir ou distribuir uma quantidade de elementos para " +
            "um certo número de indivíduos, sabendo que um indivíduo " +
            "pode receber nada, ou mesmo tudo de uma vez.",
    tags: ['fatorial', 'permutação', 'permutação com repetição'],
    replace: function (c, a, m, w) {
        //replacing in command
        let num1 = randint(5,12); //things
        let obj = things2[Math.floor(Math.random() * things2.length)];
        let num2 = randint(2,5); //people
        let p = people2[Math.floor(Math.random() * people2.length)];
        let pl = places[Math.floor(Math.random() * places.length)];
        c = c.replace(/NUM1/g, num1.toString());
        c = c.replace(/OBJECT/g, obj);
        c = c.replace(/NUM2/g, num2.toString());
        c = c.replace(/PEOPLE/g, p);
        c = c.replace(/PLACE/g, pl);

        //replacing in answer
        let ans = factorialize(num1+num2-1)/(factorialize(num1)*factorialize(num2-1));
        a = a.replace('ANS', ans.toString());

        //replacing in math
        let sum = num1 + num2 - 1;
        m = m.replace(/SUM/g, sum.toString());
        m = m.replace(/NUM1/g, num1.toString());
        m = m.replace(/NUM2/g, num2.toString());
        m = m.replace(/NS/g, (num2 - 1).toString());
        m = m.replace(/OBJECT/g, obj);
        m = m.replace(/PEOPLE/g, p);
        switch (num2) {
            case 2:
                eq = 'x + y = NUM1';
                break;
            case 3:
                eq = 'x + y + z = NUM1';
                break;
            case 4:
                eq = 'x + y + z + w = NUM1';
                break;
            case 5:
                eq = 'a + b + c + d + e = NUM1';
                break;
            default:
                eq = 'Algo deu errado...';
                break;
        }
        eq = eq.replace('NUM1', num1);
        m = m.replace(/EQUATION/g, eq);

        return [c, a, m, w, ans];
    }
}

const perm1 = [perm1_01];

const perm2 = [perm2_01, perm2_02, perm2_03];

const perm3 = [perm3_01, perm3_02, perm3_03];

const perm4 = [];

var problems = [perm1, perm2, perm3, perm4];