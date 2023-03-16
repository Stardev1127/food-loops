import { useState } from 'react';
import { SelectInput } from '../form';

const NutrientsField = ({ nutrients, handlePropsChange }) => {
  const [nutrientOptions, setNutrientOptions] = useState(
    [
      { label: '', value: '' },
      { label: 'Carbohydrates', value: 'Carbohydrates' },
      { label: 'Protein', value: 'Protein' },
      { label: 'Fat', value: 'Fat' },
      { label: 'Cholesterol', value: 'Cholesterol' },
      { label: 'Fiber', value: 'Fiber' },
      { label: 'Sodium', value: 'Sodium' },
      { label: 'Sugar', value: 'Sugar' },
    ].filter((n) => !nutrients.some((nn) => nn.name === n.value))
  );

  function handleChange(e) {
    const { value } = e.currentTarget;
    setNutrientOptions(nutrientOptions.filter((n) => n.value !== value));

    handlePropsChange({
      currentTarget: {
        name: 'nutrients',
        value: 0,
        dataset: { add: true, name: value },
      },
    });
  }

  function onNutrientRemove(name) {
    setNutrientOptions([...nutrientOptions, { label: name, value: name }]);
    handlePropsChange({
      currentTarget: {
        name: 'nutrients',
        dataset: { name },
      },
    });
  }

  return (
    <>
      <label>Nutrients</label>
      <SelectInput
        onChange={handleChange}
        name="nutrients"
        options={nutrientOptions}
      />
      {nutrients.map((n) => (
        <div
          className="form-group"
          key={n.name}
          style={{ display: 'inline-block', marginRight: 15, marginBottom: 10 }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <label>{n.name}</label>
            <button
              onClick={() => onNutrientRemove(n.name)}
              className="btn btn-danger"
              style={{
                borderRadius: '50%',
                height: 26,
                width: 26,
                padding: 0,
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              x
            </button>
          </div>
          <input
            className="form-control"
            type="number"
            data-name={n.name}
            data-add={true}
            name="nutrients"
            value={n.amount}
            onChange={handlePropsChange}
          />
        </div>
      ))}
    </>
  );
};

export default NutrientsField;
