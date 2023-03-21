const book_list = ["o de matemática", "o de português", "o de inglês",
                   "o de física", "o de química", "o de biologia",
                   "o de história", "o de geografia", "o de artes", "o de filosofia"];
const books = {name:"livro", plural:"livros", gender:"m", examples: book_list};

const people_list = ["José", "Maria", "João", "Ana", "Antônio", "Francisca",
                     "Francisco", "Antônia", "Carlos", "Adriana", "Paulo",
                     "Juliana", "Pedro", "Márcia", "Lucas", "Fernanda", "Luiz",
                     "Patrícia", "Marcos", "Aline", "Luís", "Sandra", "Gabriel",
                     "Camila", "Rafael", "Amanda", "Daniel", "Bruna", "Marcelo",
                     "Jéssica", "Bruno", "Letícia", "Eduardo", "Júlia", "Felipe",
                     "Luciana", "Raimundo", "Vanessa", "Rodrigo", "Mariana",
                     "Manoel", "Gabriela", "Mateus", "Vera", "André", "Vitória",
                     "Fernando", "Larissa", "Fábio", "Cláudia", "Leonardo",
                     "Beatriz", "Gustavo", "Luana", "Guilherme", "Rita", "Leandro",
                     "Sônia", "Tiago", "Renata", "Anderson", "Eliane", "Ricardo",
                     "Josefa", "Márcio", "Simone", "Jorge", "Natália", "Sebastião",
                     "Cristiane", "Alexandre", "Carla", "Roberto", "Débora",
                     "Edson", "Rosângela", "Diego", "Jaqueline", "Vitor", "Rosa",
                     "Sérgio", "Daniela", "Cláudio", "Aparecida", "Matheus",
                     "Marlene", "Thiago", "Terezinha", "Geraldo", "Raimunda",
                     "Adriano", "Andreia", "Luciano", "Fabiana", "Júlio", "Lúcia",
                     "Renato", "Raquel", "Alex", "Ângela", "Vinícius", "Rafaela",
                     "Rogério", "Joana", "Samuel", "Luzia", "Ronaldo", "Elaine",
                     "Mário", "Daniele", "Flávio", "Regina", "Ígor", "Daiane",
                     "Douglas", "Sueli", "Davi", "Alessandra", "Manuel", "Isabel"];
const people = {name:"pessoa", plural:"pessoas", gender:"f", examples: people_list};
const kids = {name:"criança", plural:"crianças", gender:"f", examples: people_list};
const students = {name:"aluno", plural:"alunos", gender:"m", examples: people_list};
const athletes = {name:"atleta", plural:"atletas", gender:"m", examples: people_list};

const colors_list = ["vermelho", "amarelo", "laranja", "verde", "azul", "roxo",
                     "lilás", "violeta", "branco", "preto", "cinza", "rosa",
                     "marrom", "bege"];
const colors = {name:"cor", plural:"cores", gender:"f", examples:colors_list};

const all_obj = [books, people, kids, students, athletes, colors];