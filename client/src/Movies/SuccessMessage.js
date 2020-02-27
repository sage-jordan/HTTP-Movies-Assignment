import React from 'react';

export default function SuccessMessage (props) {
    console.log(props)
    return (
        <div className="success-message">
            <h2>{props.message}</h2>
        </div>
    )
};  