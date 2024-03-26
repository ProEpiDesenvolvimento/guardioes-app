/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

import translate from '../locales/i18n'
import { scale } from '../utils/scalling'

const MultiSelector = ({ data, value, onChange, min, max, disabled }) => {
    const [open, setOpen] = useState(false)
    const [values, setValues] = useState(value || [])
    const [items, setItems] = useState(data || [])

    useEffect(() => {
        setValues(value)
    }, [value])

    useEffect(() => {
        setItems(data)
    }, [data])

    return (
        <DropDownPicker
            placeholder={translate('selector.label')}
            open={open}
            items={items}
            value={values}
            setOpen={setOpen}
            setItems={setItems}
            setValue={setValues}
            onChangeValue={onChange}
            multiple
            min={min}
            max={max}
            showBadgeDot={false}
            mode='BADGE'
            listMode='SCROLLVIEW'
            textStyle={{
                fontFamily: 'ArgentumSans',
                fontSize: scale(13),
                color: '#32323B',
                textAlign: 'center',
            }}
            style={{
                borderWidth: 0,
                opacity: disabled ? 0.5 : 1,
            }}
            dropDownContainerStyle={{
                borderWidth: 0,
            }}
            dropDownDirection='TOP'
            disabled={disabled}
            zIndex={3000}
            zIndexInverse={1000}
        />
    )
}

export default MultiSelector
