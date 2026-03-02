/* eslint-disable @typescript-eslint/no-explicit-any */
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
  searchStringLocations: string;
  setSearchStringLocations: React.Dispatch<React.SetStateAction<string>>;
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
  distance: number;
  setDistance: React.Dispatch<React.SetStateAction<number>>;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  selectedLocationName: string;
  setSelectedLocationName: React.Dispatch<React.SetStateAction<string>>;
  isBookableContent: boolean;
  setIsBookableContent: React.Dispatch<React.SetStateAction<boolean>>;
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
  selectedLocationConsultants: string;
  setSelectedLocationConsultants: React.Dispatch<React.SetStateAction<string>>;
}

export const ConsultantFinderContext =
  createContext<ConsultantFinderContextType>({
    message: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setMessage: () => { },
    searchString: '',
    setSearchString: () => { },
    keywordId: 0,
    setKeywordId: () => { },
    distance: 0,
    setDistance: () => { },
    consultantSlug: '',
    setConsultantSlug: () => { },
    searchStringConsultantName: '',
    setSearchStringConsultantName: () => { },
    searchStringPayment: '',
    setSearchStringPayment: () => { },
    isSelfPayment: false,
    setIsSelfPayment: () => { },
    selectedTypeOfAppointment: '',
    setSelectedTypeOfAppointment: () => { },
    selectedLocation: '',
    setSelectedLocation: () => { },
    fristAppointmentDate: '',
    setFirstAppointmentDate: () => { },
    consultantGUID: '',
    setConsultantGUID: () => { },
    locationGUID: '',
    setLocationGUID: () => { },
    lon: '',
    setLon: () => { },
    lat: '',
    setLat: () => { },
    selectedDate: '',
    setSelectedDate: () => { },
    selectedTime: '',
    setSelectedTime: () => { },
    selectedLocationName: '',
    setSelectedLocationName: () => { },
    isBookableContent: true,
    setIsBookableContent: () => { },
    hcaConsultantID: '',
    setHcaConsultantID: () => { },
    locationID: '',
    setLocationID: () => { },
    startTime: '',
    setStartTime: () => { },
    consultantName: '',
    setConsultantName: () => { },
    consultantMainSpecialty: '',
    setConsultantMainSpecialty: () => { },
    patientName: '',
    setPatientName: () => { },
    selectedLocations: [],
    setSelectedLocations: () => { },
    selectedInsurerPaymentStep: null,
    setSelectedInsurerPaymentStep: () => { },
    consultantReviews: '',
    setConsultantReviews: () => { },
    finderFormPayor: '',
    setFinderFormPayor: () => { },
    finderFormPrevious: '',
    setFinderFormPrevious: () => { },
    completedFormId: '',
    setCompletedFormId: () => { },
    searchStringLocations: '',
    setSearchStringLocations: () => { },
    selectedLocationConsultants: '',
    setSelectedLocationConsultants: () => { }
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
  const [lat, setLat] = useState<string>('');
  const [lon, setLon] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');
  const [isBookableContent, setIsBookableContent] = useState(true);
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
  const [searchStringLocations, setSearchStringLocations] = useState<string>('Anywhere');
  const [selectedLocationConsultants, setSelectedLocationConsultants] = useState<string>('Anywhere');
  const [distance, setDistance] = useState<number>(0);
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
        lat,
        setLat,
        lon,
        setLon,
        distance,
        setDistance,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        selectedLocationName,
        setSelectedLocationName,
        isBookableContent,
        setIsBookableContent,
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
        searchStringLocations,
        setSearchStringLocations,
        selectedLocationConsultants,
        setSelectedLocationConsultants,
      }}
    >
      {children}
    </ConsultantFinderContext.Provider>
  );
};
