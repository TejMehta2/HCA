import { type JSX } from 'react';
import { ComponentWithContextProps } from 'lib/component-props';

import Params from 'src/types/params';
import YextSearch from '@component-library/yext/YextSearch/YextSearch';

interface Fields {}

type GenericSearchProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
};

const GenericSearchDefaultComponent = (
  props: GenericSearchProps
): JSX.Element => {
  const isExperienceEditor = props.page.mode.isEditing;
  if (isExperienceEditor) {
    return (
      <div className={`component promo ${props.params?.styles}`}>
        <div className="component-content">
          <span className="is-empty-hint">
            Generic Search please click to select datasource
          </span>
        </div>
      </div>
    );
  }
  return <></>;
};

export const Default = (props: GenericSearchProps): JSX.Element => {
  if (!props.fields) {
    return <GenericSearchDefaultComponent {...props} />;
  }

  return <YextSearch />;
};
