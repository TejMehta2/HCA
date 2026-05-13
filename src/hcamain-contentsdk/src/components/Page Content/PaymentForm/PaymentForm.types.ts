export interface FormError {
  message: string;
}
export interface Validator {
  type: {
    value: 'required' | 'regex';
  };
  message: {
    value: string;
  };
  parameters: {
    value: string;
  };
}

// Templates
export interface PageTemplate {
  name: string;
  template: {
    name: 'Page';
  };
  children: {
    results: Array<
      SectionTemplate | ButtonTemplate | SectionTitleTemplate | TextTemplate
    >;
  };
}
export interface SectionTitleTemplate {
  name: string;
  template: {
    name: 'SectionTitle';
  };
  title: {
    value: string;
  };
}
export interface TextTemplate {
  name: string;
  template: {
    name: 'Text';
  };
  text: {
    value: string;
  };
}
export interface SectionTemplate {
  name: string;
  template: {
    name: 'Section';
  };
  children: {
    results: FieldTemplate[];
  };
}
export interface InputTemplate {
  name: string;
  template: {
    name: 'Input';
  };
  title: {
    value: string;
  };
  required: {
    boolValue: boolean;
    value: '1' | '0';
  };
  validators: {
    targetItems: Validator[];
  };
  conditionalValidators: {
    targetItems: Validator[];
  };
  placeholderText?: {
    value: string;
  };
  minLength: {
    value: string;
  };
  maxLength: {
    value: string;
  };
  defaultValue: {
    value: string;
  };
  helperText?: {
    value: string;
  };
}
export interface EmailTemplate {
  name: string;
  template: {
    name: 'Email';
  };
  title: {
    value: string;
  };
  required: {
    boolValue: boolean;
    value: '1' | '0';
  };
  validators: {
    targetItems: Validator[];
  };
  conditionalValidators: {
    targetItems: Validator[];
  };
  placeholderText: {
    value: string;
  };
  minLength: {
    value: string;
  };
  maxLength: {
    value: string;
  };
  defaultValue: {
    value: string;
  };
}
export interface DropDownListOption {
  value: {
    value: string;
  };
  displayName: string;
  key: { value: string };
  name: string;
}
export interface DropDownListTemplate {
  name: string;
  template: {
    name: 'DropDown List';
  };
  title: {
    value: string;
  };
  required: {
    boolValue: boolean;
    value: '1' | '';
  };
  validators: {
    targetItems: Validator[];
  };
  conditionalValidators: {
    targetItems: Validator[];
  };
  placeholderText: {
    value: string;
  };
  defaultSelection: {
    value: string;
  };
  datasource: {
    targetItem: {
      children: {
        results: DropDownListOption[];
      };
    };
  };
  helperText?: {
    value: string;
  };
}
export interface ButtonTemplate {
  name: string;
  template: {
    name: 'Button';
  };
  title: {
    value: string;
  };
}
export interface ListTemplate {
  name: string;
  template: {
    name: 'List';
  };
  title: {
    value: string;
  };
  required: {
    boolValue: boolean;
    value: '1' | '';
  };
  validators: {
    targetItems: Validator[];
  };
  conditionalValidators: {
    targetItems: Validator[];
  };
  placeholderText: {
    value: string;
  };
  defaultSelection: {
    value: string;
  };
  datasource: {
    targetItem: {
      children: {
        results: {
          value: {
            value: string;
          };
          displayName: string;
          name: string;
        }[];
      };
    };
  };
}

export type Template =
  | PageTemplate
  | SectionTitleTemplate
  | TextTemplate
  | SectionTemplate
  | InputTemplate
  | EmailTemplate
  | DropDownListTemplate
  | ButtonTemplate
  | ListTemplate;

export type FieldTemplate =
  | InputTemplate
  | EmailTemplate
  | DropDownListTemplate
  | ListTemplate
  | SectionTitleTemplate
  | TextTemplate
  | ButtonTemplate;

export interface PaymentFormProps {
  name: string;
  fields: {
    data: {
      item: {
        pages: {
          results: PageTemplate[];
        };
        settings: {
          results: {
            children: {
              results: {
                displayName: string;
                name: string;
                value: {
                  value: string;
                };
              }[];
            };
          }[];
        };
      };
    };
  };
}
