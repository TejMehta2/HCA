import React, { createContext, useState, ReactNode } from 'react';
interface ConsultantFinderContextType {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  keywordId: number;
  setKeywordId: React.Dispatch<React.SetStateAction<number>>;
  consultantSlug: string;
  setConsultantSlug: React.Dispatch<React.SetStateAction<string>>;
  searchStringConsultantName: string;
  setSearchStringConsultantName: React.Dispatch<React.SetStateAction<string>>;
  searchStringPayment: string;
  setSearchStringPayment: React.Dispatch<React.SetStateAction<string>>;
  isSelfPayment: boolean;
  setIsSelfPayment: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTypeOfAppointment: string;
  setSelectedTypeOfAppointment: React.Dispatch<React.SetStateAction<string>>;
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
  fristAppointmentDate: string;
  setFirstAppointmentDate: React.Dispatch<React.SetStateAction<string>>;
  consultantGUID: string;
  setConsultantGUID: React.Dispatch<React.SetStateAction<string>>;
  locationGUID: string;
  setLocationGUID: React.Dispatch<React.SetStateAction<string>>;
}

export const ConsultantFinderContext =
  createContext<ConsultantFinderContextType>({
    message: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setMessage: () => {},
    searchString: '',
    setSearchString: () => {},
    keywordId: 0,
    setKeywordId: () => {},
    consultantSlug: '',
    setConsultantSlug: () => {},
    searchStringConsultantName: '',
    setSearchStringConsultantName: () => {},
    searchStringPayment: '',
    setSearchStringPayment: () => {},
    isSelfPayment: false,
    setIsSelfPayment: () => {},
    selectedTypeOfAppointment: '',
    setSelectedTypeOfAppointment: () => {},
    selectedLocation: '',
    setSelectedLocation: () => {},
    fristAppointmentDate: '',
    setFirstAppointmentDate: () => {},
    consultantGUID: '',
    setConsultantGUID: () => {},
    locationGUID: '',
    setLocationGUID: () => {},
  });

export const ConsultantFinderContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [message, setMessage] = useState<string>('');
  const [searchString, setSearchString] = useState<string>('');
  const [searchStringConsultantName, setSearchStringConsultantName] =
    useState<string>('');
  const [searchStringPayment, setSearchStringPayment] = useState<string>('');
  const [consultantSlug, setConsultantSlug] = useState<string>('');
  const [keywordId, setKeywordId] = useState<number>(0);
  const [isSelfPayment, setIsSelfPayment] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedTypeOfAppointment, setSelectedTypeOfAppointment] =
    useState<string>('');
  const [consultantGUID, setConsultantGUID] = useState<string>('');
  const [locationGUID, setLocationGUID] = useState<string>('');
  const [fristAppointmentDate, setFirstAppointmentDate] = useState<string>('');

  return (
    <ConsultantFinderContext.Provider
      value={{
        message,
        setMessage,
        searchString,
        setSearchString,
        keywordId,
        setKeywordId,
        consultantSlug,
        setConsultantSlug,
        searchStringConsultantName,
        setSearchStringConsultantName,
        searchStringPayment,
        setSearchStringPayment,
        isSelfPayment,
        setIsSelfPayment,
        selectedTypeOfAppointment,
        setSelectedTypeOfAppointment,
        selectedLocation,
        setSelectedLocation,
        consultantGUID,
        setConsultantGUID,
        locationGUID,
        setLocationGUID,
        fristAppointmentDate,
        setFirstAppointmentDate,
      }}
    >
      {children}
    </ConsultantFinderContext.Provider>
  );
};
