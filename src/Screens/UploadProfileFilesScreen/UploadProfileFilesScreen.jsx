import React from 'react'
import useForm from '../../hooks/useForm'

const UploadProfileFilesScreen = () => {
    const initialFormState = {
        file: '',
        file_name: '',
    }
    function submitFn(formState) {
        console.log(formState)
    }
    const {formState, resetForm, handleChangeInput, onSubmit}  =useForm({initialFormState: initialFormState, submitFn})
  return (
    <div>
        <h1>Upload Profile Files</h1>
        <form action="" onSubmit={onSubmit}>
            <div>
                <label htmlFor="file_name">Nombre:</label>
                <input id='file_name' name='file_name' type="text" onChange={handleChangeInput} value={formState.file_name}/>
            </div>
            <div>
                <label htmlFor="file">Adjunta tu archivo</label>
                <input id='file' name='file' type="file" accept=".jpg,.jpeg,.png,.webp,.avif" onChange={handleChangeInput} />
                
            </div>
            <button type='submit'>Subir archivo</button>
        </form>
    </div>
  )
}

export default UploadProfileFilesScreen
