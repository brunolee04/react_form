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
    const [bDay,updateBDay] = useState(0);
    const [bMonth,updateMDay] = useState(0); 
    const [bYear,updateYDay] = useState(0);

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
                Api.post("/register",{
                    name: name,
                    lastname: lastname,
                    cpf: cpf,
                    bDay:bDay,
                    bMonth:bMonth,
                    bYear:bYear,
                    mail: mail,
                    password: password,
                }).then((response)=>{
                    if(response.status == 200){
                        var data = response.data;
                        if(data.status){
                            setCustomer(1);
                            const timeOut = setTimeout(success, 2000);
                        }
                        else{
                            console.log("Adicionar Exceção");
                        }
                    }
                })
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
            }else{
                var errorElement = document.querySelector('#errorName');
                errorElement.style.display = "none";
            }

            if(lastname.length < 3){
                countErrors++;
                setErrorLastname("Informe seu Sobrenome.");
                var errorElement = document.querySelector('#errorLastname');
                errorElement.style.display = "block"; 
            }else{
                var errorElement = document.querySelector('#errorLastname');
                errorElement.style.display = "none";
            }

            if(cpf.length < 11){
                countErrors++;
                setErrorCpf("Informe seu CPF: Somente números.");
                var errorElement = document.querySelector('#errorCpf');
                errorElement.style.display = "block"; 
            }else{
                var errorElement = document.querySelector('#errorCpf');
                errorElement.style.display = "none";
            }

            if(mail.length < 7){
                countErrors++;
                setErrorMail("Informe seu melhor Email");
                var errorElement = document.querySelector('#errorMail');
                errorElement.style.display = "block"; 
            }else{
                var errorElement = document.querySelector('#errorMail');
                errorElement.style.display = "none";
            }

            if(password.length < 3){
                countErrors++;
                setErrorPassword("Informe uma Senha com no mínimo 3 caracteres.");
                var errorElement = document.querySelector('#errorPassword');
                errorElement.style.display = "block"; 
            }else{
                var errorElement = document.querySelector('#errorPassword');
                errorElement.style.display = "none";
            }


            if(password!=passwordConfirm){
                countErrors++;
                setErrorPasswordConfirm("A Senha digitada neste campo não coincide com a senha acima.");
                var errorElement = document.querySelector('#errorPasswordConfirm');
                errorElement.style.display = "block"; 
            }else{
                var errorElement = document.querySelector('#errorPasswordConfirm');
                errorElement.style.display = "none";
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
            setSuccessMessage(false);
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
                                                        <label for="name" className="col-form-label birthDateLabel">Data Nascimento</label>
                                                        <div className="col-md-12 form-group">
                                                        
                                                            <div className="col-md-4 form-group inputDateBirth">
                                                                <select onChange={(day)=>updateBDay(day.target.value)} name="bDay" className="form-control" aria-label=".form-select-lg example">
                                                                    <option value="01">01</option>
                                                                    <option value="02">02</option>
                                                                    <option value="03">03</option>
                                                                    <option value="04">04</option>
                                                                    <option value="05">05</option>
                                                                    <option value="06">06</option>
                                                                    <option value="07">07</option>
                                                                    <option value="08">08</option>
                                                                    <option value="09">09</option>
                                                                    <option value="10">10</option>
                                                                    <option value="11">11</option>
                                                                    <option value="12">12</option>
                                                                    <option value="13">13</option>
                                                                    <option value="14">14</option>
                                                                    <option value="15">15</option>
                                                                    <option value="16">16</option>
                                                                    <option value="17">17</option>
                                                                    <option value="18">18</option>
                                                                    <option value="19">19</option>
                                                                    <option value="20">20</option>
                                                                    <option value="21">21</option>
                                                                    <option value="22">22</option>
                                                                    <option value="23">23</option>
                                                                    <option value="24">24</option>
                                                                    <option value="25">25</option>
                                                                    <option value="26">26</option>
                                                                    <option value="27">27</option>
                                                                    <option value="28">28</option>
                                                                    <option value="29">29</option>
                                                                    <option value="30">30</option>
                                                                    <option value="31">31</option>
                                                                </select>
                                                            </div>

                                                            <div className="col-md-4 form-group inputDateBirth">
                                                                <select  onChange={(month)=>updateMDay(month.target.value)} className="form-control" aria-label=".form-select-lg example">
                                                                    <option value="01">Jan</option>
                                                                    <option value="02">Fev</option>
                                                                    <option value="03">Mar</option>
                                                                    <option value="04">Abr</option>
                                                                    <option value="05">Mai</option>
                                                                    <option value="06">Jun</option>
                                                                    <option value="07">Jul</option>
                                                                    <option value="08">Ago</option>
                                                                    <option value="09">Set</option>
                                                                    <option value="10">Out</option>
                                                                    <option value="11">Nov</option>
                                                                    <option value="12">Dez</option>
                                                                </select>
                                                            </div>

                                                            <div className="col-md-4 form-group inputDateBirth">
                                                                <select onChange={(year)=>updateYDay(year.target.value)} className="form-control" aria-label=".form-select-lg example">
                                                                    <option value="2023">2023</option>
                                                                    <option value="2022">2022</option>
                                                                    <option value="2021">2021</option>
                                                                    <option value="2020">2020</option>
                                                                    <option value="2019">2019</option>
                                                                    <option value="2018">2018</option>
                                                                    <option value="2017">2017</option>
                                                                    <option value="2016">2016</option>
                                                                    <option value="2015">2015</option>
                                                                    <option value="2014">2014</option>
                                                                    <option value="2013">2013</option>
                                                                    <option value="2012">2012</option>
                                                                    <option value="2011">2011</option>
                                                                    <option value="2010">2010</option>
                                                                    <option value="2009">2009</option>
                                                                    <option value="2008">2008</option>
                                                                    <option value="2007">2007</option>
                                                                    <option value="2006">2006</option>
                                                                    <option value="2005">2005</option>
                                                                    <option value="2004">2004</option>
                                                                    <option value="2003">2003</option>
                                                                    <option value="2002">2002</option>
                                                                    <option value="2001">2001</option>
                                                                    <option value="2000">2000</option>
                                                                    <option value="1999">1999</option>
                                                                    <option value="1998">1998</option>
                                                                    <option value="1997">1997</option>
                                                                    <option value="1996">1996</option>
                                                                    <option value="1995">1995</option>
                                                                    <option value="1994">1994</option>
                                                                    <option value="1993">1993</option>
                                                                    <option value="1992">1992</option>
                                                                    <option value="1991">1991</option>
                                                                    <option value="1990">1990</option>
                                                                    <option value="1989">1989</option>
                                                                    <option value="1988">1988</option>
                                                                    <option value="1987">1987</option>
                                                                    <option value="1986">1986</option>
                                                                    <option value="1985">1985</option>
                                                                    <option value="1984">1984</option>
                                                                    <option value="1983">1983</option>
                                                                    <option value="1982">1982</option>
                                                                    <option value="1981">1981</option>
                                                                    <option value="1980">1980</option>
                                                                    <option value="1979">1979</option>
                                                                    <option value="1978">1978</option>
                                                                    <option value="1977">1977</option>
                                                                    <option value="1976">1976</option>
                                                                    <option value="1975">1975</option>
                                                                    <option value="1974">1974</option>
                                                                    <option value="1973">1973</option>
                                                                    <option value="1972">1972</option>
                                                                    <option value="1971">1971</option>
                                                                    <option value="1970">1970</option>
                                                                    <option value="1969">1969</option>
                                                                    <option value="1968">1968</option>
                                                                    <option value="1967">1967</option>
                                                                    <option value="1966">1966</option>
                                                                    <option value="1955">1955</option>
                                                                    <option value="1954">1954</option>
                                                                    <option value="1953">1953</option>
                                                                    <option value="1952">1952</option>
                                                                    <option value="1951">1951</option>
                                                                    <option value="1950">1950</option>
                                                                    <option value="1949">1949</option>
                                                                    <option value="1948">1948</option>
                                                                    <option value="1947">1947</option>
                                                                    <option value="1946">1946</option>
                                                                    <option value="1945">1945</option>
                                                                    <option value="1944">1944</option>
                                                                    <option value="1943">1943</option>
                                                                    <option value="1942">1942</option>

                                                                </select>
                                                            </div>

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
                                                        <input type="password" className="form-control" name="password" id="password" maxLength={15} placeholder="Acima de 3 caracteres" value={password} onChange={(password)=>setPassword(password.target.value)}/>
                                                        <label className="error" id="errorPassword">{errorPassword}</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 form-group">
                                                        <label for="name" className="col-form-label">Confirmação de senha</label>
                                                        <input type="password" className="form-control" name="passwordConfirm" id="passwordConfirm"  maxLength={15}  placeholder="Digite sua senha novamente"  value={passwordConfirm} onChange={(passwordConfirm)=>setPasswordConfirm(passwordConfirm.target.value)}/>
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
    }, [id,mail,name,lastname,cpf,mail,password,passwordConfirm,customer,bDay,bMonth,bYear,successMessage,errorName,errorLastname,errorCpf,errorMail,errorPassword,errorPasswordConfirm]);
   

    return (
        <div>{html}</div>
    );
}