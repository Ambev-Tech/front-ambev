import React from 'react';
import { Aba, Body, BodyContainerImage, Button, Container, ContainerCompanies, ContainerCompanyImage, ContainerContato, ContainerEmployee, ContainerEmployeeImage, ContainerImage, ContainerInfos, ContainerSobre, ContainerSocial, ContainerTeam, ContainerTextPrincipal, ContainerTextPrincipalInfo, ContainerTextSecundario, ContainerTextSecundarioInfo, ContainerTextSobre, Contato, ContatosGroup, EmployeeImage, Footer, Header, ImageCompany, InfoBanner, Menu, TextContato, TextName, TextOccupation, TextPrincipal, TextPrincipalInfo, TextSecundario, TextSecundarioInfo, TextSobrePrincipal, TextSobreSecundario, TextTitleContainerContato, TitleContato } from './style';
import { BiDesktop, BiPhone } from 'react-icons/bi';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineStock } from 'react-icons/ai';
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';
import Employee1 from './../../assets/Claudia.png';
import Employee2 from './../../assets/Paula.png';
import Employee3 from './../../assets/Cristian.png';
import Company1 from './../../assets/hooli.svg';
import Company2 from './../../assets/lyft.svg';
import Company3 from './../../assets/Vector.svg';
import Company4 from './../../assets/stripe.svg';
import Company5 from './../../assets/Aws.svg';
import Company6 from './../../assets/Vector_1.svg';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { useForm } from './../../hooks/form';

