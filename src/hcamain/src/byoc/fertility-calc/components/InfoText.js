import { useEffect } from 'react';

export default function InfoText({ headerTitle, helpTextInfo, setIsVisible, rightAligned }) {

    // close info on click outside
    useEffect(() => {
        const handleCLickOutside = () => {
            setIsVisible(false);
        };

        document.addEventListener('click', handleCLickOutside);
        //this will remove the event listener, when the component gets unmounted. This is important!
        return () => document.removeEventListener('click', handleCLickOutside);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="info">
            <div className={`banner ${rightAligned ? "info__content info__content--right" : "info__content"}`}>
                <div className="info__content-header">
                    <span className="info__content-header-title">{headerTitle}</span>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setIsVisible(false);
                    }}>
                        <span>
                            <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.295 7.115C18.6844 6.72564 18.6844 6.09436 18.295 5.705C17.9056 5.31564 17.2744 5.31564 16.885 5.705L12 10.59L7.115 5.705C6.72564 5.31564 6.09436 5.31564 5.705 5.705C5.31564 6.09436 5.31564 6.72564 5.705 7.115L10.59 12L5.705 16.885C5.31564 17.2744 5.31564 17.9056 5.705 18.295C6.09436 18.6844 6.72564 18.6844 7.115 18.295L12 13.41L16.885 18.295C17.2744 18.6844 17.9056 18.6844 18.295 18.295C18.6844 17.9056 18.6844 17.2744 18.295 16.885L13.41 12L18.295 7.115Z" fill="#00B2AE"></path>
                            </svg>
                        </span>
                    </button>
                </div>
                <div className="info__content-header-text">
                    {helpTextInfo}
                </div>
            </div>
        </div>
    );
}