import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { useGlobal } from '../../hooks/global';
import api from '../../services/api';
import { DeleteContentBackward, IsNumber } from '../../services/inputServices';
import { MaskCPF, MaskRG } from '../../services/maskServices';
import Input from '../Input';
import SelectFly from '../SelectFly';
import { useForm } from './../../hooks/form';
import Modal from '@material-ui/core/Modal';
import { LoadingCPF } from '../LoadingCPF';

export interface refDocumentsData {
    submite: Function;
}

export const optionVeiculo = ["Sim", "Não"]
export const optionHabilitacao = ["A", "B", "C", "D", "E"]

const DocumentsData: React.ForwardRefRenderFunction<refDocumentsData> = ({ }, ref) => {
    const [loading, setLoading] = useState<boolean>(false)

    const { openSelect } = useGlobal()

    const {
        identidade,
        setIdentidade,
        cpf,
        setCpf,
        posVeiculo,
        setPosVeiculo,
        posHabilitacao,
        setPosHabilitacao
    } = useForm()

    const [cpfNumber, setCpfNumber] = useState<string>(cpf)
    const [cpfString, setCpfString] = useState<string>(MaskCPF(cpf))

    const [rgNumber, setRgNumber] = useState<string>(identidade)
    const [rgString, setRgString] = useState<string>(MaskCPF(identidade))

    const [errorRG, setErrorRG] = useState<string | null>(null)
    const [errorCPF, setErrorCPF] = useState<string | null>(null)

    const VerifyCPF = useCallback(async () => {
        let error = null

        if (cpfNumber.length > 0 && cpfNumber.length < 11) error = "Formato Incorreto"
        else if (cpfNumber.length === 0) error = "Campo obrigatório"

        setErrorCPF(error)

        return error
    }, [cpfNumber])

    const VerifyRG = useCallback(() => {
        let error = null
        if (rgNumber.length > 0 && rgNumber.length < 10) error = "Formato Incorreto"
        else if (rgNumber.length === 0) error = "Campo obrigatório"

        setErrorRG(error)

        return error
    }, [rgNumber])

    const ValidateCPF = useCallback(async () => {
        let error = null
        setLoading(true)
        try {
            console.log(cpfNumber)
            const resu = await api.get(`/verificarCPF/${cpfNumber}`)
            console.log(resu)
            if (!resu.data.validate) error = "CPF já em uso"
        }catch(err){
            console.log(err)
            error = "Não foi Possível validar o CPF"
        }
        setLoading(false)
        setErrorCPF(error)
        return error
    }, [cpfNumber])

    const submite = useCallback(async () => {
        const veiculo = optionVeiculo[posVeiculo]
        const habilitacao = optionHabilitacao[posHabilitacao]
        const errorRG = VerifyRG()
        let errorCPF = await VerifyCPF()
        if (!!!errorRG && !!!errorCPF) errorCPF = await ValidateCPF()
        console.log({ errorRG, errorCPF })
        console.log({ identidade: rgNumber, cpf: cpfNumber, veiculo, habilitacao })

        return (!!errorRG || !!errorCPF)
    }, [posVeiculo, posVeiculo, rgNumber, cpfNumber])

    useImperativeHandle(ref, () => {
        return {
            submite
        };
    });

    const OnChangeInputCPF = useCallback((event) => {
        const char = event.nativeEvent.data
        const eventType = event.nativeEvent.inputType
        if (eventType === "insertText" && cpfNumber.length < 11 && IsNumber(char)) {
            setErrorCPF(null)
            setCpf(cpfNumber + char)
            setCpfNumber(cpfNumber + char)
            setCpfString(MaskCPF(cpfNumber + char))
        }
        else if (eventType === "deleteContentBackward" && cpfNumber) {
            setErrorCPF(null)
            setCpf(DeleteContentBackward(cpfNumber))
            setCpfNumber(DeleteContentBackward(cpfNumber))
            setCpfString(MaskCPF(DeleteContentBackward(cpfNumber)))
        }
    }, [cpfNumber, setCpfNumber, setCpfString])

    const OnChangeInputRG = useCallback((event) => {
        const char = event.nativeEvent.data
        const eventType = event.nativeEvent.inputType
        if (eventType === "insertText" && rgNumber.length < 10 && IsNumber(char)) {
            setErrorRG(null)
            setIdentidade(rgNumber + char)
            setRgNumber(rgNumber + char)
            setRgString(MaskRG(rgNumber + char))
        }
        else if (eventType === "deleteContentBackward" && rgNumber) {
            setErrorRG(null)
            setIdentidade(DeleteContentBackward(rgNumber))
            setRgNumber(DeleteContentBackward(rgNumber))
            setRgString(MaskRG(DeleteContentBackward(rgNumber)))
        }
    }, [rgNumber, setRgNumber, setRgString])

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", width: "30%", marginRight: 10 }}>
                    <Input
                        label="Identidade"
                        errors={errorRG}
                        styleInput={{ fontFamily: "Poppins" }}
                        isRequired={true}
                        value={rgString}
                        onChange={OnChangeInputRG}
                    />
                </div>
                <div style={{ display: "flex", width: "30%", marginRight: 10 }}>
                    <Input
                        label="CPF"
                        errors={errorCPF}
                        value={cpfString}
                        styleInput={{ fontFamily: "Poppins" }}
                        isRequired={true}
                        onChange={OnChangeInputCPF}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "20%", marginRight: 10 }}>
                    <div style={{ marginBottom: 10, color: "#FFF" }}>Veículo</div>
                    <SelectFly
                        styleContainer={{ marginRight: 0, fontFamily: "Poppins", boxShadow: "0.125rem 0.125rem 0.5rem rgba(0,0,0,1)" }}
                        styleLabel={{ background: "#FFF", color: openSelect !== "Select-Fly-Veiculo" ? "#262626" : "#3F51B5" }}
                        styleSelect={{ boxShadow: "0 0 0 0", color: "#262626", background: "#FFF" }}
                        onChangeOption={(num: number) => setPosVeiculo(num)}
                        posOption={posVeiculo}
                        options={optionVeiculo}
                        label=""
                        className="Select-Fly-Veiculo"
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "20%" }}>
                    <div style={{ marginBottom: 10, color: "#FFF" }}>Habilitação</div>
                    <SelectFly
                        styleContainer={{ marginRight: 0, fontFamily: "Poppins", boxShadow: "0.125rem 0.125rem 0.5rem rgba(0,0,0,1)" }}
                        styleLabel={{ background: "#FFF", color: openSelect !== "Select-Fly-Habilitacao" ? "#262626" : "#3F51B5" }}
                        styleSelect={{ boxShadow: "0 0 0 0", color: "#262626", background: "#FFF" }}
                        onChangeOption={(num: number) => setPosHabilitacao(num)}
                        posOption={posHabilitacao}
                        options={optionHabilitacao}
                        label=""
                        className="Select-Fly-Habilitacao"
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

export default forwardRef(DocumentsData)