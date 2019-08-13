import styled from 'styled-components'

const LoginContainer  = styled.div`
.layout {
    position: absolute;
    height: 100% !important;
    width: 100% !important;
    text-align: center
}
.logo{

}
.title{
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: #494f66;
    margin-bottom: 16px;
    font-size: 20px;
    line-height: 1.3;
    letter-spacing: 0.2px
}
.title-form {
    font-size: 16px;
    margin-bottom: 21px;
}
.login-form-button{
    width: 100%;
    background-color: #f0353b ;
    border: #f0353b ;
    color: white ;
    height: 50px ;
}
.login-form-button-2 {
    width: 100%;
    background-color: white ;
    border: 1px solid #f0353b ;
    color: #f0353b ;
    height: 50px ;
}
`

export { LoginContainer }