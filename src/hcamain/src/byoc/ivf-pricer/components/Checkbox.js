const Checkbox = (props) => {
  return (
    <div className="ivf-calculator-checkbox">
      <div className="ivf-calculator-checkbox__wrapper">
        <input
          id={props.id}
          type="checkbox"
          name={props.name}
          checked={props.checked}
          onChange={props.onChange}
        />
        <label htmlFor={props.id}>{props.label}</label>
      </div>
    </div>
  );
};

export default Checkbox;
