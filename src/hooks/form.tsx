import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface FormContextData {
    nome: string;
    cargo: string;
    bairro: string;
    posEstadoCivil: number;
    posSexo: number;
    endereco: string;
    nascimento: Date;
    cidade: string;
    cep: string;
    telefone1: string;
    telefone2: string;
    celular: string;
    contato: string;
    email: string;
    identidade: string;
    cpf: string;
    posHabilitacao: number;
    posVeiculo: number;
    setNome(value: string): void;
    setCargo(value: string): void;
    setBairro(value: string): void;
    setPosEstadoCivil(value: number): void;
    setPosSexo(value: number): void;
    setEndereco(value: string): void;
    setNascimento(value:Date):void;
    setCidade(value: string): void;
    setCep(value: string): void;
    setTelefone1(value: string): void;
    setTelefone2(value: string): void;
    setCelular(value: string): void;
    setContato(value: string): void;
    setEmail(value: string): void;
    setIdentidade(value: string): void;
    setCpf(value: string): void;
    setPosHabilitacao(value: number): void;
    setPosVeiculo(value: number): void;
}

const FormContext = createContext<FormContextData>({} as FormContextData)

export const FormProvider: React.FC = ({ children }) => {
    const [nome, setNome] = useState("")
    const [cargo, setCargo] = useState("")
    const [bairro, setBairro] = useState("")
    const [posEstadoCivil, setPosEstadoCivil] = useState(0)
    const [posSexo, setPosSexo] = useState(0)
    const [endereco, setEndereco] = useState("")
    const [nascimento, setNascimento] = useState(new Date())
    const [cidade, setCidade] = useState("")
    const [cep, setCep] = useState("")
    const [telefone1, setTelefone1] = useState("")
    const [telefone2, setTelefone2] = useState("")
    const [celular, setCelular] = useState("")
    const [contato, setContato] = useState("")
    const [email, setEmail] = useState("")
    const [identidade, setIdentidade] = useState("")
    const [cpf, setCpf] = useState("")
    const [posHabilitacao, setPosHabilitacao] = useState(0)
    const [posVeiculo, setPosVeiculo] = useState(0)

    return (
        <FormContext.Provider value={{ nome, setNome, bairro, cargo, celular, cep, cidade, contato, cpf, email, endereco, posEstadoCivil, posHabilitacao, identidade, setBairro, setCargo, setCelular, setCep, setCidade, setContato, setCpf, setEmail, setEndereco, setPosEstadoCivil, setPosHabilitacao, setIdentidade, setPosSexo, setTelefone1, setTelefone2, setPosVeiculo, posSexo, telefone1, telefone2, posVeiculo,nascimento,setNascimento }}>
            {children}
        </FormContext.Provider>
    )
}

export function useForm(): FormContextData {
    const context = useContext(FormContext)
    if (!context) {
        throw new Error('useForm must be used within an FormProvider')
    }
    return context;
}