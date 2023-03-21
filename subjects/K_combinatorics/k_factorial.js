const op = [' + ', ' - ', '*'];

/*  --------------------------[ LEVEL 1 ]-------------------------- */

const fact1_01 = {
    command: "Calcule o valor da expressão:<br>EXP",
    ans: 'A resposta correta é ANS.',
    math: 'Na expressão EXP, primeiramente calculamos o fatorial.<br>' + 
          '&emsp;NUM! = FAT<br>' +
          '&emsp;NUM! = ANS<br>' +
          'Em seguida efetuamos as demais operações da expressão:<br>' +
          '&emsp;EXP<br>' +
          '&emsp;EX2<br>' +
          '&emsp;SOLUT',
    when: 'Em toda expressão que contenha fatorial, ele deve ser ' +
          'o primeiro a ser efetuado. Qualquer outra operação deve ser ' +
          'realizada depois que o fatorial tiver sido calculado.',
    tags: ["fatorial"],
    replace: function (c, a, m, w) {
        //defining values
        let num = randint(2,7);
        let numop = randint(2,20);
        let p = op[Math.floor(Math.random() * op.length)];

        let exp = num.toString() + '!';
        let ex2;
        let ans = factorialize(num);

        if ((num + numop) % 2 == 0) {
            exp = exp + p + numop;
            ex2 = factorialize(num) + p + numop;
            ans = eval(ans + p + numop);
        } else {
            exp = numop + p + exp;
            ex2 = numop + p + factorialize(num);
            ans = eval(numop + p + ans);
        }
        if (p == '*') {
            exp = exp.replace('*', '・');
        }

        var fat = num.toString();
        for (let i = (num-1); i>=1; i--) {
            fat = fat + '・' + i;
        }

        //replacing in command
        c = c.replace('EXP', exp)

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace(/EXP/g, exp);
        m = m.replace(/NUM/g, num.toString());
        m = m.replace(/FAT/g, fat);
        m = m.replace(/ANS/g, factorialize(num).toString());
        m = m.replace(/NP/g, numop.toString());
        m = m.replace(/EX2/g, ex2);
        m = m.replace(/SOLUT/g, ans.toString());
        if (p == '*') {
            m = m.replace(/\*/g, '・');
        }

        return [c, a, m, w, ans];
    }
}

const fact1_02 = {
    command: "Calcule o valor da expressão:<br>" +
             "&emsp;<table class='frac'><tr class='num'><td>N1!</td></tr>" +
             "<tr><td style='text-align:center;'>N2</td></tr></table> ",
    ans: 'A resposta correta é ANS.',
    math: 'Na expressão, primeiramente calculamos o fatorial.<br>' + 
          '&emsp;N1! = FAT<br>' +
          '&emsp;N1! = ANS<br>' +
          'Em seguida efetuamos as demais operações da expressão:<br>' +
          "&emsp;<table class='frac'><tr class='num'><td>N1!</td></tr>" +
          "<tr><td style='text-align:center;'>N2</td></tr></table><br>" +
          "&emsp;<table class='frac'><tr class='num'><td>ANS</td></tr>" +
          "<tr><td style='text-align:center;'>N2</td></tr></table><br>" +
          "&emsp;SOLUT", 
    when: 'Em toda expressão que contenha fatorial, ele deve ser '  +
          'o primeiro a ser efetuado. Qualquer outra operação deve ser ' +
          'realizada depois que o fatorial tiver sido calculado.',
    tags: ["fatorial"],
    replace: function (c, a, m, w) {
        //defining values
        let n1 = randint(2,7);
        let n2 = randint(2,7);

        if (factorialize(n1)%n2 == 0) {
            var ans = factorialize(n1)/n2;
            var alt = false;
        } else {
            var frac = simplify(factorialize(n1), n2);
            var ans = frac[0].toString() + "/" + frac[1].toString();
            var alt_ans = factorialize(n1)/n2;
            var alt = true;

        }

        var fat = n1.toString();
        for (let i = (n1-1); i>=1; i--) {
            fat = fat + '・' + i;
        }

        //replacing in command
        c = c.replace('N1', n1);
        c = c.replace('N2', n2);

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace(/N1/g, n1.toString());
        m = m.replace(/N2/g, n2.toString());
        m = m.replace(/FAT/g, fat);
        m = m.replace(/ANS/g, factorialize(n1).toString());
        m = m.replace(/SOLUT/g, ans.toString());

        //if answer is fraction
        if (alt == true) {
            dp = alt_ans.toString().length - 2; //decimal places
            var dots = '';
            var per = '.';
            if (dp > 3) {
                dp = 3;
                dots = '...';
                per = '';
            }
            a = a.replace('.', ' ou ' + alt_ans.toFixed(dp).replace('.', ',') + dots + per);
            m = m + ' ou ' + alt_ans.toFixed(dp).replace('.', ',') + dots;
        }

        return [c, a, m, w, ans];
    }
}

