import Icons from '@component-library/foundation/Icons/Icons';
import { useRef } from 'react';

// To request geolocation permissions from the user in order to make the search more precise than just the vercel IP-based geolocation
const GeolocationPermissionsCta = () => {
  const locationRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <input
        type={'text'}
        className="sr-only"
        name="near"
        defaultValue={''}
        ref={locationRef}
        aria-hidden="true"
      />
      <button
        onClick={() => {
          const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          };

          const success: PositionCallback = (pos) => {
            const { latitude, longitude } = pos.coords;
            const locationField = locationRef.current as HTMLInputElement;
            if (!locationField) return;
            const nativeInputValueSetter = Object?.getOwnPropertyDescriptor(
              window?.HTMLInputElement.prototype,
              'value'
            )?.set;
            nativeInputValueSetter?.call(
              locationField,
              `${latitude}, ${longitude}`
            );
            const event = new Event('change', { bubbles: true });
            locationField.dispatchEvent(event);
          };

          const error: PositionErrorCallback = (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          };

          navigator.geolocation.getCurrentPosition(success, error, options);
        }}
      >
        <Icons iconName={'iconLocation'} />
      </button>
    </>
  );
};

export default GeolocationPermissionsCta;
