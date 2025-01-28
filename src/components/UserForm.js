import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UserForm = ({ onSubmit, initialData, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(initialData || { firstName: '', lastName: '', email: '', department: '' });
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-3">
      <h5>{initialData ? 'Edit User' : 'Add User'}</h5>

      {/* First Name */}
      <div className="mb-3">
        <label>First Name</label>
        <input
          {...register('firstName', {
            required: 'First Name is required.',
            maxLength: { value: 50, message: 'First Name cannot exceed 50 characters.' },
          })}
          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
        />
        {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
      </div>

      {/* Last Name */}
      <div className="mb-3">
        <label>Last Name</label>
        <input
          {...register('lastName', {
            required: 'Last Name is required.',
            maxLength: { value: 50, message: 'Last Name cannot exceed 50 characters.' },
          })}
          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
        />
        {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
      </div>

      {/* Email */}
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Enter a valid email address.',
            },
          })}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
      </div>

      {/* Department */}
      <div className="mb-3">
        <label>Department</label>
        <input
          {...register('department', {
            required: 'Department is required.',
            maxLength: { value: 100, message: 'Department cannot exceed 100 characters.' },
          })}
          className={`form-control ${errors.department ? 'is-invalid' : ''}`}
        />
        {errors.department && <div className="invalid-feedback">{errors.department.message}</div>}
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default UserForm;
