import { useState } from "react"
import api from "../api"

export default function CriarCompartilhado(){
    
    const [inputs,setInputs] = useState([])
    const [email,setEmail] = useState('')
    const [nome,setNome] = useState('')
    async function handleKeyDown(e){
        if(e.key == "Enter"){
            const email_existe = await api.get(`/usuarios/${email}`);
            if(!email_existe){
                alert("Email não cadastrado")
            }else{
                setInputs([...inputs,email])
            }
        }
    }
    const enviar = async (e) =>{
        e.preventDefault();
        try{
            if(nome === '' || email === ''){
                alert('Entradas inválidas')
                return 'falhou'
            }
            const response = await api.post('/compartilhado',{ "nome":nome,"emails": inputs});
            console.log(response)
            alert('Grupo criado com sucesso')
            setInputs([])
            setEmail('')
            setNome('')
        }catch(err){
            alert("Erro no cadastro", err)
        }
    }
    return(
        <>
            <form onSubmit={enviar}>
                <label htmlFor="nome_grupo">Nome do grupo:</label>
                <input type="text" name="" id="nome_grupo" onChange={ e => {setNome(e.target.value)}} value={nome} required/>
                
                <button type="submit">Enviar</button>
            </form>
            <label htmlFor="usuarios">Usuarios</label><br />
            <input type="email" id="usuarios" onKeyDown={handleKeyDown} onChange={(e) => {setEmail(e.target.value)}} value={email} required/>
            {
                inputs.map((value,index) =>(
                    <p key={index}>{value}</p>
                ))
            }
        </>
    )
}