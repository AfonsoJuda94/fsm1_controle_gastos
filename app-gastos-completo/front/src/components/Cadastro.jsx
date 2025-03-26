import { useState } from "react";
import api from "../api";
export default function Cadastro(){

    const [email, setEmail] = useState('');
    const [senha,setSenha] = useState('');

    const Cadastrar = async (e) =>{
        e.preventDefault();
        try{
            const response = await api.post('/usuarios', {
                "nome": email,"senha": senha
            })
            console.log(response);
            // Limpando campos
            setEmail('')
            setSenha('')
            alert('Usuário cadastrado com sucesso')
            window.location.href = '/'
        }catch(error){
            console.log(error)
            alert('Erro no cadastro')
        }
    }
    return(
        <form onSubmit={Cadastrar}>
            <label htmlFor="email_cadastro">Email:</label>
            <input type="email" id="email_cadastro" onChange={e => setEmail(e.target.value)} value={email}/>
            <label htmlFor="senha_cadastro">Senha:</label>
            <input type="password" id="senha_cadastro" onChange={e => setSenha(e.target.value)} value={senha}/>
            <button type="submit">Cadastrar-se</button>
        </form>
        )
}