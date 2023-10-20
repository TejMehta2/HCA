import icon3Lines from './assets/3 lines.svg'
import iconAdvanced from './assets/Advanced.svg'
import iconArrowDown from './assets/Arrow down.svg'
import iconArrowDropdown from './assets/Arrow dropdown.svg'
import iconArrowLeft from './assets/Arrow left.svg'
import iconArrowRight from './assets/Arrow right.svg'
import iconArrowSmallDown from './assets/Arrow small down.svg'
import iconArrowSmallLeft from './assets/Arrow small left.svg'
import iconArrowSmallRight from './assets/Arrow small right.svg'
import iconArrowSmallUp from './assets/Arrow small up.svg'
import iconArrowUp from './assets/Arrow up.svg'
import iconBook from './assets/Book.svg'
import iconCalendar from './assets/Calendar.svg'
import iconCheckCircle from './assets/Check Circle.svg'
import iconCheckSmall from './assets/Check Small.svg'
import iconCheck from './assets/Check.svg'
import iconChevronDown from './assets/Chevron Down.svg'
import iconChevronLeft from './assets/Chevron Left.svg'
import iconChevronRight from './assets/Chevron Right.svg'
import iconChevronUp from './assets/Chevron Up.svg'
import iconClock from './assets/Clock.svg'
import iconComment from './assets/Comment.svg'
import iconCreditCard from './assets/Credit card.svg'
import iconCrossSmall from './assets/Cross Small.svg'
import iconCross from './assets/Cross.svg'
import iconDownload from './assets/Download.svg'
import iconEdit from './assets/Edit.svg'
import iconEmail from './assets/Email.svg'
import iconFacebook from './assets/Facebook.svg'
import iconFilterCircle from './assets/Filter Circle.svg'
import iconFlexible from './assets/Flexible.svg'
import iconGlasses from './assets/Glasses.svg'
import iconGrid from './assets/Grid.svg'
import iconGroup1 from './assets/Group 1.svg'
import iconHome from './assets/Home.svg'
import iconHospital from './assets/Hospital.svg'
import iconInfo from './assets/Info.svg'
import iconInstagram from './assets/Instagram.svg'
import iconLinkedin from './assets/Linkedin.svg'
import iconList from './assets/List.svg'
import iconLocation from './assets/Location.svg'
import iconMenu from './assets/Menu.svg'
import iconMinusSmall from './assets/Minus small.svg'
import iconMinus from './assets/Minus.svg'
import iconMobile from './assets/Mobile.svg'
import iconOneOff from './assets/One-off.svg'
import iconPhone from './assets/Phone.svg'
import iconPin from './assets/Pin.svg'
import iconPlusSmall from './assets/Plus small.svg'
import iconPlus from './assets/Plus.svg'
import iconRedo from './assets/Redo.svg'
import iconSearch from './assets/Search.svg'
import iconShape from './assets/Shape.svg'
import iconSmallPin from './assets/Small Pin.svg'
import iconStethoscope from './assets/Stethoscope.svg'
import iconVideo from './assets/Video.svg'
import iconWarning from './assets/Warning.svg'

export type IconName =
  | 'icon3Lines'
  | 'iconAdvanced'
  | 'iconArrowDown'
  | 'iconArrowDropdown'
  | 'iconArrowLeft'
  | 'iconArrowRight'
  | 'iconArrowSmallDown'
  | 'iconArrowSmallLeft'
  | 'iconArrowSmallRight'
  | 'iconArrowSmallUp'
  | 'iconArrowUp'
  | 'iconBook'
  | 'iconCalendar'
  | 'iconCheckCircle'
  | 'iconCheckSmall'
  | 'iconCheck'
  | 'iconChevronDown'
  | 'iconChevronLeft'
  | 'iconChevronRight'
  | 'iconChevronUp'
  | 'iconClock'
  | 'iconComment'
  | 'iconCreditCard'
  | 'iconCrossSmall'
  | 'iconCross'
  | 'iconDownload'
  | 'iconEdit'
  | 'iconEmail'
  | 'iconFacebook'
  | 'iconFilterCircle'
  | 'iconFlexible'
  | 'iconGlasses'
  | 'iconGrid'
  | 'iconGroup1'
  | 'iconHome'
  | 'iconHospital'
  | 'iconInfo'
  | 'iconInstagram'
  | 'iconLinkedin'
  | 'iconList'
  | 'iconLocation'
  | 'iconMenu'
  | 'iconMinusSmall'
  | 'iconMinus'
  | 'iconMobile'
  | 'iconOneOff'
  | 'iconPhone'
  | 'iconPin'
  | 'iconPlusSmall'
  | 'iconPlus'
  | 'iconRedo'
  | 'iconSearch'
  | 'iconShape'
  | 'iconSmallPin'
  | 'iconStethoscope'
  | 'iconVideo'
  | 'iconWarning'

const iconMap = new Map<IconName, unknown>([
  ['icon3Lines', icon3Lines],
  ['iconAdvanced', iconAdvanced],
  ['iconArrowDown', iconArrowDown],
  ['iconArrowDropdown', iconArrowDropdown],
  ['iconArrowLeft', iconArrowLeft],
  ['iconArrowRight', iconArrowRight],
  ['iconArrowSmallDown', iconArrowSmallDown],
  ['iconArrowSmallLeft', iconArrowSmallLeft],
  ['iconArrowSmallRight', iconArrowSmallRight],
  ['iconArrowSmallUp', iconArrowSmallUp],
  ['iconArrowUp', iconArrowUp],
  ['iconBook', iconBook],
  ['iconCalendar', iconCalendar],
  ['iconCheckCircle', iconCheckCircle],
  ['iconCheckSmall', iconCheckSmall],
  ['iconCheck', iconCheck],
  ['iconChevronDown', iconChevronDown],
  ['iconChevronLeft', iconChevronLeft],
  ['iconChevronRight', iconChevronRight],
  ['iconChevronUp', iconChevronUp],
  ['iconClock', iconClock],
  ['iconComment', iconComment],
  ['iconCreditCard', iconCreditCard],
  ['iconCrossSmall', iconCrossSmall],
  ['iconCross', iconCross],
  ['iconDownload', iconDownload],
  ['iconEdit', iconEdit],
  ['iconEmail', iconEmail],
  ['iconFacebook', iconFacebook],
  ['iconFilterCircle', iconFilterCircle],
  ['iconFlexible', iconFlexible],
  ['iconGlasses', iconGlasses],
  ['iconGrid', iconGrid],
  ['iconGroup1', iconGroup1],
  ['iconHome', iconHome],
  ['iconHospital', iconHospital],
  ['iconInfo', iconInfo],
  ['iconInstagram', iconInstagram],
  ['iconLinkedin', iconLinkedin],
  ['iconList', iconList],
  ['iconLocation', iconLocation],
  ['iconMenu', iconMenu],
  ['iconMinusSmall', iconMinusSmall],
  ['iconMinus', iconMinus],
  ['iconMobile', iconMobile],
  ['iconOneOff', iconOneOff],
  ['iconPhone', iconPhone],
  ['iconPin', iconPin],
  ['iconPlusSmall', iconPlusSmall],
  ['iconPlus', iconPlus],
  ['iconRedo', iconRedo],
  ['iconSearch', iconSearch],
  ['iconShape', iconShape],
  ['iconSmallPin', iconSmallPin],
  ['iconStethoscope', iconStethoscope],
  ['iconVideo', iconVideo],
  ['iconWarning', iconWarning],
])

export default iconMap
