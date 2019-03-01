import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextField = ({
    name,
    placeholder,
    onChange,
    disabled,
    type,
    info,
    error,
    value,
    label
}) => {  

  return (
    <div className="form-group">
        <input
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className={classnames("form-control form-control-lg", {'is-invalid' : error})}
            value={value}
            disabled={disabled}
            name={name}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextField.propTypes = {
    name : PropTypes.string.isRequired,
    placeholder : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    info : PropTypes.string,
    value : PropTypes.string.isRequired,
    type : PropTypes.string.isRequired,
    disabled : PropTypes.string,
    error : PropTypes.string
}

TextField.defaultProps = {
    type : 'text'
}

export default TextField;