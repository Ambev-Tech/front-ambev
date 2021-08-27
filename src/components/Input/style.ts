import styled, { css } from "styled-components";
import { InputBase as InputMaterial } from '@material-ui/core';

interface ContainerProps{
    error:boolean;
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const ContainerInput = styled.div<ContainerProps>`
    display:flex;
    flex-direction:row;
    border-radius: 5px;
    border: 2px solid #C4C4C4;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    box-shadow: 0.125rem 0.125rem 0.5rem rgba(0,0,0,1); 
    background-color: #FFF;
    ${props => props.error && css `
        border: 2px solid #AF0708;
    `}
`

export const InputBase = styled(InputMaterial)`
    width:100%;
`

export const Label = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    color: #FFF;
`

export const ContainerError = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

export const TooltipError = styled.div`
    display:flex;
    font-family: math;
    font-weight: bold;
    font-size: 1rem;
    position:absolute;
    left:50%;
    color:#FFF;
    transform:translatex(-50%);
    bottom:calc(100% + 0.375rem);
    background:#32416B;
    padding:0.625rem;
    border-radius:0.3125rem;
    white-space: nowrap;
    ::before{
        border-style:solid;
        border-color: #32416B transparent;
        border-width: 0.375rem 0.375rem 0 0.375rem;
        bottom:-0.3125rem;
        content: "";
        left:50%;
        transform:translatex(-50%);
        position: absolute;
    }
    box-shadow:0.125rem 0.125rem 0.5rem rgba(0,0,0,0.7);
    z-index: 999;
`

export const AlertError = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
`  
