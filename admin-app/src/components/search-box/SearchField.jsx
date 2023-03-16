import { ParsedQuery } from 'query-string';
import React from 'react';
import { useLocation } from 'react-router-dom';

export function SearchField({ queryParams, field = '_id' }) {
  const location = useLocation();
  const { pathname } = location;

  return (
    <form method="GET" action={pathname}>
      <div className="form-group">
        <div className="form-group-inline">
          <input
            style={{ marginRight: 8 }}
            name={field}
            defaultValue={queryParams[field] ? queryParams[field] : ''}
            className="form-control"
            placeholder="Search..."
            autoComplete="off"
            required
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </div>
    </form>
  );
}