export const LandingPage: React.FC = () => {
    const [infoHover, setInfoHover] = useState<string>("")
    const { push } = useHistory()

    const { setBairro,setCargo,setCelular,setCep,setCidade,setContato,setCpf,setEmail,setEndereco,setIdentidade,setNascimento,setNome,setPosEstadoCivil,setPosHabilitacao,setPosSexo,setPosVeiculo,setTelefone1,setTelefone2} = useForm()
  
    const onClickCadastro = useCallback(()=>{
        setBairro("")
        setCargo("")
        setCelular("")
        setCep("")
        setCidade("")
        setContato("")
        setCpf("")
        setEmail("")
        setEndereco("")
        setIdentidade("")
        setNascimento(new Date())
        setNome("")
        setPosEstadoCivil(0)
        setPosHabilitacao(0)
        setPosSexo(0)
        setPosVeiculo(0)
        setTelefone1("")
        setTelefone2("")
        push("signup")
    },[])

    return (
        <Container>
            <ContainerImage id="home">
                <Header>
                    JobsNET
                    <Menu>
                        <Aba href="#home">Home</Aba>
                        <Aba href="#sobre">Sobre nós</Aba>
                        <Aba href="#contato">Contato</Aba>
                    </Menu>
                </Header>
                <BodyContainerImage>
                    <ContainerTextPrincipal>
                        <TextPrincipal>Recrutamos e</TextPrincipal>
                        <TextPrincipal>selecionamos</TextPrincipal>
                        <TextPrincipal>profissionais nas</TextPrincipal>
                        <TextPrincipal>mais diversas áreas</TextPrincipal>
                    </ContainerTextPrincipal>
                    <ContainerTextSecundario>
                        <TextSecundario>Venha fazer parte da maior empresa de tecnologica do Brasil.</TextSecundario>
                        <TextSecundario>Não perca essa oportunidade, se cadastre agora mesmo.</TextSecundario>
                    </ContainerTextSecundario>
                    <Button onClick={onClickCadastro}>CADASTRE-SE</Button>
                </BodyContainerImage>
            </ContainerImage>
            <Body>
                <ContainerInfos>
                    <InfoBanner focused={infoHover === "1"} onMouseEnter={() => setInfoHover("1")} onMouseLeave={() => setInfoHover("")}>
                        <BiDesktop size={40} style={{ transition: "all 0.3s" }} color={infoHover === "1" ? "#FFF" : "#0D5C63"} />
                        <ContainerTextPrincipalInfo>
                            <TextPrincipalInfo focused={infoHover === "1"}>Trabalho remoto</TextPrincipalInfo>
                            <TextPrincipalInfo focused={infoHover === "1"}>e presencial</TextPrincipalInfo>
                        </ContainerTextPrincipalInfo>
                        <ContainerTextSecundarioInfo>
                            <TextSecundarioInfo focused={infoHover === "1"}>A depender da vaga você pode</TextSecundarioInfo>
                            <TextSecundarioInfo focused={infoHover === "1"}>trabalhar no conforto da sua casa.</TextSecundarioInfo>
                        </ContainerTextSecundarioInfo>
                    </InfoBanner>
                    <InfoBanner focused={infoHover === "2"} onMouseEnter={() => setInfoHover("2")} onMouseLeave={() => setInfoHover("")}>
                        <IoLocationSharp size={40} style={{ transition: "all 0.3s" }} color={infoHover === "2" ? "#FFF" : "#0D5C63"} />
                        <ContainerTextPrincipalInfo>
                            <TextPrincipalInfo focused={infoHover === "2"}>Unidades JobsNET</TextPrincipalInfo>
                            <TextPrincipalInfo focused={infoHover === "2"}>por todo Brasil</TextPrincipalInfo>
                        </ContainerTextPrincipalInfo>
                        <ContainerTextSecundarioInfo>
                            <TextSecundarioInfo focused={infoHover === "2"}>Temos unidades em 18 estados</TextSecundarioInfo>
                            <TextSecundarioInfo focused={infoHover === "2"}>brasileiros.</TextSecundarioInfo>
                        </ContainerTextSecundarioInfo>
                    </InfoBanner>
                    <InfoBanner focused={infoHover === "3"} onMouseEnter={() => setInfoHover("3")} onMouseLeave={() => setInfoHover("")}>
                        <AiOutlineStock size={40} style={{ transition: "all 0.3s" }} color={infoHover === "3" ? "#FFF" : "#0D5C63"} />
                        <ContainerTextPrincipalInfo>
                            <TextPrincipalInfo focused={infoHover === "3"}>Desenvolvimento</TextPrincipalInfo>
                            <TextPrincipalInfo focused={infoHover === "3"}>de  carreira</TextPrincipalInfo>
                        </ContainerTextPrincipalInfo>
                        <ContainerTextSecundarioInfo>
                            <TextSecundarioInfo focused={infoHover === "3"}>Venha crescer conosco com profis-</TextSecundarioInfo>
                            <TextSecundarioInfo focused={infoHover === "3"}>sionais de culturas diversas.</TextSecundarioInfo>
                        </ContainerTextSecundarioInfo>
                    </InfoBanner>
                </ContainerInfos>
                <ContainerSobre id="sobre">
                    <ContainerTextSobre>
                        <TextSobrePrincipal>Conheça nosso time</TextSobrePrincipal>
                        <TextSobreSecundario>Temos os mais variados perfis que nos fazem ter grandes inovações e crescimento</TextSobreSecundario>
                    </ContainerTextSobre>
                    <ContainerTeam>
                        <ContainerEmployee>
                            <ContainerEmployeeImage>
                                <EmployeeImage src={Employee1} />
                            </ContainerEmployeeImage>
                            <TextName>Maria Clara</TextName>
                            <TextOccupation>Engenheira da Computação</TextOccupation>
                            <ContainerSocial>
                                <FaFacebookSquare color="#0D5C63" style={{ marginRight: 10 }} size={20} />
                                <FaInstagram color="#0D5C63" style={{ marginRight: 10 }} size={20} />
                                <FaTwitter color="#0D5C63" style={{ marginRight: 10 }} size={20} />
                            </ContainerSocial>
                        </ContainerEmployee>
                        <ContainerEmployee>
                            <ContainerEmployeeImage>
                                <EmployeeImage src={Employee2} />
                            </ContainerEmployeeImage>
                            <TextName>Amanda Sampaio</TextName>
                            <TextOccupation>Economista</TextOccupation>
                            <ContainerSocial>
                                <FaFacebookSquare color="#0D5C63" style={{ marginRight: 10 }} size={20} />
                                <FaInstagram color="#0D5C63" style={{ marginRight: 10 }} size={20} />
                                <FaTwitter color="#0D5C63" style={{ marginRight: 10 }} size={20} />
                            </ContainerSocial>
                        </ContainerEmployee>
                        <ContainerEmployee>
                            <ContainerEmployeeImage>
                                <EmployeeImage src={Employee3} />
                            </ContainerEmployeeImage>
                            <TextName>João Carlos</TextName>
                            <TextOccupation>Cientista de Dados</TextOccupation>
                            <ContainerSocial>
                                <FaFacebookSquare color="#0D5C63" style={{ marginRight: 10 }} size={20} />
                                <FaInstagram color="#0D5C63" style={{ marginRight: 10 }} size={20} />
                                <FaTwitter color="#0D5C63" style={{ marginRight: 10 }} size={20} />
                            </ContainerSocial>
                        </ContainerEmployee>
                    </ContainerTeam>
                    <ContainerCompanies>
                        <ContainerCompanyImage>
                            <ImageCompany src={Company1} />
                        </ContainerCompanyImage>
                        <ContainerCompanyImage>
                            <ImageCompany src={Company2} />
                        </ContainerCompanyImage>
                        <ContainerCompanyImage>
                            <ImageCompany src={Company3} />
                        </ContainerCompanyImage>
                        <ContainerCompanyImage>
                            <ImageCompany src={Company4} />
                        </ContainerCompanyImage>
                        <ContainerCompanyImage>
                            <ImageCompany src={Company5} />
                        </ContainerCompanyImage>
                        <ContainerCompanyImage>
                            <ImageCompany src={Company6} />
                        </ContainerCompanyImage>
                    </ContainerCompanies>
                </ContainerSobre>
                <ContainerContato id="contato">
                    <TextTitleContainerContato>Entre em contato</TextTitleContainerContato>
                    <ContatosGroup>
                        <Contato focused={infoHover === "4"} onMouseEnter={() => setInfoHover("4")} onMouseLeave={() => setInfoHover("")}>
                            <BiPhone size={60} style={{ transition: "all 0.3s", marginBottom: 10 }} color={infoHover === "4" ? "#FFF" : "#FF7B47"} />
                            <TextContato focused={infoHover === "4"}>0800 9999 9999</TextContato>
                            <TextContato focused={infoHover === "4"} style={{ marginBottom: 10 }}>(75) 99986 - 6581)</TextContato>
                            <TitleContato focused={infoHover === "4"}>Telefone</TitleContato>
                        </Contato>
                        <Contato focused={infoHover === "5"} onMouseEnter={() => setInfoHover("5")} onMouseLeave={() => setInfoHover("")}>
                            <IoLocationOutline size={60} style={{ transition: "all 0.3s", marginBottom: 10 }} color={infoHover === "5" ? "#FFF" : "#FF7B47"} />
                            <TextContato focused={infoHover === "5"}>São Felipe, Bahia, Brasil</TextContato>
                            <TextContato focused={infoHover === "5"} style={{ marginBottom: 10 }}>Rua Gões Calmom, 30</TextContato>
                            <TitleContato focused={infoHover === "5"}>Localização</TitleContato>
                        </Contato>
                        <Contato focused={infoHover === "6"} onMouseEnter={() => setInfoHover("6")} onMouseLeave={() => setInfoHover("")}>
                            <FiSend size={60} style={{ transition: "all 0.3s", marginBottom: 10 }} color={infoHover === "6" ? "#FFF" : "#FF7B47"} />
                            <TextContato focused={infoHover === "6"}>josbsnet@tec.io</TextContato>
                            <TextContato focused={infoHover === "6"} style={{ marginBottom: 10 }}>jobsnet.acessoria@tec.io</TextContato>
                            <TitleContato focused={infoHover === "6"}>Email</TitleContato>
                        </Contato>
                    </ContatosGroup>
                </ContainerContato>

            </Body>
            <Footer>
                © 2021  JobsNET
            </Footer>
        </Container>
    )
}