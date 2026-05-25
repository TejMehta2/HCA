const Select = (props) => {
  return (
    <div className="ivf-calculator-input">
      <div className="ivf-calculator-input__select">
        <label
          className="ivf-calculator-input__select-label"
          htmlFor={props.id}
        >
          {props.label}
        </label>
        <div className="ivf-calculator-input__select-container">
          <select
            name={props.name}
            id={props.id}
            className="ivf-calculator-input__select-menu g-select__menu"
            onChange={props.onChange}
            value={props.value}
          >
            <option value="">Please select</option>
            {Object.keys(props.data).map(function (key) {
              return (
                <option key={key} value={key}>
                  {props.data[key].Value}
                </option>
              );
            })}
          </select>
          <span className="ivf-calculator-input__select-arrow">
            <svg
              aria-hidden="true"
              focusable="false"
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.26906 0.209435L5.98337 5.06956L10.7317 0.209435C11.3645 -0.457416 12.4405 0.622131 11.8077 1.28946L6.42757 6.81451C6.20595 7.03696 5.7943 7.06867 5.57268 6.84622L0.191593 1.28946C-0.441195 0.622613 0.634832 -0.457415 1.26762 0.209435L1.26906 0.209435Z"
                fill="black"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Select;
