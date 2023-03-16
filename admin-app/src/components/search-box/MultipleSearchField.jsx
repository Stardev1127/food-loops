import { ParsedQuery } from 'query-string';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export function MultipleSearchField({ queryParams, fields }) {
  const location = useLocation();
  const { pathname } = location;

  const [defaultSearchField, setDefaultSearchField] = useState(
    Object.keys(queryParams)[0] &&
      fields.map((f) => f.value).includes(Object.keys(queryParams)[0])
      ? Object.keys(queryParams)[0]
      : '_id'
  );

  return (
    <form method="GET" action={pathname}>
      <div className="form-group">
        <div className="form-group-inline">
          <input
            name={defaultSearchField}
            defaultValue={
              queryParams[defaultSearchField]
                ? queryParams[defaultSearchField]
                : ''
            }
            className="form-control"
            placeholder="Search..."
            autoComplete="off"
            required
          />
          <Form.Control
            style={{ margin: '0 8px' }}
            as="select"
            defaultValue={defaultSearchField}
            onChange={(e) => setDefaultSearchField(e.target.value)}
          >
            {fields.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
    </form>
  );
}
