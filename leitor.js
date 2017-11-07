var fs = require('fs');
var bd = JSON.parse(fs.readFileSync('bd.json', 'utf8'));
var pedidos = fs.readFileSync('pedidos.txt', 'utf8');

pedidos = pedidos.split(/\r\n/g);

var produtos = bd.produtos;

function recebeValor(produto){
    var preco;
    bd.produtos.forEach(function(prod) {
        if(prod.nome == produto){
            preco = prod.preco;
        }
    });
    return preco;
}

function insereVenda(nomeProd){
    for(var i=0; i<produtos.length; i++){
        if(produtos[i].nome == nomeProd){
            produtos[i].qtdVendidos = parseInt(produtos[i].qtdVendidos+1);
        }
    }
}

function getMaisVendido(){
    var totalVendidos=0;
    var nomeMaisVendido='';
    for(var i=0; i<produtos.length;i++){
        if(produtos[i].qtdVendidos > totalVendidos){
            totalVendidos=produtos[i].qtdVendidos;
            nomeMaisVendido=produtos[i].nome;
        }
    }
    return nomeMaisVendido;
}

arrayNomePedido = [];
var regex = /(Oi, eu sou [oa] |\. Gostaria de | sobre [oa]? | [oa] |Sou [oa] |Eu sou [oa] | e queria )/g;

var valorCompras=0;

for(var i=0; i<pedidos.length; i++){
    var dadospedido = pedidos[i].replace(regex, ' ');
    dadospedido = dadospedido.split(" ");
    if(dadospedido[0] == '')
        dadospedido.shift();
    arrayNomePedido.push(dadospedido);
    
}

arrayNomePedido.forEach(function(pedido) {
    if(pedido[1] == 'comprar' || pedido[1] =='vender'){
        insereVenda(pedido[2]);
        valorCompras = valorCompras + parseInt(recebeValor(pedido[2]));
    }
});

console.log("O produto mais vendido foi: "+getMaisVendido());
console.log("O valor total de vendas é: R$"+valorCompras);