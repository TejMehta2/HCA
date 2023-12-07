export interface Contact {
  title: JSX.Element;
  phone: string;
  availability: JSX.Element;
}

export interface ModalCallUsProps {
  contacts: Contact[];
  defaultOpen?: boolean;
}
