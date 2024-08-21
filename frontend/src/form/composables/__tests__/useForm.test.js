import { describe, it, expect, vi } from 'vitest';
import useForm from '../useForm';

describe('useForm', () => {
  const { inputs, errors, isSubmitDisabled, clearForm, submitForm } = useForm({
    username: '',
    email: '',
    password: ''
  });
  describe('isSubmitDisabled', () => {
    describe('if all inputs are empty', () => {
      it('should return true', () => {
        inputs.username = '';
        inputs.email = '';
        inputs.password = '';

        expect(isSubmitDisabled.value).toBe(true);
      });
    });
    describe('if some input is empty', () => {
      it('should return true', () => {
        inputs.username = 'test';
        inputs.email = 'test';
        inputs.password = '';

        expect(isSubmitDisabled.value).toBe(true);
      });
    });
    describe('if all inputs are not empty', () => {
      it('should return false', () => {
        inputs.username = 'test';
        inputs.email = 'test';
        inputs.password = 'test';

        expect(isSubmitDisabled.value).toBe(false);
      });
    });
  });

  describe('clearForm', () => {
    it('should set empty fields and errors', () => {
      inputs.username = 'test';
      inputs.email = 'test';
      inputs.password = 'test';
      errors.username = 'test';
      errors.email = 'test';
      errors.password = 'test';
      clearForm();
      expect(inputs).toEqual({
        username: '',
        email: '',
        password: ''
      });
      expect(errors).toEqual({
        username: '',
        email: '',
        password: ''
      });
    });
  });

  describe('submitForm', () => {
    describe('if successfully submited', () => {
      it('should set empty errors', async () => {
        errors.username = 'test';
        errors.email = 'test';
        errors.password = 'test';
        const callback = vi.fn().mockImplementationOnce(() => {
          return Promise.resolve();
        });
        await submitForm(callback, inputs);
        expect(errors).toEqual({
          username: '',
          email: '',
          password: ''
        });
      });
    });
    describe('if submit failed', () => {
      it('should set errors', async () => {
        errors.username = '';
        errors.email = '';
        errors.password = '';
        const callback = vi.fn().mockImplementationOnce(() => {
          return Promise.reject({
            details: {
              username: 'test',
              email: 'test',
              password: 'test'
            }
          });
        });
        await submitForm(callback, inputs);
        expect(errors).toEqual({
          username: 'test',
          email: 'test',
          password: 'test'
        });
      });
    });
  });
});
