import   React, { forwardRef, useImperativeHandle } from 'react';
import { useGlobal }                                from '../../hooks/global';
import { HTMLAttributes, 
         useCallback, 
         useEffect, 
         CSSProperties
       } from 'react';
import { Icon,
         ContainerOptions,
         OptionLabel,
         LabelSpan
       } from './style';

interface SelectFlyProps extends HTMLAttributes<HTMLDivElement>{
    options:string[];
    onChangeOption:Function;
    posOption:number;
    styleContainer?:CSSProperties;
    styleSelect?:CSSProperties;
    label?:string;
    styleLabel?:CSSProperties;
    disable?:boolean;
}

export interface RefSelectFlyProps{
    getPos:() => Number;
}

const customStyleSelect:CSSProperties = {
    position:'relative',
    boxShadow:"0.125rem 0.125rem 0.5rem rgba(0,0,0,0.7)",
    border:'2px #C4C4C4 solid',
    justifyContent:'space-between',
    cursor:'pointer',
    background:'#FFF',
    display:'flex',
    height:"calc(100% - 4px)",
    alignItems:'center',
    paddingLeft:"0.625rem",
    paddingRight:"0.625rem",
    borderRadius:"0.3125rem"
}

const customStyleContainer:CSSProperties = {
    position:"relative",
    height:'100%',
    marginRight:"0.625rem"
}

const SelectFly:React.ForwardRefRenderFunction<RefSelectFlyProps,SelectFlyProps> = ({className,disable = false,styleLabel = {},label,options,posOption,onChangeOption,styleSelect = {},styleContainer = {}},ref) => {
    const { openSelect,setOpenSelect} = useGlobal()
 
    const ChangeClassImage = useCallback(()=>{
        if(className)
        {
            document.getElementsByClassName(className)[0].getElementsByTagName("path")[0].setAttribute("class",className)
            document.getElementsByClassName(className)[0].getElementsByTagName("svg")[0].setAttribute("class",className)
        }
    },[])

    const getPos = useCallback(()=>{
        return posOption
    },[posOption])

    useImperativeHandle(ref,() => {
        return {
            getPos
        };
    });

    useEffect(()=>ChangeClassImage(),[])

    const ClickSelect = useCallback(()=>{
        ChangeClassImage()
        if(openSelect === className)setOpenSelect('-1')
    },[openSelect])

    const ClickOption = useCallback((index)=>{
        if(index !== posOption)onChangeOption(index)
    },[posOption])

    return(
    <div className={className} style={{...customStyleContainer,...styleContainer}}>

            <div className={className} onClick={()=> disable ? {} : ClickSelect()} style={{...customStyleSelect,color:disable ? "#A89E9F" :"",cursor:disable ? "default" : "pointer",...styleSelect}}>
                <div className={className} >{options[posOption]}</div>
                <Icon open={(openSelect === className && !disable)} className={className} size={"1.25rem"}/>
            </div>

            {(openSelect === className && !disable)  &&
                <ContainerOptions>
                    {options.map((option,index)=>(
                        <OptionLabel key={index} select={index === posOption} onClick={()=>ClickOption(index)}>{option}</OptionLabel>
                    ))}
                </ContainerOptions>
            }
            {label &&
                <LabelSpan style={styleLabel}>{label}</LabelSpan>
            }

        </div>
    )
}

export default forwardRef(SelectFly);