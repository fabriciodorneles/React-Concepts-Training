import React, { useState, useEffect } from 'react';//useEffect para disparar funções quando tiver alguma informação alterada
import Header from './components/Header'
import './App.css';
import backgroundImage from './assets/background.jpg'
import api from './services/api'


function App() {
    //o Use State, adicionado no import acima, faz com que ele faça um atualização automática da tela
    //o Use State retorna um array com 2 posições
    //
    //1.Variável com o seu valor inicial
    //2.Função para atualizar esse valor
    //Aí ele vai desestruturar para já pegar essas duas posições
    const [projects, setProjects] = useState([]);//apagou pq antes tava setado uma estrutura de array diferente
                                                //sempre bom set do mesmo tipo. Array, Objeto, etc.

    //deixou vaziou no começo porque quer executar a função somente quando o componente for exibi em tela
    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data)
        })
    }, []);

    async function handleAddProject() {
        //projects.push(`Novo Projeto ${Date.now()}`);
        //No react sempre tenta usar a imutabilidade. O push altera a variável, insere algo nela
        // No react a gente sempre que vai mudar recria a variável.
        //setProjects([...projects, `Novo Projeto ${Date.now()}`]);
        // aqui ele usa o spread ... , do E6 para cima, que percorre o array e copia cada um para o novo array
        const response = await api.post('projects', {
            title: `Vomo q Veme ${Date.now()}`,
            owner: "Bincosa"
        })

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        //Fragment
        <> 
            <Header title="Projects" >

                <img width={400} src={backgroundImage} />
                <ul>
               {/* aqui tá iterando  com essa função map */}
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
               </ul>

                <button type="button" onClick={handleAddProject}>Adiciona Projeto</button>
            </Header>
        </>
    );
}

export default App;