import { MdKeyboardArrowDown } from "react-icons/md";
import   styled, { css }       from "styled-components";

interface SelectProps{
    open:boolean;
}

interface OptionProps{
    select:boolean;
}

export const Icon = styled(MdKeyboardArrowDown)<SelectProps>`
    transition: 0.2s all;
    ${props => props.open && css`
        transform: rotate(180deg);
    `}
    ${props => !props.open && css`
        transform: rotate(0deg);
    `}
`

export const ContainerOptions = styled.span`
    position:absolute;
    border-radius:0.3125rem;
    left:0;
    box-shadow:0.125rem 0.125rem 0.5rem rgba(0,0,0,0.7);
    display:flex;
    flex-direction:column;
    top:calc(100% + 0.625rem);
    z-index:999;
    padding-top:0.625rem;
    padding-bottom:0.625rem;
    background:#FFF;
    width:100%;
    max-height: 8.375rem;
    overflow-y:auto ;
`

export const OptionLabel = styled.div<OptionProps>`
    cursor: pointer;
    padding:0.625rem; 
    color: #6E6D7A;
    ${props => props.select && css`
        color: #000;
    `}
    :hover{
        background: #E7E7E9;
    }
`

export const LabelSpan = styled.span`
    position:absolute;
    left:0.5rem;
    padding-left: 0.3125rem;
    padding-right: 0.3125rem;
    top:-0.5rem;
    font-size: 0.75rem;
    background:#FFF;
`