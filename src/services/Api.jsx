import axios from "axios";


const api = axios.create({
    baseURL: "https://www.maresbrasil.com.br/feed/sorteiomaresapi",
});

export default api;