const fact1_03 = {
    command: "Calcule o valor da expressão:<br>" +
             "&emsp;FRAC",
    ans: 'A resposta correta é ANS.',
    math: "&emsp;FRAC<br>" +
          "&emsp;<table class='frac'><tr class='num'><td>FAT1</td></tr>" +
          "<tr><td style='text-align:center;'>FAT2</td></tr></table><br>" +
          "&emsp;<table class='frac'><tr class='num'><td>STRIKE1</td></tr>" +
          "<tr><td style='text-align:center;'>STRIKE2</td></tr></table><br>" +
          "&emsp;BEFORELAST<br>" +
          "&emsp;SOLUT", 
    when: 'Havendo fatorial no numerador e no denominador, devemos '  +
          'abrir o fatorial do maior número até que ele chegue no fatorial ' +
          'do menor. Isso permite que façamos a divisão desses fatoriais ' +
          'para simplificar a expressão.',
    tags: ["fatorial"],
    replace: function (c, a, m, w) {
        //defining values
        var n1 = randint(2,7);
        var n2 = randint(2,7);
        while (n1 == n2) {
            n2 = randint(2,7);
        }
        let frac = makeFrac(n1 + "!", n2 + "!");

        if (factorialize(n1)%factorialize(n2) == 0) {
            var ans = factorialize(n1)/factorialize(n2);
            var alt = false;
        } else {
            var frac_simpl = simplify(factorialize(n1), factorialize(n2));
            var ans = frac_simpl[0].toString() + "/" + frac_simpl[1].toString();
            var alt_ans = factorialize(n1)/factorialize(n2);
            var alt = true;

        }
        if (n1 > n2) {
            var fat1 = n1.toString();
            for (let i = (n1-1); i>=n2; i--) {
                fat1 = fat1 + '・' + i;
            }
            fat1 = fat1 + "!";
            let pos = fat1.length - 2;
            var fat1strike = [fat1.slice(0, pos), "<strike>", fat1.slice(pos), "</strike>"].join('');

            var fat2 = n2.toString() + "!";
            var fat2strike = "<strike>" + fat2 + "</strike>";

            var beforelast = fat1.slice(0, pos-1);

        } else {
            var fat2 = n2.toString();
            for (let i = (n2-1); i>=n1; i--) {
                fat2 = fat2 + '・' + i;
            }
            fat2 = fat2 + "!";
            let pos = fat2.length - 2;
            var fat2strike = [fat2.slice(0, pos), "<strike>", fat2.slice(pos), "</strike>"].join('');

            var fat1 = n1.toString() + "!";
            var fat1strike = "<strike>" + fat1 + "</strike>";

            var beforelast = makeFrac("1", fat2.slice(0, pos-1));
        }

        //replacing in command
        c = c.replace('FRAC', frac);

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace('FRAC', frac);
        m = m.replace(/FAT1/g, fat1);
        m = m.replace(/FAT2/g, fat2);
        m = m.replace(/STRIKE1/g, fat1strike);
        m = m.replace(/STRIKE2/g, fat2strike);
        m = m.replace(/BEFORELAST/g, beforelast);
        if (beforelast == ans.toString()) {
            m = m = m.replace(/SOLUT/g, '');
            m = m.slice(0, m.length - 10);
        } else {
            m = m.replace(/SOLUT/g, ans.toString());
        }

        //if answer is fraction
        if ((alt == true) && (alt_ans.toFixed(3) != 0.000)) {
            a = a.replace('.', ', ou ' + alt_ans.toFixed(3) + '...');
            m = m + ' ou ' + alt_ans.toFixed(3) + '...';
        }

        return [c, a, m, w, ans];
    }
}

/*  --------------------------[ LEVEL 2 ]-------------------------- */

