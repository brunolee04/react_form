import React, { useEffect, useState } from "react";
import Api from "../../services/Api";

import './Carousel.css'
import './Bootstrap.css'
import './Home.css'
import imgConfirm from '../../assets/img/confirmed.gif';


export default function Home(){

    const [customer,setCustomer] = useState(null);

    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [cpf, setCpf] = useState("");
    const [dateBirth, setDateBirth] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [successMessage, setSuccessMessage] = useState(true);

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
                setErrorName("Informe seu Nome.");
                var errorElement = document.querySelector('#errorName');
                errorElement.style.display = "block"; 
            }

            if(lastname.length < 3){
                countErrors++;
                setErrorLastname("Informe seu Sobrenome.");
                var errorElement = document.querySelector('#errorLastname');
                errorElement.style.display = "block"; 
            }

            if(cpf.length < 11){
                countErrors++;
                setErrorCpf("Informe seu CPF: Somente números.");
                var errorElement = document.querySelector('#errorCpf');
                errorElement.style.display = "block"; 
            }
            if(mail.length < 7){
                countErrors++;
                setErrorMail("Informe seu melhor Email");
                var errorElement = document.querySelector('#errorMail');
                errorElement.style.display = "block"; 
            }

            if(password.length < 3){
                countErrors++;
                setErrorPassword("Informe uma Senha com no mínimo 3 caracteres.");
                var errorElement = document.querySelector('#errorPassword');
                errorElement.style.display = "block"; 
            }


            if(password!=passwordConfirm){
                countErrors++;
                setErrorPasswordConfirm("A Senha digitada neste campo não coincide com a senha acima.");
                var errorElement = document.querySelector('#errorPasswordConfirm');
                errorElement.style.display = "block"; 
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
                        console.log('notfound',customer);
                    }
                    if(data.status && data.code == 'found'){
                        setCustomer(data.data);
                        setId(data.data.customer_id);
                        setName(data.data.firstname);
                        setLastname(data.data.lastname);
                        setCpf(data.data.cpf);
                        setMail(data.data.email);
                    }
                }
            })
        }

        function updateCpf(cpf){
            cpf  = cpf.replace(/\D/g, "");
            setCpf(cpf);
        }

        function refreshPage(){
            window.location.reload();
        }


        function confirm(){
            if(id!=0){
                Api.get(`/confirm&id=${id}`)
                .then((response) =>{
                    if(response.status == 200){
                        var data = response.data;
                        
                        if(data.status){
                            setCustomer(1);
                            const timeOut = setTimeout(success, 2000);
                        }
                        if(!data.status){
                            console.log('erro ao confirmar');
                        }
                    }
                })
            }
        }

        function success(){
            console.log('pewee');
            setSuccessMessage(false);
            console.log(successMessage);
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

                                    (
                                        customer == 1 ?
                                            (
                                                successMessage ? <div><img src={`${imgConfirm}`} className="imgConfirm"/></div> 
                                                : <div>
                                                    <label className="successH3">Sucesso!</label>
                                                    <br/>
                                                    <center>
                                                        <label className="successText">Seu cadastro foi confirmado para participar do sorteio.</label>
                                                        <br/>
                                                        <label  className="successSubText">Boa sorte!</label>
                                                        <br/>
                                                        <input className="btn btn-block btn-danger rounded-0 py-2 px-4 btnRefresh"  value="OK" onClick={refreshPage}/>
                                   
                                                    </center>
                                                </div> 
                                            )
                                            
                                            :

                                            (  
                                                customer.firstname ? 
        
                                                <form className="mb-5" method="post" id="raffleForm" name="raffleForm">
                                                    <h3 className="heading">Confirmar Informações</h3>
                                                    <div className="row">
                                                        <div className="col-md-12 form-group confirmDiv">
                                                        <label for="name" className="col-form-label confirmLabelTitle">Nome: </label>
                                                        <label className="col-form-label">{name}</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 form-group confirmDiv">
                                                        <label for="name" className="col-form-label confirmLabelTitle">Sobrenome: </label>
                                                        <label  className="col-form-label">{lastname}</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 form-group confirmDiv">
                                                        <label for="name" className="col-form-label confirmLabelTitle">CPF: </label>
                                                        <label className="col-form-label">{cpf}</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 form-group confirmDiv">
                                                        <label for="email" className="col-form-label confirmLabelTitle">Email</label>
                                                        <label className="col-form-label">{mail}</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 divBtn">
                                                        <input  value="Participar do Sorteio!" className="btn btn-block btn-danger rounded-0 py-2 px-4" onClick={confirm}/>
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
                                                        <input type="text" className="form-control" name="firstname" id="firstname" maxLength={30} value={name} onChange={(name)=>setName(name.target.value)}/>
                                                        <label className="error" id="errorName">{errorName}</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 form-group">
                                                        <label for="name" className="col-form-label">Sobrenome</label>
                                                        <input type="text" className="form-control" name="lastname" id="lastname" maxLength={30}  value={lastname}  onChange={(lastname)=>setLastname(lastname.target.value)}/>
                                                        <label className="error" id="errorLastname">{errorLastname}</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 form-group">
                                                        <label for="name" className="col-form-label">CPF</label>
                                                        <input type="text" className="form-control" name="cpf" id="cpf" placeholder="Somente Números" maxLength={11}  value={cpf}  onChange={(cpf)=>updateCpf(cpf.target.value)}/>
                                                        <label className="error" id="errorCpf">{errorCpf}</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 form-group">
                                                        <label for="email" className="col-form-label">Email</label>
                                                        <input type="text" className="form-control" name="email" id="email" value={mail} maxLength={25} onChange={(mail)=>setMail(mail.target.value)}/>
                                                        <label className="error" id="errorMail">{errorMail}</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 form-group">
                                                        <label for="name" className="col-form-label">Senha</label>
                                                        <input type="text" className="form-control" name="password" id="password" maxLength={15} placeholder="Acima de 3 caracteres" value={password} onChange={(password)=>setPassword(password.target.value)}/>
                                                        <label className="error" id="errorPassword">{errorPassword}</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 form-group">
                                                        <label for="name" className="col-form-label">Confirmação de senha</label>
                                                        <input type="text" className="form-control" name="passwordConfirm" id="passwordConfirm"  maxLength={15}  placeholder="Digite sua senha novamente"  value={passwordConfirm} onChange={(passwordConfirm)=>setPasswordConfirm(passwordConfirm.target.value)}/>
                                                        <label className="error" id="errorPasswordConfirm">{errorPasswordConfirm}</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                        <input  value="Confirmar" className="btn btn-block btn-danger rounded-0 py-2 px-4" onClick={registerForm}/>
                                                        <span className="submitting"></span>
                                                        </div>
                                                    </div>
                                                </form>
                                            )

                                    )

                                    
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
    }, [id,mail,name,lastname,cpf,mail,password,passwordConfirm,customer,successMessage,errorName,errorLastname,errorCpf,errorMail,errorPassword,errorPasswordConfirm]);
   

    return (
        <div>{html}</div>
    );
}