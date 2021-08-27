import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import Input, { InputRefProps } from '../Input';
import { useForm } from './../../hooks/form';
import * as Yup from 'yup';

export interface refProfessionData {
    submite: Function;
}

const Profession: React.ForwardRefRenderFunction<refProfessionData> = ({},ref) => {
    const refCargo = useRef<InputRefProps>(null)
    const { cargo, setCargo } = useForm()

    const [errorCargo, setErrorCargo] = useState<string | null>(null)

    const VerifyCargo = useCallback(async () => {
        let resu
        setErrorCargo(null)
        const cargo = refCargo.current?.getInputValue()
        const schemaName = Yup.object().shape({
            cargo: Yup.string().required("Campo obrigatório")
        })
        try {
            await await schemaName.validate({ cargo })
        } catch (err: any) {
            setErrorCargo(err.errors ? err.errors[0] : null)
            resu = err.errors ? err.errors[0] : null
        }
        return resu
    }, [refCargo])
    
    const submite = useCallback(async () => {
        const cargo = refCargo.current?.getInputValue()

        const errorCargo = await VerifyCargo()

        console.log({ errorCargo })
        console.log({ cargo })

        return (!!errorCargo)
    }, [refCargo])

    useImperativeHandle(ref, () => {
        return {
            submite
        };
    });

    const onChangeInputCargo = useCallback(() => {
        setErrorCargo(null)
        setCargo(!refCargo.current?.getInputValue() ? "" : refCargo.current?.getInputValue())
    }, [refCargo])

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", width: "100%" }}>
                    <Input
                        label="Profissão"
                        styleInput={{ fontFamily: "Poppins" }}
                        ref={refCargo}
                        errors={errorCargo}
                        defaultValue={cargo}
                        onChange={onChangeInputCargo}
                        isRequired={true}
                    />
                </div>
            </div>
        </div>

    )
}

export default forwardRef(Profession)