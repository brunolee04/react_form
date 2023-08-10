import React, { useEffect, useState } from "react";
import Api from "../../services/Api";

import './Carousel.css'
import './Bootstrap.css'
import './Home.css'


export default function Home(){

    const [customer,setCustomer] = useState(null);

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [cpf, setCpf] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");


    const [html, setHtml] = useState([]);


   

    useEffect(() => {


        function registerForm(){
            Api.post("/",{
                name: name,
                lastname: lastname,
                cpf: cpf,
                mail: mail,
                password: password,
            }).then((response)=>console.log(response))
            .catch((err) => {
                console.log(err);
            })
        }

        function checkMail(){
            Api.get(`/&mail=${mail}`)
            .then((response) =>{
                if(response.status == 200){
                    var data = response.data;
                    if(!data.status && data.code == 'notfound'){
                        setCustomer(data.data);
                    }
                }
            })
        }

           var html = (
  
            <div className="content">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-lg-6 mr-auto">
                      <div className="mb-5">
                        <h3 className="text-white mb-4"><img src="https://www.maresbrasil.com.br/image/catalog/sistema/logo-mares.png"/></h3>
                        <p className="text-white">Participe do nosso <span className='redSpan'>sorteio</span> e concorra a produtos Mares</p>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                            
                        </div>
                        <div className="col-md-6">
                        </div>
                      </div>
                    </div>
            
                    <div className="col-lg-6">
                      <div className="box">
                        
                        { 
                            customer === null ? 
                            
                                <form className="mb-5" method="post" id="raffleForm" name="raffleForm">
                                    <h3 className="heading">Consultar email</h3>
                                     <div className="row">
                                        <div className="col-md-12 form-group">
                                            <label for="email" className="col-form-label">Email</label>
                                            <input type="text" className="form-control" name="email" id="email"  onChange={(mail)=>setMail(mail.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input  value="Verificar" className="btn btn-block btn-danger rounded-0 py-2 px-4" onClick={checkMail}/>
                                            <span className="submitting"></span>
                                        </div>
                                    </div>
                                </form>
                                    : 
                                <form className="mb-5" method="post" id="raffleForm" name="raffleForm">
                                    <h3 className="heading">Cadastrar</h3>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                        <label for="name" className="col-form-label">Nome</label>
                                        <input type="text" className="form-control" name="firstname" id="firstname" onChange={(name)=>setName(name.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                        <label for="name" className="col-form-label">Sobrenome</label>
                                        <input type="text" className="form-control" name="lastname" id="lastname" onChange={(lastname)=>setLastname(lastname.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                        <label for="name" className="col-form-label">CPF</label>
                                        <input type="text" className="form-control" name="cpf" id="cpf" onChange={(cpf)=>setLastname(cpf.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                        <label for="email" className="col-form-label">Email</label>
                                        <input type="text" className="form-control" name="email" id="email" value={mail} onChange={(mail)=>setMail(mail.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                        <label for="name" className="col-form-label">Senha</label>
                                        <input type="text" className="form-control" name="password" id="password" onChange={(pass)=>setPassword(pass.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                        <label for="name" className="col-form-label">Confirmação de senha</label>
                                        <input type="text" className="form-control" name="passwordConfirm" id="passwordConfirm"  onChange={(pass)=>setPasswordConfirm(pass.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                        <input  value="Confirmar" className="btn btn-block btn-danger rounded-0 py-2 px-4" onClick={registerForm}/>
                                        <span className="submitting"></span>
                                        </div>
                                    </div>
                                </form>
                        }
                        <div id="form-message-warning mt-4"></div> 
                        <div id="form-message-success">
                          Your message was sent, thank you!
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
            </div>
            );  
            
            
            setHtml(html);
    }, [mail,customer]);
   

    return (
        <div>{html}</div>
    );
}