const fact2_01 = {
    command: "Simplifique a expressão:<br>" +
             "&emsp;FRAC",
    ans: 'A resposta correta é ANS.',
    math: "&emsp;l1<br>&emsp;l2<br>&emsp;l3<br>&emsp;l4<br>", 
    when: 'Havendo fatorial no numerador e no denominador, devemos '  +
          'abrir o fatorial do maior número até que ele chegue no fatorial ' +
          'do menor. Isso permite que façamos a divisão desses fatoriais ' +
          'para simplificar a expressão.',
    tags: ["fatorial"],
    replace: function (c, a, m, w) {
        //defining values
        var frac = makeFrac("n!", "(n - 1)!");
        var l1 = frac;
        var l2 = makeFrac("n・(n - 1)!", "(n - 1)!");
        var l3 = makeFrac("n・<strike>(n - 1)!</strike>", "<strike>(n - 1)!</strike>");
        var l4 = "n";
        var ans = "n";

        //replacing in command
        c = c.replace('FRAC', frac);

        //replacing in answer
        a = a.replace('ANS', "n");

        //replacing in math
        m = m.replace('l1', l1);
        m = m.replace('l2', l2);
        m = m.replace('l3', l3);
        m = m.replace('l4', l4);

        return [c, a, m, w, ans];
    }
}

const fact2_02 = {
    command: "Simplifique a expressão:<br>" +
             "&emsp;FRAC",
    ans: 'A resposta correta é ANS.',
    math: "&emsp;l1<br>&emsp;l2<br>&emsp;l3<br>&emsp;l4<br>&emsp;l5<br>&emsp;l6<br>", 
    when: 'Havendo fatorial no numerador e no denominador, devemos '  +
          'abrir o fatorial do maior número até que ele chegue no fatorial ' +
          'do menor. Isso permite que façamos a divisão desses fatoriais ' +
          'para simplificar a expressão.',
    tags: ["fatorial"],
    replace: function (c, a, m, w) {
        //defining values
        var frac = makeFrac("n!", "(n - 2)!");
        var l1 = frac;
        var l2 = makeFrac("n・(n - 1)・(n - 2)!", "(n - 2)!");
        var l3 = makeFrac("n・(n - 1)・<strike>(n - 2)!</strike>", "<strike>(n - 2)!</strike>");
        var l4 = "n・(n - 1)";
        var l5 = "n² - n";
        var ans = "n² - n";

        //replacing in command
        c = c.replace('FRAC', frac);

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace('l1', l1);
        m = m.replace('l2', l2);
        m = m.replace('l3', l3);
        m = m.replace('l4', l4);
        m = m.replace('l5', l5);

        return [c, a, m, w, ans];
    }
}

const fact2_03 = {
    command: "Calcule o valor da expressão:<br>" +
             "&emsp;FRAC",
    ans: 'A resposta correta é ANS.',
    math: "&emsp;l1<br>&emsp;l2<br>l3<br>&emsp;l4<br>&emsp;l5<br>" + 
          "&emsp;l6<br>&emsp;l7<br>&emsp;l8<br>&emsp;l9<br>", 
    when: 'Não podemos fazer nem a adição, nem a divisão dos fatoriais dados na questão. ' +
          'Havendo tal tipo de situação, é preciso abrir os fatoriais até o menor deles, ' +
          'para em seguida colocar o fator comum em evidência e depois simplificar.',
    tags: ["fatorial"],
    replace: function (c, a, m, w) {
        //defining values
        var n1 = randint(10, 50);
        var n2 = n1 + 1;
        var n3 = n1 + 2;
        var frac = makeFrac(n1 + "! + " + n2 + "!", n3 + "!");
        var l1 = frac;
        var l2 = makeFrac(n1 + "! + " + n2 + "・" + (n2-1) + "!", n3 + "・" + (n3-1) + "・" + (n3-2) + "!");
        var l3 = "No numerador, colocamos o fator comum em evidência:";
        var l4 = makeFrac(n1 + "!・[1 + " + n2 + "]", n3 + "・" + (n3-1) + "・" + (n3-2) + "!");
        var l5 = makeFrac("<strike>" + n1 + "!</strike>・[1 + " + n2 + "]", n3 + "・" + (n3-1) + "・<strike>" + (n3-2) + "!</strike>");;
        var l6 = makeFrac("1 + " + n2, n3 + "・" + (n3-1));
        var l7 = makeFrac(n3.toString(), n3 + "・" + (n3-1));
        var l8 = makeFrac("<strike>" + n3 + "</strike>", "<strike>" + n3 + "</strike>" + "・" + (n3-1));
        var l9 = makeFrac("1", n2.toString());
        var ans = "1/" + n2;

        //replacing in command
        c = c.replace('FRAC', frac);

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace('l1', l1);
        m = m.replace('l2', l2);
        m = m.replace('l3', l3);
        m = m.replace('l4', l4);
        m = m.replace('l5', l5);
        m = m.replace('l6', l6);
        m = m.replace('l7', l7);
        m = m.replace('l8', l8);
        m = m.replace('l9', l9);

        return [c, a, m, w, ans];
    }
}

