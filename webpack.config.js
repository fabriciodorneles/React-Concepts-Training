const path = require('path');//modulo do node, pq esse arquivo aqui vai utilizar o node

module.exports = {
    //primeiro arquivo de entrada na aplicação
    //__dirname aponta para o diretorio que esse arquivo(webpack.conf.js) tá
    //isso aqui poderia botar o caminho direto ao invés do path, tipo
    //entry: './src/index.js' 
    //Mas o que o path faz é proteger para que esteja certo para todos os sistemas, windows, mac, linux
    //questões de barras, padroes de caminhos de diretório
    entry: path.resolve(__dirname,'src','index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),//caminho para os arquivos publicos da aplicao
                                                        //pro webserver usar
    },
    module: {
        rules: [
            {   //Regra de Javascript/React
                // RegExp /expressões regulares / 
                //aqui tem esse \. - é pq em um "expressão regular", o . significa qualquer caractere
                // qdo bota essa barra invertida antes tá mostrando ali que é o ponto mesmo que quer usar
                // qto ao $significa que tá procurando um arquivo que TERMINE com .js, se não poderia ser tipo .jsrqeqerqrqrqrq                
                test: /\.js$/ ,
                exclude: /node_modules/, //para ele não converter os node_modules(pq a conversão é responsabilidade dos modulos mesmo)
                use: {
                   loader:'babel-loader',
               }
            },
            { //Regra de CSS
                test: /\.css$/ ,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader'}, //depois que passou o css loader vai transpilar os estilos
                    { loader: 'css-loader'} //pega as imgs importadas do css e faz a primeira transpilação
                ] 
            },
            {   //Regra de Imagem
                //o ? depois do e é porque poder ter ou não ter
                test: /.*\.(gif|png|jpe?g)$/i ,
                use: {
                    loader: 'file-loader',
                } 
            }
        ]
    },
};