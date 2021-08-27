import styled, { css } from "styled-components";

interface NavBarProps{
    inPage:boolean;
}

export const Container = styled.div`
     display: flex;
     flex-direction: column;
     background: #252B42;
     height: 100vh;
     min-height: 700px ;
     font-family:Poppins;
     min-width: 1100px;
`

export const ContainerNavBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 50px; 
`

export const NavBar = styled.div<NavBarProps>`
    display: flex;
    margin: 20px;
    cursor: default;
    justify-content: center;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 24px;
    padding: 5px;
    color: #FFF;
    white-space: nowrap;
    ${props => props.inPage && css`
        border-bottom: 0px solid #FF7B47;
        color: #FFF;
    `} 
    ${props => props.inPage && css`
        border-bottom: 5px solid #FF7B47;
        color: #FF7B47;
    `} 
`

export const ButtonBack = styled.div`
    display: flex;
    justify-content: center;
    background: #FFF;
    border: 4px solid #FF7B47;
    cursor: pointer;
    color: #FF7B47;
    min-width: 80px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0.125rem 0.125rem 0.5rem rgba(0,0,0,1);
    margin-right: 10px; 
`

export const ButtonGo = styled.div`
    display: flex;
    justify-content: center;
    background: #FF7B47;
    border: 4px solid #FF7B47;
    cursor: pointer;
    color: #FFF;
    min-width: 80px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0.125rem 0.125rem 0.5rem rgba(0,0,0,1);
`