/*  --------------------------[ LEVEL 3 ]-------------------------- */

const fact3_01 = {
    command: "Encontre o valor de n na equação:<br>" +
             "&emsp;EQUATION",
    ans: 'A resposta correta é ANS.',
    math: "&emsp;l1<br>l2<br>l3<br>&emsp;l4<br>&emsp;l5<br>" + 
          "&emsp;l6<br>&emsp;l7<br>", 
    when: 'Não podemos fazer nem a adição, nem a divisão dos fatoriais dados na questão. ' +
          'Havendo tal tipo de situação, é preciso abrir os fatoriais até o menor deles, ' +
          'para em seguida colocar o fator comum em evidência e depois simplificar.',
    tags: ["fatorial"],
    replace: function (c, a, m, w) {
        //defining values
        var n1 = randint(3, 6);
        var n2 = randint(1, 9);
        var eq = "(n - " + n2 + ")! = " + factorialize(n1);
        var l1 = eq;
        var l2 = "Sabemos que o fatorial deve ser igual a " + factorialize(n1) + ".";
        var l3 = "Se " + n1 + "! = " + factorialize(n1) + ", então:";
        var l4 = "(n - " + n2 + ")! = " + n1 + "!";
        var l5 = "n - " + n2 + " = " + n1;
        var l6 = "n = " + n1 + " + " + n2;
        var l7 = "n = " + (n1 + n2);
        var ans = n1 + n2;

        //replacing in command
        c = c.replace('EQUATION', eq);

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace('l1', l1);
        m = m.replace('l2', l2);
        m = m.replace('l3', l3);
        m = m.replace('l4', l4);
        m = m.replace('l5', l5);
        m = m.replace('l6', l6);
        m = m.replace('l7', l7);

        return [c, a, m, w, ans];
    }
}

const fact3_02 = {
    command: "Encontre o valor de n na equação:<br>" +
             "&emsp;EQUATION",
    ans: 'A resposta correta é ANS.',
    math: "&emsp;l1<br>l2<br>l3<br>&emsp;l4<br>&emsp;l5<br>" + 
          "&emsp;l6<br>&emsp;l7<br>", 
    when: 'Não podemos fazer nem a adição, nem a divisão dos fatoriais dados na questão. ' +
          'Havendo tal tipo de situação, é preciso abrir os fatoriais até o menor deles, ' +
          'para em seguida colocar o fator comum em evidência e depois simplificar.',
    tags: ["fatorial"],
    replace: function (c, a, m, w) {
        //defining values
        var n1 = randint(3, 6);
        var n2 = randint(1, 9);
        var eq = "(n - " + n2 + ")! = " + factorialize(n1);
        var l1 = eq;
        var l2 = "Sabemos que o fatorial deve ser igual a " + factorialize(n1) + ".";
        var l3 = "Se " + n1 + "! = " + factorialize(n1) + ", então:";
        var l4 = "(n - " + n2 + ")! = " + n1 + "!";
        var l5 = "n - " + n2 + " = " + n1;
        var l6 = "n = " + n1 + " + " + n2;
        var l7 = "n = " + (n1 + n2);
        var ans = n1 + n2;

        //replacing in command
        c = c.replace('EQUATION', eq);

        //replacing in answer
        a = a.replace('ANS', ans.toString());

        //replacing in math
        m = m.replace('l1', l1);
        m = m.replace('l2', l2);
        m = m.replace('l3', l3);
        m = m.replace('l4', l4);
        m = m.replace('l5', l5);
        m = m.replace('l6', l6);
        m = m.replace('l7', l7);

        return [c, a, m, w, ans];
    }
}

const fact1 = [fact1_01, fact1_02, fact1_03];

const fact2 = [fact2_01, fact2_02, fact2_03];

const fact3 = [fact3_01];

var problems = [fact1, fact2, fact3];