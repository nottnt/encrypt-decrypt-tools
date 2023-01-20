import React from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';

interface IFormInput {
    id: string,
    label: string,
    onChange: any,
    value?: string | number,
    type?: string,
    multiline?: boolean,
    rows?: number
}

const FormInput = ({ id, label, onChange, value, type, multiline = false, rows }: IFormInput): React.ReactElement => {
    return (
        <FormControl
            component="fieldset"
            sx={{
                width: '100%',
                p: 1
            }}
        >
            <FormGroup>
                <TextField
                    id={id}
                    onChange={onChange}
                    value={value}
                    type={type}
                    multiline={multiline}
                    rows={rows}
                    label={label}
                    InputLabelProps={{ shrink: true }}
                />
            </FormGroup>
        </FormControl>
    )
}

export default FormInput