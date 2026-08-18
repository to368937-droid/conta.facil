const produtos = [

    {
        id: 1,
        nome: "Smartphone Galaxy Pro",
        categoria: "celulares",
        preco: 1499.90,
        antigo: 1799.90,
        imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80",
        descricao: "Smartphone moderno com excelente desempenho, câmera de alta qualidade e armazenamento amplo."
    },

    {
        id: 2,
        nome: "Notebook Ultra",
        categoria: "informatica",
        preco: 2899.90,
        antigo: 3299.90,
        imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80",
        descricao: "Notebook ideal para estudos, trabalho e tarefas do dia a dia."
    },

    {
        id: 3,
        nome: "Fone Bluetooth",
        categoria: "eletronicos",
        preco: 149.90,
        antigo: 199.90,
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
        descricao: "Fone sem fio confortável com conexão Bluetooth."
    },

    {
        id: 4,
        nome: "Smart TV 50 polegadas",
        categoria: "eletronicos",
        preco: 2299.90,
        antigo: 2599.90,
        imagem: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=700&q=80",
        descricao: "Smart TV com tela grande para assistir filmes, séries e conteúdos online."
    },

    {
        id: 5,
        nome: "Tênis Esportivo",
        categoria: "roupas",
        preco: 199.90,
        antigo: 249.90,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
        descricao: "Tênis confortável para uso diário e atividades esportivas."
    },

    {
        id: 6,
        nome: "Cadeira de Escritório",
        categoria: "casa",
        preco: 599.90,
        antigo: 699.90,
        imagem: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=700&q=80",
        descricao: "Cadeira confortável para escritório e estudos."
    },

    {
        id: 7,
        nome: "Teclado Mecânico",
        categoria: "informatica",
        preco: 299.90,
        antigo: 349.90,
        imagem: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80",
        descricao: "Teclado mecânico com construção resistente e excelente resposta."
    },

    {
        id: 8,
        nome: "Relógio Digital",
        categoria: "eletronicos",
        preco: 179.90,
        antigo: 229.90,
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
        descricao: "Relógio moderno para complementar seu estilo."
    }

];


let carrinho = [];

let produtosAtuais = [...produtos];



function formatarPreco(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}



