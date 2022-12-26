import styled from 'styled-components';
import { CheckBox } from './CheckBox';
import { Input } from './Input';
import { RadioButton } from './RadioButton';
import { ISelectOptions, Select } from './Select';

interface IFieldProps {
    type?:      "text" | "select" | "radio" | "checkbox" | "date" | "number" | "amount" | "hour";
    options?:   ISelectOptions[];
    name:       string;
    label?:     string;
    width?:     number;
    value:      string;
    onChange:   (value: string) => void;
}

export const Field = ({ type, options, name, label, width, value, onChange }: IFieldProps) => {

    const formatNumber = (value: string) => {
        const newValue = value === '' ? '0':value.replace(/\D/g, '');
        return newValue;
    }

    const formatHour = (value: string) => {
        const textValue = ("000"+formatNumber(value)).slice(-3);

        const newValue = parseFloat(textValue) / 10;

        return newValue.toString();
    }

    const formatAmount = (value: string) => {
        const parseValue = Number.parseFloat(formatNumber(value));
        const newValue = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(parseValue);
        return newValue;
    }

    const formatValue = (value: string) => {
        switch (type) {
            case "number":
                return formatNumber(value);

            case "amount":
                return formatAmount(value);
                
            case "hour":
                return formatHour(value);
        
            default:
                return value;
        }
    }

    const isNumber = () => {
        return ['number', 'amount', 'hour'].find(value => value === type);
    }

    const handleChange = (value: string) => {
        const newValue = formatValue(value);
        onChange(newValue);
    }

    if(type === 'select' && options) {
        return (
            <Container width={width}>
                <label htmlFor={name}>{label}</label>
                <Select options={options} value={value} onChange={onChange} />
            </Container>
        )
    }

    if(type === 'radio') {
        return (
            <Container width={width}>
                <label htmlFor={name}>{label}</label>
                <RadioButton
                    type='radio'
                    name={name}
                    // value={value}
                    // value={value}
                    // checked={value === 'X'}
                    onClick={e => onChange(e.currentTarget.checked ? 'X':'')}
                    // onChange={e => onChange(e.target.checked ? 'X':'')}
                />
            </Container>
        )
    }

    if(type === 'checkbox') {
        return (
            <Container width={width}>
                {
                    label && <label htmlFor={name}>{label}</label>
                }
                <CheckBox
                    type='checkbox'
                    name={name}
                    checked={value === 'X'}
                    onChange={e => onChange(e.target.checked ? 'X':'')}
                />
            </Container>
        )
    }

    return (
        <Container width={width}>
            <label htmlFor={name}>{label}</label>
            <Input
                type={type === 'date' ? type : 'text'}
                name={name}
                value={formatValue(value)}
                onChange={e => handleChange(e.target.value)}
                style={
                    {
                        textAlign: (isNumber() ? 'right':'left'),
                    }
                }
            />
        </Container>
    )
}

interface IContainerProps {
    width?: number;
}

const Container = styled.div<IContainerProps>`
    display: flex;
    flex-direction: column;

    gap: 0.4rem;

    padding-bottom: 1rem;
    width: ${p => p.width ? `${p.width}rem`:`100%`};

    &>label {
        padding: 0 8px;
        
        font-size: 1rem;
        font-weight: bold;
    }
`;