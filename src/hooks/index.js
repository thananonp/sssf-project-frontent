import {useState} from "react";

const useField = (type, predata) => {
    const [value, setValue] = useState(predata)

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }


    return {
        type,
        value,
        onChange,
        reset,
        setValue
    }
}

const useNotification = (timeout) => {
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const [successText, setSuccessText] = useState('')
    const [failureText, setFailureText] = useState('')

    const alertSuccess = (text) => {
        setSuccess(true)
        setSuccessText(text)
        setTimeout(() => {
            setSuccess(false)
            setSuccessText('')
        }, timeout ? timeout : 2500)
    }
    const alertFailure = (text) => {
        setFailure(true)
        setFailureText(text)
        setTimeout(() => {
            setFailure(false)
            setFailureText('')
        }, timeout ? timeout : 2500)
    }

    return {success, failure,successText, failureText,alertSuccess, alertFailure}
}

export {useField, useNotification}