function mostrarProdutos(lista = produtosAtuais) {

    const container = document.getElementById("listaProdutos");

    container.innerHTML = "";

    if (lista.length === 0) {

        container.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:50px;">
                <h3>Nenhum produto encontrado.</h3>
                <p>Tente outra busca.</p>
            </div>
        `;

        return;
    }


    lista.forEach(produto => {

        const card = document.createElement("div");

        card.className = "produto";

        card.innerHTML = `

            <img
                src="${produto.imagem}"
                class="produto-img"
                alt="${produto.nome}"
            >

            <div class="produto-info">

                <span class="produto-categoria">
                    ${produto.categoria}
                </span>

                <h3>${produto.nome}</h3>

                <div class="preco-antigo">
                    ${formatarPreco(produto.antigo)}
                </div>

                <div class="preco">
                    ${formatarPreco(produto.preco)}
                </div>

                <div class="parcelas">
                    Em até 10x sem juros
                </div>

                <div class="produto-botoes">

                    <button
                        class="btn-carrinho"
                        onclick="adicionarCarrinho(${produto.id})"
                    >
                        🛒 Carrinho
                    </button>

                    <button
                        class="btn-comprar"
                        onclick="verProduto(${produto.id})"
                    >
                        Ver produto
                    </button>

                </div>

            </div>
        `;

        container.appendChild(card);

    });

}



function filtrarCategoria(categoria) {

    if (categoria === "todos") {

        produtosAtuais = [...produtos];

    } else {

        produtosAtuais = produtos.filter(
            produto => produto.categoria === categoria
        );

    }

    mostrarProdutos(produtosAtuais);

    document.getElementById("resultadoTexto").textContent =
        `${produtosAtuais.length} produto(s) encontrado(s)`;

    document.getElementById("produtos").scrollIntoView({
        behavior: "smooth"
    });

}



function buscarProduto() {

    const termo =
        document.getElementById("campoBusca").value
        .toLowerCase()
        .trim();


    produtosAtuais = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)
    );


    mostrarProdutos(produtosAtuais);

    document.getElementById("resultadoTexto").textContent =
        `${produtosAtuais.length} produto(s) encontrado(s)`;

}



function ordenarProdutos() {

    const tipo =
        document.getElementById("ordenacao").value;


    if (tipo === "menor") {

        produtosAtuais.sort(
            (a, b) => a.preco - b.preco
        );

    }

    else if (tipo === "maior") {

        produtosAtuais.sort(
            (a, b) => b.preco - a.preco
        );

    }

    else if (tipo === "nome") {

        produtosAtuais.sort(
            (a, b) => a.nome.localeCompare(b.nome)
        );

    }

    else {

        produtosAtuais = [...produtos];

    }


    mostrarProdutos(produtosAtuais);

}



function adicionarCarrinho(id) {

    const produto = produtos.find(
        produto => produto.id === id
    );

    carrinho.push(produto);

    atualizarCarrinho();

    alert(`${produto.nome} foi adicionado ao carrinho!`);

}



function removerCarrinho(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}



function atualizarCarrinho() {

    document.getElementById("contador").textContent =
        carrinho.length;


    const container =
        document.getElementById("itensCarrinho");


    container.innerHTML = "";


    if (carrinho.length === 0) {

        container.innerHTML = `
            <div style="text-align:center;padding:35px;">
                <p>Seu carrinho está vazio.</p>
            </div>
        `;

        document.getElementById("totalCarrinho").textContent =
            formatarPreco(0);

        return;
    }


    let total = 0;


    carrinho.forEach((produto, index) => {

        total += produto.preco;


        const item = document.createElement("div");

        item.className = "carrinho-item";

        item.innerHTML = `

            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
            >

            <div class="carrinho-item-info">

                <strong>${produto.nome}</strong>

                <p>${formatarPreco(produto.preco)}</p>

            </div>

            <button
                class="remover"
                onclick="removerCarrinho(${index})"
            >
                Remover
            </button>

        `;

        container.appendChild(item);

    });


    document.getElementById("totalCarrinho").textContent =
        formatarPreco(total);

}



function abrirCarrinho() {

    atualizarCarrinho();

    document
        .getElementById("modalCarrinho")
        .classList.add("ativo");

}



function verProduto(id) {

    const produto = produtos.find(
        produto => produto.id === id
    );


    document.getElementById("detalhesProduto").innerHTML = `

        <div class="detalhes">

            <div>
                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >
            </div>

            <div>

                <span class="produto-categoria">
                    ${produto.categoria}
                </span>

                <h2>${produto.nome}</h2>

                <p>${produto.descricao}</p>

                <div class="preco">
                    ${formatarPreco(produto.preco)}
                </div>

                <p class="parcelas">
                    Em até 10x sem juros
                </p>

                <button
                    class="finalizar"
                    onclick="adicionarCarrinho(${produto.id}); fecharModal('modalProduto')"
                >
                    Adicionar ao carrinho
                </button>

            </div>

        </div>

    `;


    document
        .getElementById("modalProduto")
        .classList.add("ativo");

}



function fecharModal(id) {

    document
        .getElementById(id)
        .classList.remove("ativo");

}



function abrirLogin() {

    document
        .getElementById("modalLogin")
        .classList.add("ativo");

}



function loginDemo() {

    alert(
        "Esta é uma demonstração acadêmica. O login não está conectado a um banco de dados."
    );

}



function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");

        return;

    }


    alert(
        "Compra simulada com sucesso! Esta função é apenas demonstrativa."
    );


    carrinho = [];

    atualizarCarrinho();

    fecharModal("modalCarrinho");

}



function irParaProdutos() {

    document
        .getElementById("produtos")
        .scrollIntoView({
            behavior: "smooth"
        });

}



function voltarInicio() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



window.onclick = function(event) {

    if (event.target.classList.contains("modal")) {

        event.target.classList.remove("ativo");

    }

};



mostrarProdutos();

atualizarCarrinho();