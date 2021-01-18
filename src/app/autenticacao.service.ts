import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase';


export class Autenticacao{
    public cadastrarUsuario(usuario: Usuario): void{
        console.log('chegamos', usuario)

        firebase.default.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((resposta: any) =>{

            //remover a senha do atributo senha do obj usuario
            delete usuario.senha
            
            //registrando dados complementares do usuario no path email na base64
            firebase.default.database().ref(`usuario_detalhe/${btoa(usuario.email)}`).push(usuario)
        
        }).catch((error) =>{
            console.log(error)
        });
        
    }


    public autenticar(email: string, senha: string): void{
        console.log('antes de autenticar')
        firebase.default.auth().signInWithEmailAndPassword(email,senha)
        .then((resposta: any) => console.log(resposta))
        .catch((error: Error) => console.log(error))
    }
}