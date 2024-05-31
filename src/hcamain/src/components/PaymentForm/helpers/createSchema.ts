import { FieldTemplate, Validator } from '../PaymentForm.types';
import { z } from 'zod';

const createSchema = (
  fields: FieldTemplate[],
  conditional: boolean = false
) => {
  const schemaObj: { [key: string]: z.ZodString | z.ZodOptional<z.ZodString> } =
    {};

  fields.forEach((field) => {
    if ('validators' in field) {
      const validators: Validator[] = conditional
        ? field.conditionalValidators.targetItems
        : field.validators.targetItems;
      if (validators.length) {
        let fieldSchema = z.string(); // Start with a base string schema
        validators?.forEach((validator) => {
          if (validator.type.value === 'required') {
            fieldSchema = fieldSchema.min(
              1,
              validator.message?.value || 'This field is required'
            );
          } else if (
            validator.type.value === 'regex' &&
            validator.parameters?.value
          ) {
            const regex = new RegExp(validator.parameters.value);
            if (validators.length === 1) {
              // It's the only item, so we need to use string method and make it optional
              // eslint-disable-next-line
              // @ts-ignore
              fieldSchema = z
                .string()
                .regex(regex, validator.message?.value || 'Invalid format')
                .optional();
            } else {
              // Chain to the existing required validation
              fieldSchema = fieldSchema.regex(
                regex,
                validator.message?.value || 'Invalid format'
              );
            }
          }
        });
        schemaObj[field.name] = fieldSchema;
      }
    }
  });
  return schemaObj;
};

export default createSchema;
