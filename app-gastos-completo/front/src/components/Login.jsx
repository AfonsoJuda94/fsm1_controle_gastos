import { useEffect, useState } from "react"
import api from "../api";
export default function Login(){
    
    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');


    //Função para logar -> Ela verifica se a senha bate com a senha do banco
    const logar = async (e) =>{
        e.preventDefault()
        try{
            const response = await api.post(`/login`,{
                "nome": `${user}`,
                "senha": `${ password}`
            })
            console.log(response.data)
            alert(response.data)
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