import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { DeleteContentBackward, IsNumber } from '../../services/inputServices';
import { MaskCEP } from '../../services/maskServices';
import Input, { InputRefProps } from '../Input';
import { useForm } from './../../hooks/form';
import * as Yup from 'yup';
import axios from 'axios';
import api from '../../services/api';
import { LoadingCPF } from '../LoadingCPF';
import { Modal } from '@material-ui/core';

export interface refAddressData {
    submite: Function;
}

const Address: React.ForwardRefRenderFunction<refAddressData> = ({ }, ref) => {
    const cidadeRef = useRef<InputRefProps>(null)
    const bairroRef = useRef<InputRefProps>(null)
    const enderecoRef = useRef<InputRefProps>(null)

    const [errorCEP, setErrorCEP] = useState<string | null>(null)
    const [errorCidade, setErrorCidade] = useState<string | null>(null)
    const [errorBairro, setErrorBairro] = useState<string | null>(null)
    const [errorEndereco, setErrorEndereco] = useState<string | null>(null)

    const [loading, setLoading] = useState<boolean>(false)

    const {
        cep,
        setCep,
        cidade,
        setCidade,
        bairro,
        setBairro,
        endereco,
        setEndereco
    } = useForm()

    const [cepNumber, setCepNumber] = useState<string>(cep)
    const [cepString, setCepString] = useState<string>(MaskCEP(cep))

    const OnChangeInputCEP = useCallback(async (event) => {
        const char = event.nativeEvent.data
        const eventType = event.nativeEvent.inputType
        if (eventType === "insertText" && cepNumber.length < 8 && IsNumber(char)) {
            const newCep = cepNumber + char
            setErrorCEP(null)
            setCep(cepNumber + char)
            setCepNumber(cepNumber + char)
            setCepString(MaskCEP(cepNumber + char))
            if(newCep.length  === 8)await SearchAddress(newCep)
        }
        else if (eventType === "deleteContentBackward" && cepNumber) {
            setErrorCEP(null)
            setCep(DeleteContentBackward(cepNumber))
            setCepNumber(DeleteContentBackward(cepNumber))
            setCepString(MaskCEP(DeleteContentBackward(cepNumber)))
        }
    }, [cepNumber, setCepNumber, setCepString])

    const VerifyCidade = useCallback(async () => {
        let resu
        setErrorCidade(null)
        const cidade = cidadeRef.current?.getInputValue()
        const schemaName = Yup.object().shape({
            cidade: Yup.string().required("Campo obrigatório")
        })
        try {
            await await schemaName.validate({ cidade })
        } catch (err: any) {
            setErrorCidade(err.errors ? err.errors[0] : null)
            resu = err.errors ? err.errors[0] : null
        }
        return resu
    }, [cidadeRef])

    const VerifyBairro = useCallback(async () => {
        let resu
        setErrorBairro(null)
        const bairro = bairroRef.current?.getInputValue()
        const schemaName = Yup.object().shape({
            bairro: Yup.string().required("Campo obrigatório")
        })
        try {
            await await schemaName.validate({ bairro })
        } catch (err: any) {
            setErrorBairro(err.errors ? err.errors[0] : null)
            resu = err.errors ? err.errors[0] : null
        }
        return resu
    }, [bairroRef])

    const VerifyEndereco = useCallback(async () => {
        let resu
        setErrorEndereco(null)
        const endereco = enderecoRef.current?.getInputValue()
        const schemaName = Yup.object().shape({
            endereco: Yup.string().required("Campo obrigatório")
        })
        try {
            await await schemaName.validate({ endereco })
        } catch (err: any) {
            setErrorEndereco(err.errors ? err.errors[0] : null)
            resu = err.errors ? err.errors[0] : null
        }
        return resu
    }, [enderecoRef])

    const VerifyCEP = useCallback(() => {
        let error = null

        if (cepNumber.length > 0 && cepNumber.length < 8) error = "Formato Incorreto"
        else if (cepNumber.length === 0) error = "Campo obrigatório"

        setErrorCEP(error)

        return error
    }, [cepNumber])

    const SearchAddress = useCallback(async (cep)=>{
        try{
            setLoading(true)
            const resu = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
            const newCidade = resu.data.localidade ? resu.data.localidade : ""
            const newBairro = resu.data.bairro ? resu.data.bairro : ""
            cidadeRef.current?.setInputValue(newCidade,"cidade")
            setCidade(newCidade)
            bairroRef.current?.setInputValue(newBairro,"bairro")
            setBairro(newBairro)
            console.log(resu.data)
        }catch(err){
            console.log(err)
        }
        setLoading(false)
    },[])

    const submite = useCallback(async () => {
        const cidade = cidadeRef.current?.getInputValue()
        const bairro = bairroRef.current?.getInputValue()
        const endereco = enderecoRef.current?.getInputValue()

        const errorCidade = await VerifyCidade()
        const errorCEP = await VerifyCEP()
        const errorEndereco = await VerifyEndereco()
        const errorBairro = await VerifyBairro()

        console.log({ errorCidade, errorCEP, errorEndereco, errorBairro })
        console.log({ cep: cepNumber, cidade, bairro, endereco })

        return (!!errorCidade || !!errorCEP || !!errorEndereco || !!errorBairro)
    }, [cepNumber,cidadeRef,bairroRef,enderecoRef])

    useImperativeHandle(ref, () => {
        return {
            submite
        };
    });

    const onChangeInputCidade = useCallback(() => {
        setErrorCidade(null)
        setCidade(!cidadeRef.current?.getInputValue() ? "" : cidadeRef.current?.getInputValue())
    }, [cidadeRef])

    const onChangeInputEndereco = useCallback(() => {
        setErrorEndereco(null)
        setEndereco(!enderecoRef.current?.getInputValue() ? "" : enderecoRef.current?.getInputValue())
    }, [enderecoRef])

    const onChangeInputBairro = useCallback(() => {
        setErrorBairro(null)
        setBairro(!bairroRef.current?.getInputValue() ? "" : bairroRef.current?.getInputValue())
    }, [bairroRef])

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", width: "33%", marginRight: 10 }}>
                    <Input
                        label="CEP"
                        styleInput={{ fontFamily: "Poppins" }}
                        onChange={OnChangeInputCEP}
                        value={cepString}
                        errors={errorCEP}
                        isRequired={true}
                    />
                </div>
                <div style={{ display: "flex", width: "33%", marginRight: 10 }}>
                    <Input
                        label="Cidade"
                        styleInput={{ fontFamily: "Poppins" }}
                        errors={errorCidade}
                        ref={cidadeRef}
                        defaultValue={cidade}
                        onChange={onChangeInputCidade}
                        isRequired={true}
                    />
                </div>
                <div style={{ display: "flex", width: "34%" }}>
                    <Input
                        label="Bairro"
                        styleInput={{ fontFamily: "Poppins" }}
                        errors={errorBairro}
                        ref={bairroRef}
                        defaultValue={bairro}
                        onChange={onChangeInputBairro}
                        isRequired={true}
                    />
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", width: "100%", marginTop: 20 }}>
                    <Input
                        label="Endereço"
                        styleInput={{ fontFamily: "Poppins" }}
                        ref={enderecoRef}
                        errors={errorEndereco}
                        defaultValue={endereco}
                        onChange={onChangeInputEndereco}
                        isRequired={true}
                    />
                </div>
            </div>
            {loading &&
                <Modal open={loading} >
                    <div style={{ display: "flex", flexDirection: "column", outline: 0, width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <LoadingCPF />
                    </div>
                </Modal>
            }
        </div>

    )
}

export default forwardRef(Address)