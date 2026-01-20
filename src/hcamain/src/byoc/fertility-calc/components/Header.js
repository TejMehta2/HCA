import hcaLogo from '../HCAUK.svg';

export default function Header() {
    return (
        <div className="header">
            <img className="header__logo" src={hcaLogo} alt="Lister Facility Logo" />
            <div className="header__title">
                <h2>Lister Pregnancy Calculator</h2>
            </div>
        </div>
    )
}
