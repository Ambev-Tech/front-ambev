import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import brLocale from "date-fns/locale/pt-BR";
import { Container, Label } from './style';
import { forwardRef } from 'react';
import {
    KeyboardDatePicker,
    DatePickerView,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import {
    CSSProperties,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState
} from 'react';

interface DataPickerProps {
    inputStyle: CSSProperties;
    inputLabelStyle: CSSProperties;
    format: string;
    views: DatePickerView[];
    label?: string;
    disableFuture?: boolean;
    id: string;
    onChange: Function;
    initialDate: Date;
    position?: 'end' | 'start';
    disable?: boolean;
    inputVariante?: 'filled' | 'standard' | 'outlined';
    containerProps?: CSSProperties;
    KeyboardButtonProps?: CSSProperties;
    value?: Date;
}

export interface RefDataPickerProps {
    getDate: () => Date;
}

const DataPicker: React.ForwardRefRenderFunction<RefDataPickerProps, DataPickerProps> = ({ format, position = 'start', value, inputLabelStyle, inputStyle, views, label, inputVariante = 'standard', id, onChange, containerProps, initialDate, disable = false, KeyboardButtonProps = { color: "#847C7C" }, disableFuture = false }, ref) => {

    const [selectedDate, setSelectedDate] = useState(initialDate);

    const getDate = useCallback(() => {
        return selectedDate
    }, [selectedDate])

    useImperativeHandle(ref, () => {
        return {
            getDate
        };
    });

    const handleDateChange = useCallback((date: any) => {
        setSelectedDate(date)
        onChange(date)
    }, [])

    useEffect(() => {
        const input = document.getElementById(id)
        input?.setAttribute("style", "cursor:default")
        input?.setAttribute("readOnly", "")
    }, [])

    return (
        <div style={{display:"flex",flexDirection:"column",width:"100%"}}>
            <div style={{display:"flex",flexDirection:"row",marginBottom:10,color:"#FFF"}}>
                {label}
                <div style={{color:"#E83434",marginLeft:5}}>*</div>
            </div>
            <Container style={containerProps ? containerProps : {}}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={brLocale}>
                    <KeyboardDatePicker
                        id={id}
                        style={{width:"100%"}}
                        disableFuture={disableFuture}
                        disabled={disable}
                        inputVariant={inputVariante}
                        InputLabelProps={{ style: { ...inputLabelStyle } }}
                        format={format}
                        InputProps={{ style: { ...inputStyle } }}
                        KeyboardButtonProps={{ style: { zIndex: 10, ...KeyboardButtonProps } }}
                        InputAdornmentProps={{ position: position }}
                        views={views}
                        value={value ? value : selectedDate}
                        onChange={handleDateChange}
                    />
                </MuiPickersUtilsProvider>
            </Container>
        </div>
    )
}

export default forwardRef(DataPicker)