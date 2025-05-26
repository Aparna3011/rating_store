export const validationRules = {
  name: {
    required: 'Name is required',
    minLength: { value: 20, message: 'Name must be at least 20 characters' },
    maxLength: { value: 60, message: 'Name must not exceed 60 characters' }
  },

  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email address'
    }
  },

  address: {
    required: 'Address is required',
    maxLength: { value: 400, message: 'Address must not exceed 400 characters' }
  },

  password: {
    required: 'Password is required',
    minLength: { value: 8, message: 'Password must be at least 8 characters' },
    maxLength: { value: 16, message: 'Password must not exceed 16 characters' },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/,
      message: 'Password must contain at least one uppercase letter and one special character'
    }
  },

  rating: {
    required: 'Rating is required',
    min: { value: 1, message: 'Rating must be at least 1' },
    max: { value: 5, message: 'Rating must not exceed 5' }
  }
};

export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (password.length > 16) {
    errors.push('Password must not exceed 16 characters');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return errors;
};

export const validateName = (name: string): string[] => {
  const errors: string[] = [];

  if (name.length < 20) {
    errors.push('Name must be at least 20 characters');
  }

  if (name.length > 60) {
    errors.push('Name must not exceed 60 characters');
  }

  return errors;
};

export const validateEmail = (email: string): string[] => {
  const errors: string[] = [];

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }

  return errors;
};

export const validateAddress = (address: string): string[] => {
  const errors: string[] = [];

  if (address.length > 400) {
    errors.push('Address must not exceed 400 characters');
  }

  return errors;
};