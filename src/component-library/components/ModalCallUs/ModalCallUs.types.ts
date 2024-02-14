export interface phone {
  text: string;
  number: string;
}

export interface Contact {
  title: JSX.Element;
  phone: phone;
  availability: JSX.Element;
}

export interface ModalCallUsProps {
  contacts: Contact[];
  defaultOpen?: boolean;
}
