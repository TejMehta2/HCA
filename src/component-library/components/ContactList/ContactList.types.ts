interface ContactItem {
  title: JSX.Element;
  number: JSX.Element;
  icon: JSX.Element;
  openingHours: JSX.Element;
}

export interface ContactListProps {
  items: ContactItem[];
}
