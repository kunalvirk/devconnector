import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SelectList = ({
    name,
    onChange,
    info,
    error,
    value,
    options
}) => {  

  const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>{option.label}</option>
    ))

  return (
    <div className="form-group">
        <select
            className={classnames("form-control form-control-lg", {'is-invalid' : error})}
            name={name}
            value={value}
            onChange={onChange}
        >
            {selectOptions}
        </select>
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

SelectList.propTypes = {
    name : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    info : PropTypes.string,
    value : PropTypes.string.isRequired,
    error : PropTypes.string,
    options : PropTypes.array.isRequired
}

export default SelectList;