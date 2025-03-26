// import api from "./api";
import api from './api';
import * as jwt_decode from 'jwt-decode';
class AutServerice{
    async login(credenciais){
        // eslint-disable-next-line no-useless-catch
        try{
            const res = await api.post('/login',credenciais);
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('usuario',JSON.stringify(res.data.usuario))
            console.log(res)
            return res.data;
        }catch(err){
            throw err;
        }
    }
    //Verificar se usuário está logado
    isAutheticaded() {
        const token = localStorage.getItem('token')
        if(!token) return false;
    
        try{
            const decodedToken = jwt_decode(token)
            return decodedToken.exp > Date.now()/1000;
        }catch{
            return false;
        }
    }
    
    logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
    setupAxiosInterceptors() {
        api.interceptors.request.use(config => {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        });
      }
      getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
      }
}
export default new AutServerice();