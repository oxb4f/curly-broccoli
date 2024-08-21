import { describe, it, expect, vi } from 'vitest';
import useForm from '../useForm';

describe('useForm', () => {
  const mockEmptyFields = {
    username: '',
    email: '',
    password: ''
  };
  const mockFilledFields = {
    username: 'test',
    email: 'test',
    password: 'test'
  };
  const { inputs, errors, isSubmitDisabled, clearForm, submitForm } = useForm(mockEmptyFields);

  function fillAllFields(object) {
    for (const field of Object.keys(object)) {
      object[field] = mockFilledFields[field];
    }
  }

  function clearAllFields(object) {
    for (const field of Object.keys(object)) {
      object[field] = mockEmptyFields[field];
    }
  }

  describe('isSubmitDisabled', () => {
    describe('if all inputs are empty', () => {
      it('should return true', () => {
        clearAllFields(inputs);

        expect(isSubmitDisabled.value).toBe(true);
      });
    });
    describe('if some input is empty', () => {
      it('should return true', () => {
        fillAllFields(inputs);
        inputs[Object.keys(inputs).at(-1)] = '';

        expect(isSubmitDisabled.value).toBe(true);
      });
    });
    describe('if all inputs are not empty', () => {
      it('should return false', () => {
        fillAllFields(inputs);

        expect(isSubmitDisabled.value).toBe(false);
      });
    });
  });

  describe('clearForm', () => {
    it('should set empty fields and errors', () => {
      fillAllFields(inputs);
      fillAllFields(errors);
      clearForm();
      expect(inputs).toEqual(mockEmptyFields);
      expect(errors).toEqual(mockEmptyFields);
    });
  });

  describe('submitForm', () => {
    describe('if successfully submited', () => {
      it('should set empty errors', async () => {
        fillAllFields(errors);
        const callback = vi.fn().mockImplementationOnce(() => {
          return Promise.resolve();
        });
        await submitForm(callback, inputs);
        expect(errors).toEqual(mockEmptyFields);
      });
    });

    describe('if submit failed', () => {
      it('should set errors', async () => {
        clearAllFields(errors);
        const callback = vi.fn().mockImplementationOnce(() => {
          return Promise.reject({
            details: mockFilledFields
          });
        });
        await submitForm(callback, inputs);
        expect(errors).toEqual(mockFilledFields);
      });
    });
  });
});
