import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextArea = ({
    name,
    placeholder,
    onChange,
    info,
    error,
    value
}) => {  

  return (
    <div className="form-group">
        <textarea
            className={classnames("form-control form-control-lg", {'is-invalid' : error})}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

TextArea.propTypes = {
    name : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    info : PropTypes.string,
    value : PropTypes.string.isRequired,
    error : PropTypes.string,
}

export default TextArea;