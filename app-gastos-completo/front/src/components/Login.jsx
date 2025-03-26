import { useState } from "react"
import api from "../api";
import autenticacao from "../autenticacao";
export default function Login(){
    
    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');


    //Função para logar -> Ela verifica se a senha bate com a senha do banco
    const logar = async (e) =>{
        e.preventDefault()
        try{
            const response = await autenticacao.login({"nome": user,"senha": password})
            console.log(response.data)
            // alert(response.data)
            window.location.href = '/adicionarGasto'
        }catch(error){
            console.log(error)
            alert("Login inválido!")
        }
    }
    return(
    <form onSubmit={logar}>
        <label htmlFor="nome">Usuário:</label>
        <input type="text" id="nome" onChange={ e => setUser(e.target.value)} required/>
        <label htmlFor="senha">Senha:</label>
        <input type="password" name="senha" id="senha" onChange={ e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
    </form>
)
}