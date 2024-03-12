import icon3Lines from './assets-dist/3 lines.svg';
import iconAdvanced from './assets-dist/Advanced.svg';
import iconArrowDown from './assets-dist/Arrow down.svg';
import iconArrowDropdown from './assets-dist/Arrow dropdown.svg';
import iconArrowLeft from './assets-dist/Arrow left.svg';
import iconArrowRight from './assets-dist/Arrow right.svg';
import iconArrowSmallDown from './assets-dist/Arrow small down.svg';
import iconArrowSmallLeft from './assets-dist/Arrow small left.svg';
import iconArrowSmallRight from './assets-dist/Arrow small right.svg';
import iconArrowSmallUp from './assets-dist/Arrow small up.svg';
import iconArrowUp from './assets-dist/Arrow up.svg';
import iconBook from './assets-dist/Book.svg';
import iconCalendar from './assets-dist/Calendar.svg';
import iconCfstarfull0 from './assets-dist/CFStarFull0.svg';
import iconCfstarfull100 from './assets-dist/CFStarFull100.svg';
import iconCfstarfull25 from './assets-dist/CFStarFull25.svg';
import iconCfstarfull50 from './assets-dist/CFStarFull50.svg';
import iconCfstarfull75 from './assets-dist/CFStarFull75.svg';
import iconCheckCircle from './assets-dist/Check Circle.svg';
import iconCheckSmall from './assets-dist/Check Small.svg';
import iconCheck from './assets-dist/Check.svg';
import iconChevronDown from './assets-dist/Chevron Down.svg';
import iconChevronLeft from './assets-dist/Chevron Left.svg';
import iconChevronRight from './assets-dist/Chevron Right.svg';
import iconChevronUp from './assets-dist/Chevron Up.svg';
import iconClock from './assets-dist/Clock.svg';
import iconComment from './assets-dist/Comment.svg';
import iconCopy from './assets-dist/Copy.svg';
import iconCreditCard from './assets-dist/Credit card.svg';
import iconCrossSmall from './assets-dist/Cross Small.svg';
import iconCross from './assets-dist/Cross.svg';
import iconDownload from './assets-dist/Download.svg';
import iconEdit from './assets-dist/Edit.svg';
import iconEmail from './assets-dist/Email.svg';
import iconFacebook from './assets-dist/Facebook.svg';
import iconFilterCircle from './assets-dist/Filter Circle.svg';
import iconFlexible from './assets-dist/Flexible.svg';
import iconGlasses from './assets-dist/Glasses.svg';
import iconGrid from './assets-dist/Grid.svg';
import iconGroup1 from './assets-dist/Group 1.svg';
import iconHome from './assets-dist/Home.svg';
import iconHospital from './assets-dist/Hospital.svg';
import iconInfo from './assets-dist/Info.svg';
import iconInstagram from './assets-dist/Instagram.svg';
import iconLinkedin from './assets-dist/Linkedin.svg';
import iconList from './assets-dist/List.svg';
import iconLocation from './assets-dist/Location.svg';
import iconMenu from './assets-dist/Menu.svg';
import iconMessenger from './assets-dist/Messenger.svg';
import iconMinusSmall from './assets-dist/Minus small.svg';
import iconMinus from './assets-dist/Minus.svg';
import iconMobile from './assets-dist/Mobile.svg';
import iconOneOff from './assets-dist/One-off.svg';
import iconPhone from './assets-dist/Phone.svg';
import iconPin from './assets-dist/Pin.svg';
import iconPlay from './assets-dist/Play.svg';
import iconPlusSmall from './assets-dist/Plus small.svg';
import iconPlus from './assets-dist/Plus.svg';
import iconRedo from './assets-dist/Redo.svg';
import iconReset from './assets-dist/Reset.svg';
import iconSearch from './assets-dist/Search.svg';
import iconShape from './assets-dist/Shape.svg';
import iconShare from './assets-dist/Share.svg';
import iconSmallPin from './assets-dist/Small Pin.svg';
import iconStarEmpty from './assets-dist/Star Empty.svg';
import iconStarHalf from './assets-dist/Star Half.svg';
import iconStar from './assets-dist/Star.svg';
import iconStethoscope from './assets-dist/Stethoscope.svg';
import iconVideo from './assets-dist/Video.svg';
import iconWarning from './assets-dist/Warning.svg';
import iconWhatsapp from './assets-dist/Whatsapp.svg';
import iconX from './assets-dist/X.svg';

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
  | 'iconCfstarfull0'
  | 'iconCfstarfull100'
  | 'iconCfstarfull25'
  | 'iconCfstarfull50'
  | 'iconCfstarfull75'
  | 'iconCheckCircle'
  | 'iconCheckSmall'
  | 'iconCheck'
  | 'iconChevronDown'
  | 'iconChevronLeft'
  | 'iconChevronRight'
  | 'iconChevronUp'
  | 'iconClock'
  | 'iconComment'
  | 'iconCopy'
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
  | 'iconMessenger'
  | 'iconMinusSmall'
  | 'iconMinus'
  | 'iconMobile'
  | 'iconOneOff'
  | 'iconPhone'
  | 'iconPin'
  | 'iconPlay'
  | 'iconPlusSmall'
  | 'iconPlus'
  | 'iconRedo'
  | 'iconReset'
  | 'iconSearch'
  | 'iconShape'
  | 'iconShare'
  | 'iconSmallPin'
  | 'iconStarEmpty'
  | 'iconStarHalf'
  | 'iconStar'
  | 'iconStethoscope'
  | 'iconVideo'
  | 'iconWarning'
  | 'iconWhatsapp'
  | 'iconX';

const iconMap = new Map<IconName, () => JSX.Element>([
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
  ['iconCfstarfull0', iconCfstarfull0],
  ['iconCfstarfull100', iconCfstarfull100],
  ['iconCfstarfull25', iconCfstarfull25],
  ['iconCfstarfull50', iconCfstarfull50],
  ['iconCfstarfull75', iconCfstarfull75],
  ['iconCheckCircle', iconCheckCircle],
  ['iconCheckSmall', iconCheckSmall],
  ['iconCheck', iconCheck],
  ['iconChevronDown', iconChevronDown],
  ['iconChevronLeft', iconChevronLeft],
  ['iconChevronRight', iconChevronRight],
  ['iconChevronUp', iconChevronUp],
  ['iconClock', iconClock],
  ['iconComment', iconComment],
  ['iconCopy', iconCopy],
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
  ['iconMessenger', iconMessenger],
  ['iconMinusSmall', iconMinusSmall],
  ['iconMinus', iconMinus],
  ['iconMobile', iconMobile],
  ['iconOneOff', iconOneOff],
  ['iconPhone', iconPhone],
  ['iconPin', iconPin],
  ['iconPlay', iconPlay],
  ['iconPlusSmall', iconPlusSmall],
  ['iconPlus', iconPlus],
  ['iconRedo', iconRedo],
  ['iconReset', iconReset],
  ['iconSearch', iconSearch],
  ['iconShape', iconShape],
  ['iconShare', iconShare],
  ['iconSmallPin', iconSmallPin],
  ['iconStarEmpty', iconStarEmpty],
  ['iconStarHalf', iconStarHalf],
  ['iconStar', iconStar],
  ['iconStethoscope', iconStethoscope],
  ['iconVideo', iconVideo],
  ['iconWarning', iconWarning],
  ['iconWhatsapp', iconWhatsapp],
  ['iconX', iconX],
]);

export default iconMap;
