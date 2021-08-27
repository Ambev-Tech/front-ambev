import styled from 'styled-components';

export const Container = styled.div`
    border:2px solid #C4C4C4;
    position: relative;
    border-radius: 0.3125rem;
    height: calc(100% - 4px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    *::before{
        transition: none !important;
        transform: none !important;
        animation: none !important;
        border:0rem !important;
    }
    *::after{
        transition: none !important;
        animation: none !important;
        transform: none !important;
        border:0rem !important;
    }
    *:focus{
        background-color: transparent !important;
        transition: none !important;
        animation: none !important;
        transform: none !important;
        border:0rem !important;
    }
    *:hover{
        border:0rem !important;
    }
`

export const Label = styled.div`
    position: absolute;
    font-size: 0.75rem;
    top: 0rem;
    left: 0.5rem;
    font-family: "Sahitya-Bold";
    transform:translatey(-50%);
    color:#757575;
    padding-left: 0.3125rem;
    padding-right: 0.3125rem;
`