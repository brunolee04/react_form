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

    const [errorName, setErrorName] = useState(""); 
    const [errorLastname, setErrorLastname] = useState(""); 
    const [errorCpf, setErrorCpf] = useState(""); 
    const [errorMail, setErrorMail] = useState(""); 
    const [errorPassword, setErrorPassword] = useState(""); 
    const [errorPasswordConfirm, setErrorPasswordConfirm] = useState(""); 


    const [html, setHtml] = useState([]);


   

    useEffect(() => {


        function registerForm(){

            if(validateForm()){
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
            
        }

        function validateForm(){

            var countErrors = 0;

            if(name.length < 2){
                countErrors++;
                setErrorName("Informe seu nome");
            }

            if(lastname.length < 3){
                countErrors++;
                setErrorName("Informe seu nome");
            }

            if(cpf.length < 11){
                countErrors++;
                setErrorName("Informe seu nome");
            }
            if(mail.length < 7){
                countErrors++;
                setErrorName("Informe seu nome");
            }

            if(password.length < 3){
                countErrors++;
                setErrorName("Informe seu nome");
            }

            if(passwordConfirm.length < 3){
                countErrors++;
                setErrorName("Informe seu nome");
            }

            if(password!=passwordConfirm){
                countErrors++;
                setErrorName("Informe seu nome");
            }

            return countErrors > 0 ? false : true;
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

        function updateCpf(cpf){
            cpf  = cpf.replace(/\D/g, "");
            setCpf(cpf);
        }

        function checkPassword(confirmPassword){

            //setPasswordConfirm();
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
                                            <input type="text" className="form-control" name="email" id="email" value={mail}  onChange={(mail)=>setMail(mail.target.value)}/>
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
                                        <input type="text" className="form-control" name="firstname" id="firstname"  value={name} onChange={(name)=>setName(name.target.value)}/>
                                        <label className="error">{errorName}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                        <label for="name" className="col-form-label">Sobrenome</label>
                                        <input type="text" className="form-control" name="lastname" id="lastname"   value={lastname}  onChange={(lastname)=>setLastname(lastname.target.value)}/>
                                        <label className="error">{errorLastname}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                        <label for="name" className="col-form-label">CPF</label>
                                        <input type="text" className="form-control" name="cpf" id="cpf" placeholder="Somente Números" maxLength={11}  value={cpf}  onChange={(cpf)=>updateCpf(cpf.target.value)}/>
                                        <label className="error">{errorCpf}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                        <label for="email" className="col-form-label">Email</label>
                                        <input type="text" className="form-control" name="email" id="email" value={mail} onChange={(mail)=>setMail(mail.target.value)}/>
                                        <label className="error">{errorMail}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                        <label for="name" className="col-form-label">Senha</label>
                                        <input type="text" className="form-control" name="password" id="password"  placeholder="Acima de 3 caracteres" value={password} onChange={(password)=>setPassword(password.target.value)}/>
                                        <label className="error">{errorPassword}</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 form-group">
                                        <label for="name" className="col-form-label">Confirmação de senha</label>
                                        <input type="text" className="form-control" name="passwordConfirm" id="passwordConfirm"   placeholder="Digite sua senha novamente"  value={passwordConfirm} onChange={(passwordConfirm)=>setPasswordConfirm(passwordConfirm.target.value)}/>
                                        <label className="error">{errorPasswordConfirm}</label>
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
    }, [mail,name,lastname,cpf,mail,password,passwordConfirm,customer,errorName]);
   

    return (
        <div>{html}</div>
    );
}