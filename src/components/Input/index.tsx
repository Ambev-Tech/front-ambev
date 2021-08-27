import { InputBaseProps } from "@material-ui/core";
import React, { forwardRef, useCallback, useImperativeHandle, CSSProperties, useState } from "react";
import { useRef } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { AlertError, Container, ContainerError, ContainerInput, InputBase, Label, TooltipError } from "./style";

export interface InputRefProps {
    getInputValue: () => string;
    setInputValue: (value: string, type: string) => void;
}

interface InputProps extends InputBaseProps {
    isRequired: boolean;
    styleInput: CSSProperties;
    label: string;
    errors?: string | null;
}

const Input: React.ForwardRefRenderFunction<InputRefProps, InputProps> = ({ isRequired, errors, styleInput, label, ...props }, ref) => {
    const inputRef = useRef<HTMLDivElement>(null)
    const [hoverError, setHoverError] = useState<boolean>(false)

    const getInputValue = useCallback(() => {
        return inputRef.current?.getElementsByTagName('input')[0].value ? inputRef.current?.getElementsByTagName('input')[0].value : ""
    }, [inputRef])

    const setInputValue = useCallback((newValue) => {
        console.log(newValue)
        document.getElementsByClassName(label)[0].getElementsByTagName("input")[0].value = newValue
    }, [])

    useImperativeHandle(ref, () => {
        return {
            getInputValue,
            setInputValue
        };
    });

    const focusInput = useCallback(() => {
        inputRef.current?.getElementsByTagName('input')[0].focus()
    }, [])

    return (
        <Container ref={(ref: any) => ref = ref}>
            <Label>
                {label}
                {isRequired &&
                    <div style={{ display: "flex", marginLeft: 5, color: "#E83434" }}>*</div>
                }
            </Label>
            <ContainerInput error={!!errors}>
                <InputBase className={label} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" {...props} style={{ ...styleInput }} ref={inputRef} />
                {!!errors &&
                    <ContainerError onClick={focusInput}>
                        <AlertError onMouseEnter={() => setHoverError(true)} onMouseLeave={() => setHoverError(false)} style={{ opacity: errors !== null ? 1 : 0, cursor: errors !== null ? "default" : "text" }}>
                            <FiAlertCircle color={"#AF0708"} size={"1.375rem"} style={{ padding: "0.3125rem" }} />
                        </AlertError>
                        {hoverError &&
                            <TooltipError>{errors}</TooltipError>
                        }
                    </ContainerError>
                }
            </ContainerInput>
        </Container>
    )
}

export default forwardRef(Input)