# JssDate

This provides a wrapper around the Sitecore DateField.

The purpose is to unpack the date string we get from Sitecore props, and render them in an accessible and user readable format.

The Datefield component from Sitecore has `Field<string>` as its field prop type, so we re-use that.

## Usage

``` tsx
import JssDate from 'src/helpers/JssDate/JssDate';
const date = {
  value: '2023-11-07T12:42:00Z'
};
<JssDate field={date} />
/// <time datetime="07/11/2023">Nov 7, 2023</time>
```