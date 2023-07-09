import React, { useState } from 'react';

export default function ZipPrompt(props) {
    const { state, setState/* , invalid  */ } = props;
    const [formData, setFormData] = useState('');

    function enter(e) {
        e.preventDefault();
        if (e.code === "Enter") {
            submit();
        }
    }

    function submit(e) {
        e.preventDefault();
        if (formData.length === 5) {
            setState({ ...state, isLoading: true, zip: String(formData), forceRender: state.forceRender + 1 });
        }
        else {
            setState({ ...state, invalid: true });
        }
    }

    return (
        <div id='zip'>
            <form>
                <label>Enter Your Zip Code</label>
                <input autoFocus type='number' value={formData} minLength={5} maxLength={5} onChange={e => setFormData(e.target.value)} />
                <button onClick={submit} onKeyDown={enter}>Submit</button>
                {state.invalid && <span>Invalid Zip Code</span>}
            </form>
            {(state.isLoading && !state.invalid) && <div><h3>Loading...</h3></div>}
        </div>
    );
}