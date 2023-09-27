import React from 'react';

const InputField = (props) => {
    return (
        <div id={props.id} className="mb-3">
            <label className="form-label" htmlFor="">{props.label}</label>
            <input className="form-control"  size={props.size} type={props.type} value={props.value} placeholder={props.placeholder} onChange={props.onChange}/>
        </div>
    )
}

export default InputField;