import React, { useCallback } from 'react';
import { useState } from 'react';
import Address, { refAddressData } from '../../components/Address';
import DocumentsData, { refDocumentsData } from '../../components/DocumentsData';
import FormPersonalData, { refFormPersonalData } from '../../components/FormPersonalData';
import Profession, { refProfessionData } from '../../components/Profession';
import { ButtonBack, ButtonGo, Container, ContainerNavBar, NavBar } from './style';
import { useTransition, animated } from 'react-spring';
import CadastroFinalizado from '../../components/PaginaCadastroFim';
import { useRef } from 'react';
import api from '../../services/api';
import { useForm } from './../../hooks/form';
import { optionHabilitacao, optionVeiculo } from './../../components/DocumentsData';
import { optionCivil, optionSexo } from './../../components/FormPersonalData';
import { Modal } from '@material-ui/core';
import { LoadingCPF } from '../../components/LoadingCPF';

export const SignUp: React.FC = () => {
    const [atualPage, setAtualpage] = useState<number>(0);
    const refFormPersonalData = useRef<refFormPersonalData>(null)
    const refDocumentsData = useRef<refDocumentsData>(null)
    const refAddressData = useRef<refAddressData>(null)
    const refProfessionData = useRef<refProfessionData>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const { bairro, telefone1, telefone2, cargo, celular, cep, cidade, contato, cpf, email, endereco, identidade, nascimento, nome, posEstadoCivil, posHabilitacao, posSexo, posVeiculo } = useForm()

    const transitions = useTransition(atualPage, {
        keys: null,
        from: { opacity: 0 },
        enter: { opacity: 1, config: { duration: 400 } },
        leave: { opacity: 0, config: { duration: 0 } },
    })

    const ClickGo = useCallback(async (newPage) => {
        if (newPage === 1) {
            const errorFormPersonalData = await refFormPersonalData.current?.submite()
            if (!errorFormPersonalData) setAtualpage(newPage)
        }
        else if (newPage === 2) {
            const errorDocumentsData = await refDocumentsData.current?.submite()
            if (!errorDocumentsData) setAtualpage(newPage)
        }
        else if (newPage === 3) {
            const errorAddressDat = await refAddressData.current?.submite()
            if (!errorAddressDat) setAtualpage(newPage)
        }
        else if (newPage === 4) {
            const errorProfessionData = await refProfessionData.current?.submite()
            if (!errorProfessionData) {
                const dataNascimento = new Date(nascimento)
                try {
                    setLoading(true)
                    const resu = await api.post("/cadastro", {
                        nome: nome,
                        cep: cep,
                        cpf: cpf,
                        email: email,
                        bairro: bairro,
                        celular: celular,
                        telefone1: telefone1,
                        telefone2: telefone2,
                        cargo: cargo,
                        cidade: cidade,
                        contato: contato,
                        endereco: endereco,
                        identidade: identidade,
                        diaNascimento: dataNascimento.getDate(),
                        mesNascimento: dataNascimento.getMonth(),
                        anoNascimento: dataNascimento.getFullYear(),
                        estadoCivil: optionCivil[posEstadoCivil],
                        sexo: optionSexo[posSexo],
                        habilitacao: optionHabilitacao[posHabilitacao],
                        veiculo: optionVeiculo[posVeiculo]
                    })

                    console.log(resu)

                    if (resu.data.createdAt) setAtualpage(newPage)

                } catch (error) {
                    console.log(error)
                }
            }
            setLoading(false)
        }

    }, [refFormPersonalData, refDocumentsData, refAddressData, refProfessionData, bairro, telefone1, telefone2, cargo, celular, cep, cidade, contato, cpf, email, endereco, identidade, nascimento, nome, posEstadoCivil, posHabilitacao, posSexo, posVeiculo])

    const ClickBack = useCallback((newPage) => {
        setAtualpage(newPage)
    }, [])

    return (
        <Container>

            {atualPage !== 4 &&
                <ContainerNavBar>
                    <NavBar inPage={atualPage === 0}>Dados Pessoais</NavBar>
                    <NavBar inPage={atualPage === 1}>Documentos</NavBar>
                    <NavBar inPage={atualPage === 2}>Endereço</NavBar>
                    <NavBar inPage={atualPage === 3}>Cargo pretendido</NavBar>
                </ContainerNavBar>
            }

            <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", padding: 150, paddingTop: 50, paddingBottom: 20, height: "100%", position: "relative" }}>
                {transitions((style, i) => {
                    if (i === 0) return (
                        <animated.div style={{ position: "absolute", width: "calc(100% - 300px)", ...style }}>
                            <FormPersonalData ref={refFormPersonalData} />
                        </animated.div>
                    )
                    else if (i === 1) return (
                        <animated.div style={{ position: "absolute", width: "calc(100% - 300px)", ...style }}>
                            <DocumentsData ref={refDocumentsData} />
                        </animated.div>
                    )
                    else if (i === 2) return (
                        <animated.div style={{ position: "absolute", width: "calc(100% - 300px)", ...style }}>
                            <Address ref={refAddressData} />
                        </animated.div>
                    )
                    else if (i === 3) return (
                        <animated.div style={{ position: "absolute", width: "calc(100% - 300px)", ...style }}>
                            <Profession ref={refProfessionData} />
                        </animated.div>
                    )
                    else if (i === 4) return (
                        <animated.div style={{ position: "absolute", height: "calc(100% - 70px)", width: "calc(100% - 300px)", ...style }}>
                            <CadastroFinalizado />
                        </animated.div>
                    )
                })}
                {atualPage !== 4 &&
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "100%" }}>
                        {atualPage !== 0 &&
                            <ButtonBack onClick={() => ClickBack(atualPage - 1)}>VOLTAR</ButtonBack>
                        }
                        <ButtonGo onClick={() => ClickGo(atualPage + 1)}>AVANÇAR</ButtonGo>
                    </div>
                }
                {loading &&
                    <Modal open={loading} >
                        <div style={{ display: "flex", flexDirection: "column", outline: 0, width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                            <LoadingCPF />
                        </div>
                    </Modal>
                }
            </div>

        </Container>
    )
}
