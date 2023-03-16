import { Checkbox, TextInput, TextArea } from '../form';
import NutrientsField from './NutrientsField';

const MenuForm = ({ formProps, setFormProps, handleSubmit }) => {
  const {
    isEnabled,
    isHotMeal,
    name,
    description,
    price,
    servingSize,
    categories,
    types,
    nutrients,
  } = formProps;

  function handleChange(e) {
    let { name, type, checked, value, dataset } = e.currentTarget;

    if (name === 'categories') {
      if (checked) value = [...formProps.categories, value];
      else value = formProps.categories.filter((c) => c !== value);
    } else if (name === 'types') {
      if (checked) value = [...formProps.types, value];
      else value = formProps.types.filter((c) => c !== value);
    } else if (name === 'nutrients') {
      // Update nutrients
      if (dataset.add) {
        const exist = formProps.nutrients.some((n) => n.name === dataset.name);
        if (exist)
          value = formProps.nutrients.map((n) => {
            if (n.name === dataset.name) n.amount = value;
            return n;
          });
        else
          value = [
            ...formProps.nutrients,
            { name: dataset.name, amount: value },
          ];
      } else value = formProps.nutrients.filter((n) => n.name !== dataset.name);
    } else if (type === 'checkbox') value = checked;

    setFormProps({
      ...formProps,
      [name]: value,
    });
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <Checkbox
            onChange={handleChange}
            name="isEnabled"
            label="Enabled"
            id="inline-enabled"
            inline
            checked={isEnabled}
          />
        </div>
        <div>
          <Checkbox
            onChange={handleChange}
            name="isHotMeal"
            label="Hot Meal"
            id="inline-hotmeal"
            inline
            checked={isHotMeal}
          />
        </div>
        <hr />
        <TextInput
          onChange={handleChange}
          value={name}
          label="Dish Name"
          name="name"
        />
        <hr />
        <TextArea
          onChange={handleChange}
          value={description}
          label="Description"
          name="description"
        />
        <hr />
        <TextInput
          type="number"
          onChange={handleChange}
          value={price}
          label="Price (NPR.)"
          name="price"
        />
        <hr />
        <TextInput
          type="number"
          onChange={handleChange}
          value={servingSize}
          label="Serving size (Oz)"
          name="servingSize"
        />
        <hr />

        <div className="form-group">
          <div>
            <label>Meal Type</label>
          </div>
          {['Non-Veg', 'Veg', 'Vegan'].map((t) => (
            <Checkbox
              key={t}
              inline
              onChange={handleChange}
              name="types"
              label={t}
              id={`inline-${t}`}
              value={t}
              checked={types.includes(t)}
            />
          ))}
        </div>
        <hr />
        <div className="form-group">
          <div>
            <label>Categories</label>
          </div>
          {['Breakfast', 'Lunch', 'Dinner', 'Beverages'].map((c) => (
            <Checkbox
              key={c}
              inline
              onChange={handleChange}
              name="categories"
              label={c}
              id={`inline-${c}`}
              value={c}
              checked={categories.includes(c)}
            />
          ))}
        </div>
        <hr />
        <NutrientsField
          nutrients={nutrients}
          handlePropsChange={handleChange}
        />
        <hr />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </section>
  );
};

export default MenuForm;
