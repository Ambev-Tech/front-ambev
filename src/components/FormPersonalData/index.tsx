import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useGlobal } from '../../hooks/global';
import DataPicker from '../DataPicker';
import Input, { InputRefProps } from '../Input';
import SelectFly from '../SelectFly';
import { MaskFixo, MaskPhone } from '../../services/maskServices';
import { DeleteContentBackward, IsNumber } from '../../services/inputServices';
import { useForm } from './../../hooks/form';
import * as Yup from 'yup';

export interface refFormPersonalData {
    submite: Function;
}

export const optionCivil = ["Casado", "Solteiro", "Viúvo"]
export const optionSexo = ["Mulher", "Homem", "Trans", "Outros"]

const FormPersonalData: React.ForwardRefRenderFunction<refFormPersonalData> = ({ }, ref) => {

    const {
        posEstadoCivil,
        posSexo,
        setPosEstadoCivil,
        setPosSexo,
        nome,
        setNome,
        nascimento,
        setNascimento,
        telefone1,
        setTelefone1,
        telefone2,
        setTelefone2,
        celular,
        setCelular,
        email,
        setEmail
    } = useForm()

    const nameRef = useRef<InputRefProps>(null)
    const emailRef = useRef<InputRefProps>(null)

    const { openSelect } = useGlobal()

    

    const [phoneNumber, setPhoneNumber] = useState<string>(celular)
    const [phoneString, setPhoneString] = useState<string>(MaskPhone(celular))

    const [fixoNumber1, setFixoNumber1] = useState<string>(telefone1)
    const [fixoString1, setFixoString1] = useState<string>(MaskFixo(telefone1))

    const [fixoNumber2, setFixoNumber2] = useState<string>(telefone2)
    const [fixoString2, setFixoString2] = useState<string>(MaskFixo(telefone2))

    const OnChangeInputPhone = useCallback((event) => {
        const char = event.nativeEvent.data
        const eventType = event.nativeEvent.inputType
        if (eventType === "insertText" && phoneNumber.length < 11 && IsNumber(char)) {
            setErrorPhone(null)
            setCelular(phoneNumber + char)
            setPhoneNumber(phoneNumber + char)
            setPhoneString(MaskPhone(phoneNumber + char))
        }
        else if (eventType === "deleteContentBackward" && phoneNumber) {
            setErrorPhone(null)
            setCelular(DeleteContentBackward(phoneNumber))
            setPhoneNumber(DeleteContentBackward(phoneNumber))
            setPhoneString(MaskPhone(DeleteContentBackward(phoneNumber)))
        }
    }, [phoneNumber, setPhoneNumber, setPhoneString])

    const OnChangeInputFixo1 = useCallback((event) => {
        const char = event.nativeEvent.data
        const eventType = event.nativeEvent.inputType
        if (eventType === "insertText" && fixoNumber1.length < 10 && IsNumber(char)) {
            setErrorFixo1(null)
            setTelefone1(fixoNumber1 + char)
            setFixoNumber1(fixoNumber1 + char)
            setFixoString1(MaskFixo(fixoNumber1 + char))
        }
        else if (eventType === "deleteContentBackward" && fixoNumber1) {
            setErrorFixo1(null)
            setTelefone1(DeleteContentBackward(fixoNumber1))
            setFixoNumber1(DeleteContentBackward(fixoNumber1))
            setFixoString1(MaskFixo(DeleteContentBackward(fixoNumber1)))
        }
    }, [fixoNumber1, setFixoNumber1, setFixoString1])

    const OnChangeInputFixo2 = useCallback((event) => {
        const char = event.nativeEvent.data
        const eventType = event.nativeEvent.inputType
        if (eventType === "insertText" && fixoNumber2.length < 10 && IsNumber(char)) {
            setErrorFixo2(null)
            setTelefone2(fixoNumber2 + char)
            setFixoNumber2(fixoNumber2 + char)
            setFixoString2(MaskFixo(fixoNumber2 + char))
        }
        else if (eventType === "deleteContentBackward" && fixoNumber2) {
            setErrorFixo2(null)
            setTelefone2(DeleteContentBackward(fixoNumber2))
            setFixoNumber2(DeleteContentBackward(fixoNumber2))
            setFixoString2(MaskFixo(DeleteContentBackward(fixoNumber2)))
        }
    }, [fixoNumber2, setFixoNumber2, setFixoString2])

    const [errorEmail, setErrorEmail] = useState<string | null>(null)
    const [errorName, setErrorName] = useState<string | null>(null)
    const [errorFixo1, setErrorFixo1] = useState<string | null>(null)
    const [errorFixo2, setErrorFixo2] = useState<string | null>(null)
    const [errorPhone, setErrorPhone] = useState<string | null>(null)

    const VerifyName = useCallback(async () => {
        let resu
        setErrorName(null)
        const name = nameRef.current?.getInputValue()
        const schemaName = Yup.object().shape({
            name: Yup.string().required("Campo obrigatório")
        })
        try {
            await await schemaName.validate({ name })
        } catch (err: any) {
            setErrorName(err.errors ? err.errors[0] : null)
            resu = err.errors ? err.errors[0] : null
        }
        return resu
    }, [nameRef])

    const VerifyEmail = useCallback(async () => {
        let resu
        setErrorEmail(null)
        const email = emailRef.current?.getInputValue()
        const schemaEmail = Yup.object().shape({
            email: Yup.string().required("Campo obrigatório").email("Digite um e-mail válido")
        })
        try {
            await await schemaEmail.validate({ email })
        } catch (err: any) {
            setErrorEmail(err.errors ? err.errors[0] : null)
            resu = err.errors ? err.errors[0] : null
        }
        return resu
    }, [emailRef])

    const VerifyFixo1 = useCallback(() => {
        let error = null

        if (fixoNumber1.length > 0 && fixoNumber1.length < 10) error = "Formato Incorreto"
        else if (fixoNumber1.length === 0) error = "Campo obrigatório"

        setErrorFixo1(error)

        return error
    }, [fixoNumber1])

    const VerifyFixo2 = useCallback(() => {
        let error = null

        if (fixoNumber2.length > 0 && fixoNumber2.length < 10) error = "Formato Incorreto"

        setErrorFixo2(error)

        return error
    }, [fixoNumber2])

    const VerifyPhone = useCallback(() => {
        let error = null

        if (phoneNumber.length > 0 && phoneNumber.length < 10) error = "Formato Incorreto"
        else if (phoneNumber.length === 0) error = "Campo obrigatório"

        setErrorPhone(error)

        return error
    }, [phoneNumber])

    const submite = useCallback(async () => {
        const name = nameRef.current?.getInputValue()
        const email = emailRef.current?.getInputValue()
        const estadoCivil = optionCivil[posEstadoCivil]
        const sexo = optionSexo[posSexo]
        const errorName = await VerifyEmail()
        const errorEmail = await VerifyName()
        const errorFixo1 = await VerifyFixo1()
        const errorFixo2 = await VerifyFixo2()
        const errorPhone = await VerifyPhone()
        console.log({ errorEmail, errorName, errorFixo1, errorFixo2, errorPhone })
        console.log({ name, email, nascimento, celular, telefone1, telefone2, estadoCivil, sexo })
        return (!!errorEmail || !!errorName || !!errorFixo1 || !!errorFixo2 || !!errorPhone)
    }, [nameRef, emailRef, celular, telefone1, telefone2, nascimento, posEstadoCivil, posSexo])

    useImperativeHandle(ref, () => {
        return {
            submite
        };
    });

    const onChangeInputName = useCallback(() => {
        setErrorName(null)
        setNome(!nameRef.current?.getInputValue() ? "" : nameRef.current?.getInputValue())
    }, [nameRef])

    const onChangeInputEmail = useCallback(() => {
        setErrorEmail(null)
        setEmail(!emailRef.current?.getInputValue() ? "" : emailRef.current?.getInputValue())
    }, [emailRef])

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", width: "90%", marginRight: 10 }}>
                    <Input
                        errors={errorName}
                        label="Nome Completo"
                        defaultValue={nome}
                        onChange={onChangeInputName}
                        styleInput={{ fontFamily: "Poppins" }}
                        ref={nameRef}
                        isRequired={true}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "10%", minWidth: 200 }}>
                    <div style={{ marginBottom: 10, color: "#FFF" }}>Estado civil</div>
                    <SelectFly
                        styleContainer={{ marginRight: 0, fontFamily: "Poppins", boxShadow: "0.125rem 0.125rem 0.5rem rgba(0,0,0,1)" }}
                        styleLabel={{ background: "#FFF", color: openSelect !== "Select-Fly-EstadoCivil" ? "#262626" : "#3F51B5" }}
                        styleSelect={{ boxShadow: "0 0 0 0", color: "#262626", background: "#FFF" }}
                        onChangeOption={(num: number) => setPosEstadoCivil(num)}
                        posOption={posEstadoCivil}
                        options={optionCivil}
                        label=""
                        className="Select-Fly-EstadoCivil"
                    />
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                <div style={{ display: "flex", width: "25%", marginRight: 10 }}>
                    <DataPicker
                        disableFuture
                        initialDate={new Date(nascimento)}
                        onChange={(date: any) => setNascimento(date)}
                        inputStyle={{ color: "#000", paddingLeft: "0.625rem", fontFamily: 'Poppins', display: "flex", justifyContent: "flex-end" }}
                        format={"dd/MM/yyyy"}
                        containerProps={{ color: "#000", background: "#FFF", boxShadow: "0.125rem 0.125rem 0.5rem rgba(0,0,0,1)" }}
                        inputLabelStyle={{ background: "#d2daeb", color: "#757575" }}
                        views={["year", "month", "date"]}
                        position="end"
                        KeyboardButtonProps={{ color: "#1a1a1b" }}
                        id={"DataPickerModalClient"}
                        label={"Data de nascimento"} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "25%", marginRight: 10 }}>
                    <div style={{ marginBottom: 10, color: "#FFF" }}>Sexo</div>
                    <SelectFly
                        styleContainer={{ marginRight: 0, fontFamily: "Poppins", boxShadow: "0.125rem 0.125rem 0.5rem rgba(0,0,0,1)" }}
                        styleLabel={{ background: "#FFF", color: openSelect !== "Select-Fly-Sexo" ? "#262626" : "#3F51B5" }}
                        styleSelect={{ boxShadow: "0 0 0 0", color: "#262626", background: "#FFF" }}
                        onChangeOption={(num: number) => setPosSexo(num)}
                        posOption={posSexo}
                        options={optionSexo}
                        label=""
                        className="Select-Fly-Sexo"
                    />
                </div>
                <div style={{ display: "flex", width: "50%" }}>
                    <Input
                        label="Telefone Fixo 1"
                        value={fixoString1}
                        errors={errorFixo1}
                        onChange={OnChangeInputFixo1}
                        styleInput={{ fontFamily: "Poppins" }}
                        ref={emailRef}
                        isRequired={true}
                    />
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                <div style={{ display: "flex", width: "33%", marginRight: 10 }}>
                    <Input
                        label="Telefone Fixo 2"
                        value={fixoString2}
                        errors={errorFixo2}
                        onChange={OnChangeInputFixo2}
                        styleInput={{ fontFamily: "Poppins" }}
                        isRequired={false}
                    />
                </div>
                <div style={{ display: "flex", width: "34%", marginRight: 10 }}>
                    <Input
                        label="Celular"
                        onChange={OnChangeInputPhone}
                        value={phoneString}
                        errors={errorPhone}
                        styleInput={{ fontFamily: "Poppins" }}
                        isRequired={true}
                    />
                </div>
                <div style={{ display: "flex", width: "33%" }}>
                    <Input
                        label="Email"
                        errors={errorEmail}
                        ref={emailRef}
                        styleInput={{ fontFamily: "Poppins" }}
                        onChange={onChangeInputEmail}
                        defaultValue={email}
                        isRequired={true}
                    />
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>

            </div>

        </div>

    )
}

export default forwardRef(FormPersonalData)