'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, ReactNode } from 'react';
interface TheBirthCompanyContextType {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
  keywordId: string;
  setKeywordId: React.Dispatch<React.SetStateAction<string>>;
  extrasList: [];
  setExtrasList: React.Dispatch<React.SetStateAction<any>>;
  selectedExtras: [];
  setSelectedExtras: React.Dispatch<React.SetStateAction<any>>;
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
  firstAppointmentDate: string;
  setFirstAppointmentDate: React.Dispatch<React.SetStateAction<string>>;
  consultantGUID: string;
  setConsultantGUID: React.Dispatch<React.SetStateAction<string>>;
  hcaConsultantID: string;
  setHcaConsultantID: React.Dispatch<React.SetStateAction<string>>;
  locationID: string;
  setLocationID: React.Dispatch<React.SetStateAction<string>>;
  locationGUID: string;
  setLocationGUID: React.Dispatch<React.SetStateAction<string>>;
  lat: string;
  setLat: React.Dispatch<React.SetStateAction<string>>;
  lon: string;
  setLon: React.Dispatch<React.SetStateAction<string>>;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  selectedLocationName: string;
  setSelectedLocationName: React.Dispatch<React.SetStateAction<string>>;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  consultantName: string;
  setConsultantName: React.Dispatch<React.SetStateAction<string>>;
  consultantMainSpecialty: string;
  setConsultantMainSpecialty: React.Dispatch<React.SetStateAction<string>>;
  patientName: string;
  setPatientName: React.Dispatch<React.SetStateAction<string>>;
  selectedLocations: [];
  setSelectedLocations: React.Dispatch<React.SetStateAction<any>>;
  selectedInsurerPaymentStep: null;
  setSelectedInsurerPaymentStep: React.Dispatch<React.SetStateAction<any>>;
  consultantReviews: string;
  setConsultantReviews: React.Dispatch<React.SetStateAction<string>>;
  finderFormPayor: string;
  setFinderFormPayor: React.Dispatch<React.SetStateAction<string>>;
  finderFormPrevious: string;
  setFinderFormPrevious: React.Dispatch<React.SetStateAction<string>>;
  completedFormId: string;
  setCompletedFormId: React.Dispatch<React.SetStateAction<string>>;
  selectedScanId: string;
  setSelectedScanId: React.Dispatch<React.SetStateAction<string>>;
  selectedSlotId: string;
  setSelectedSlotId: React.Dispatch<React.SetStateAction<string>>;
}

export const TheBirthCompanyContext = createContext<TheBirthCompanyContextType>(
  {
    message: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setMessage: () => {},
    searchString: '',
    setSearchString: () => {},
    keywordId: '0',
    setKeywordId: () => {},
    extrasList: [],
    setExtrasList: () => {},
    selectedExtras: [],
    setSelectedExtras: () => {},
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
    firstAppointmentDate: '',
    setFirstAppointmentDate: () => {},
    consultantGUID: '',
    setConsultantGUID: () => {},
    locationGUID: '',
    setLocationGUID: () => {},
    lon: '',
    setLon: () => {},
    lat: '',
    setLat: () => {},
    selectedDate: '',
    setSelectedDate: () => {},
    selectedTime: '',
    setSelectedTime: () => {},
    selectedLocationName: '',
    setSelectedLocationName: () => {},
    hcaConsultantID: '',
    setHcaConsultantID: () => {},
    locationID: '',
    setLocationID: () => {},
    startTime: '',
    setStartTime: () => {},
    consultantName: '',
    setConsultantName: () => {},
    consultantMainSpecialty: '',
    setConsultantMainSpecialty: () => {},
    patientName: '',
    setPatientName: () => {},
    selectedLocations: [],
    setSelectedLocations: () => {},
    selectedInsurerPaymentStep: null,
    setSelectedInsurerPaymentStep: () => {},
    consultantReviews: '',
    setConsultantReviews: () => {},
    finderFormPayor: '',
    setFinderFormPayor: () => {},
    finderFormPrevious: '',
    setFinderFormPrevious: () => {},
    completedFormId: '',
    setCompletedFormId: () => {},
    selectedScanId: '',
    setSelectedScanId: () => {},
    selectedSlotId: '',
    setSelectedSlotId: () => {},
  }
);

export const TheBirthCompanyContextProvider = ({
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
  const [keywordId, setKeywordId] = useState<string>('0');
  const [extrasList, setExtrasList] = useState<any>([]);
  const [selectedExtras, setSelectedExtras] = useState<any>([]);
  const [isSelfPayment, setIsSelfPayment] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedTypeOfAppointment, setSelectedTypeOfAppointment] =
    useState<string>('');
  const [consultantGUID, setConsultantGUID] = useState<string>('');
  const [locationGUID, setLocationGUID] = useState<string>('');
  const [firstAppointmentDate, setFirstAppointmentDate] = useState<string>('');
  const [lat, setLat] = useState<string>('');
  const [lon, setLon] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');
  const [hcaConsultantID, setHcaConsultantID] = useState<string>('');
  const [locationID, setLocationID] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [consultantName, setConsultantName] = useState<string>('');
  const [consultantMainSpecialty, setConsultantMainSpecialty] =
    useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [selectedLocations, setSelectedLocations] = useState<any>([]);
  const [selectedInsurerPaymentStep, setSelectedInsurerPaymentStep] =
    useState(null);
  const [consultantReviews, setConsultantReviews] = useState<string>('');
  const [finderFormPayor, setFinderFormPayor] = useState<string>('');
  const [finderFormPrevious, setFinderFormPrevious] = useState<string>('');
  const [completedFormId, setCompletedFormId] = useState<string>('');
  const [selectedScanId, setSelectedScanId] = useState<string>('');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');

  return (
    <TheBirthCompanyContext.Provider
      value={{
        message,
        setMessage,
        searchString,
        setSearchString,
        keywordId,
        setKeywordId,
        extrasList,
        setExtrasList,
        selectedExtras,
        setSelectedExtras,
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
        firstAppointmentDate,
        setFirstAppointmentDate,
        lat,
        setLat,
        lon,
        setLon,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedLocationName,
        setSelectedLocationName,
        hcaConsultantID,
        setHcaConsultantID,
        locationID,
        setLocationID,
        startTime,
        setStartTime,
        consultantName,
        setConsultantName,
        consultantMainSpecialty,
        setConsultantMainSpecialty,
        patientName,
        setPatientName,
        selectedLocations,
        setSelectedLocations,
        selectedInsurerPaymentStep,
        setSelectedInsurerPaymentStep,
        consultantReviews,
        setConsultantReviews,
        finderFormPayor,
        setFinderFormPayor,
        finderFormPrevious,
        setFinderFormPrevious,
        completedFormId,
        setCompletedFormId,
        selectedScanId,
        setSelectedScanId,
        selectedSlotId,
        setSelectedSlotId,
      }}
    >
      {children}
    </TheBirthCompanyContext.Provider>
  );
};
