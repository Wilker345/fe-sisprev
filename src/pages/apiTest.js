import React, { useContext } from 'react';
import { LoginContext } from '../context/UserContext';
import MenuAppBar  from '../components/navbar'
import {Box} from '@mui/material';
import Axios from 'axios'
export function ApiTest(){
    const {user, setUser} = useContext(LoginContext)
    if(user === null){
        setUser(JSON.parse(localStorage.getItem('user')))
    }
    const update = ()=>{
        Axios.get(`http://localhost:3002/user`, {
            email: user.email
        }).then(response => {
            console.log(response.data)
            console.log(user.email)
            localStorage.setItem('user', JSON.stringify(response.data))
            console.log(localStorage.getItem('user'))
            setUser( JSON.parse(localStorage.getItem('user') ))
        })
      }
    const envioCc = () => {
        Axios.post(`http://localhost:3002/companies/api/create_company`, {
            name: user.givenName,
            cnpj: user.cnpj,
            email: user.email
        }).then(response =>(
           //company_id criado no back-end. Deve ser salvo no usuário
            Axios.patch(`http://localhost:3002/user/patch/:${user.email}`, {
                email: user.email,
                company_id: response.data.data.id
            })
        ))
        update()
    }
    const envioBc = () => {
        Axios.post(`http://localhost:3002/base/create`, {
            company_id: user.company_id
        })
    }
    return(
        <div>
            <MenuAppBar/>
            <Box sx={{marginTop: 10}}>
            <h2>Teste da API</h2>
                <ul>
                    <li>Id: {user? user.id : 'Obtendo ID...'}</li>
                    <li>Nome: {user? user.givenName : 'Obtendo nome...'}</li>
                    <li>E-mail: {user? user.email : 'Obtendo email...'}</li>
                    <li>CNPJ da empresa: {user? user.cnpj : 'Obtendo CNPJ...'}</li>
                    <li>ID da empresa: {user? user.company_id : 'Obtendo ID...'}</li>
                    <br/>
                    <button onClick={update}>Ver usuário</button>
                    <button onClick={envioCc}>create_company</button>
                    <button onClick={envioBc}>create_base</button>
                </ul>
            </Box>
        </div>
    )
}