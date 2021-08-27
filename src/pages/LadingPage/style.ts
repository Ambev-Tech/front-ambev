import styled, { css } from "styled-components";
import Background from './../../assets/cover.svg';

export interface HoverComponentProps{
    focused:boolean;
}

export const Container = styled.div`
    display: flex;
    flex:1;
    flex-direction: column;
`

export const ContainerImage = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-image: url(${Background}) ;
    background-size: cover;
`

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    background-color: #252B42;
    padding-bottom: 130px;
`

export const Footer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    font-size:24px;
    font-family: Manrope;
    height: 15vh;
    width: 100%;
    background-color: #17213C;
`

export const Header = styled.header`
    display: flex;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 36px;
    flex-direction: row;
    color: #FFF;
    justify-content: space-between;
    margin-top: 4vh;
    margin-bottom: 4vh;
    margin-left: 8vh;
    margin-right: 8vh;
    cursor: default;
`

export const Menu = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

export const Aba = styled.a`
    font-size: 14px;
    margin: 5px;
    white-space: nowrap;
    cursor: pointer;
    text-decoration: none;
    color: #FFF;
`

export const BodyContainerImage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
`

export const ContainerTextPrincipal = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Montserrat;
    font-weight: bold;
    color: #FFF;
    font-size: 58px;
    margin-left: 8vh;
    margin-right: 8vh;
    cursor:default;
`

export const TextPrincipal = styled.div`
    font-family: Montserrat;
    font-weight: bold;
    white-space: nowrap;
    color: #FFF;
    font-size: 58px;
`

export const ContainerTextSecundario = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 8vh;
    margin-right: 8vh;
    margin-top:20px ;
    margin-bottom:20px ;
    cursor:default;
`

export const TextSecundario = styled.div`
    font-family: Montserrat;
    font-weight: 500;
    white-space: nowrap;
    color: #FFF;
    font-size: 20px;
`

export const Button = styled.button`
    display: flex;
    width: 300px;
    margin-left: 8vh;
    margin-right: 8vh;
    border: none;
    cursor: pointer;
    justify-content: center;
    padding: 10px;
    background-color: #FF7B47;
    font-family: Montserrat;
    font-weight: 500;
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
    border-radius: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
    box-shadow:0.125rem 0.125rem 0.5rem rgba(0,0,0,1);
`

export const ContainerInfos = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-top:-80px;
`

export const InfoBanner = styled.div<HoverComponentProps>`
    display: flex;
    flex-direction: column;
    margin: 20px;
    max-width: 280px;
    flex:1;
    cursor: default;
    padding: 20px;
    transition:all 0.3s;
    box-shadow:0.125rem 0.125rem 0.5rem rgba(0,0,0,1);
    ${props => props.focused && css`
        background-color: #0D5C63;
    `}
    ${props => !props.focused && css`
        background-color: #FFF;
    `}
`

export const ContainerTextPrincipalInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-top:10px ;
    margin-bottom:10px ;
`

export const TextPrincipalInfo = styled.div<HoverComponentProps>`
    font-family: Montserrat;
    white-space: nowrap;
    font-weight: bold;
    font-size: 24px;
    transition:all 0.3s;
    ${props => props.focused && css`
        color: #FFF;
    `}
    ${props => !props.focused && css`
        color: #252B42;
    `}
`

export const ContainerTextSecundarioInfo = styled.div`
    display: flex;
    flex-direction: column;
`

export const TextSecundarioInfo = styled.div<HoverComponentProps>`
    font-family: Montserrat;
    white-space: nowrap;
    font-size: 14px;
    transition:all 0.3s;
    ${props => props.focused && css`
        color: #FFF;
    `}
    ${props => !props.focused && css`
        color: #737373;
    `}
`

export const ContainerSobre = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    cursor: default;
`

export const ContainerTextSobre = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const TextSobrePrincipal = styled.div`
    color: #FFF;
    font-family: Montserrat;
    font-weight: bold;
    white-space: nowrap;
    font-size: 40px;
    margin-bottom: 10px;
`

export const TextSobreSecundario = styled.div`
    color: #FFF;
    font-family: Montserrat;
    font-size: 14px;
    white-space: nowrap;
`

export const ContainerTeam = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 60px;
`

export const ContainerEmployee = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FFF;
    justify-content: center;
    align-items: center;
    flex:1;
    padding: 10px;
    padding-left: 30px;
    padding-right: 30px;
    margin:10px;
    min-width: 200px;
    box-shadow:0.125rem 0.125rem 0.5rem rgba(0,0,0,1);
`

export const TextName = styled.div`
    margin-top: 20px;
    margin-bottom: 10px;
    color: #252B42;
    white-space: nowrap;
    font-family: Montserrat;
    font-weight: bold;
    font-size: 16px;
`

export const ContainerEmployeeImage = styled.div`
    display: flex;
    justify-content: center;
    width: 100px;
`

export const EmployeeImage = styled.img`
`

export const TextOccupation = styled.div`
    color: #737373;
    font-family: Montserrat;
    font-size: 14px;
    white-space: nowrap;
    margin-bottom: 10px;
`

export const ContainerSocial = styled.div`
    display: flex;
    flex-direction: row;
`

export const ContainerCompanies = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 50px;
`

export const ContainerCompanyImage = styled.div`
    display: flex;
    margin: 20px;
    margin-bottom: 0px;
    height: 45px;
`

export const ImageCompany = styled.img`
`

export const ContainerContato = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`

export const Contato = styled.div<HoverComponentProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:40px;
    align-items: center;
    margin: 10px;
    min-width: 180px;
    transition: all 0.3s;
    ${props => props.focused && css`
        background-color: #0D5C63;
        transform: scale(1.2);
    `}
    ${props => !props.focused && css`
        background-color: #FFF;
    `}
`

export const TextContato = styled.div<HoverComponentProps>`
    font-family: Montserrat;
    font-size: 14px;
    transition: all 0.3s;
    ${props => props.focused && css`
        color: #FFF;
    `}
    ${props => !props.focused && css`
        color: #252B42;
    `}
`

export const TitleContato = styled.div<HoverComponentProps>`
    font-family: Montserrat;
    font-size: 14px;
    font-weight: bold;
    transition: all 0.3s;
    ${props => props.focused && css`
        color: #FFF;
    `}
    ${props => !props.focused && css`
        color: #252B42;
    `}
`

export const TextTitleContainerContato = styled.div`
    font-family: Montserrat;
    font-weight: bold;
    font-size: 35px;
    color: #FFF;
    margin:40px;
    cursor:default;
`

export const ContatosGroup = styled.div`
    display: flex;
    flex-direction: row;
    flex:1;
    cursor:default;
`