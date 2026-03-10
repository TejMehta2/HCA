import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  Link,
} from '@react-pdf/renderer';
import getFormattedDate from '../utils/index';

const urlHost = '/static/legacy';
// register fonts
Font.register({
  family: 'Brown-Std',
  fonts: [
    {
      src: `${urlHost}/assets/fonts/brownstd-regular.woff`,
    },
    {
      src: `${urlHost}/assets/fonts/brownstd-bold.woff`,
      fontWeight: 'bold',
    },
    {
      src: `${urlHost}/assets/fonts/brownstd-regular.woff`,
      fontWeight: 'normal',
    },
  ],
});

// create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    borderTop: 9,
    borderTopColor: '#5CC7C6',
    padding: 30,
    paddingBottom: 60,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  date: {
    fontSize: 12,
    fontFamily: 'Brown-Std',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    color: '#02173E',
    paddingLeft: 16,
    paddingRight: 16,
  },
  headline: {
    fontSize: 40,
    fontFamily: 'Brown-Std',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
    color: '#02173E',
    paddingLeft: 16,
    paddingRight: 16,
  },
  intro: {
    fontSize: '12px',
    fontFamily: 'Brown-Std',
    color: '#02173E',
    marginBottom: 20,
    paddingLeft: 16,
    paddingRight: 32,
  },
  text: {
    color: '#04183D',
    fontFamily: 'Brown-Std',
    fontSize: 12,
    marginBottom: 10,
  },
  logo: {
    width: 'auto',
    height: 'auto',
    marginBottom: 20,
    marginLeft: 16,
  },
  total: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    fontFamily: 'Brown-Std',
    fontSize: 12,
    backgroundColor: '#F3FAFB',
    padding: 10,
    marginTop: 1,
    marginBottom: 30,
  },
  totalAmount: {
    color: '#34787F',
    fontFamily: 'Brown-Std',
    fontSize: '30px',
    marginLeft: '20px',
  },
  label: {
    width: '25%',
    textAlign: 'left',
    color: '#04183D',
    fontFamily: 'Brown-Std',
    fontWeight: 'bold',
    fontSize: 9,
    padding: 16,
    paddingTop: 20,
    paddingBottom: 20,
    borderTop: 1,
    borderTopColor: '#F4F4F4',
  },
  labelHeader: {
    backgroundColor: '#F3FAFB',
    width: '25%',
    textAlign: 'left',
    color: '#04183D',
    fontFamily: 'Brown-Std',
    fontWeight: 'bold',
    fontSize: 12,
    padding: 16,
  },
  selectionHeader: {
    backgroundColor: '#F3FAFB',
    width: '20%',
    textAlign: 'left',
    color: '#04183D',
    fontFamily: 'Brown-Std',
    fontWeight: 'bold',
    fontSize: 12,
    padding: 16,
    paddingRight: 0,
  },
  selection: {
    width: '20%',
    textAlign: 'left',
    color: '#04183D',
    fontFamily: 'Brown-Std',
    fontWeight: 'bold',
    fontSize: 9,
    padding: 16,
    paddingTop: 20,
    paddingRight: 0,
    paddingBottom: 10,
    borderTop: 1,
    borderTopColor: '#F4F4F4',
  },
  costHeader: {
    backgroundColor: '#F3FAFB',
    width: '15%',
    textAlign: 'left',
    color: '#04183D',
    fontFamily: 'Brown-Std',
    fontWeight: 'bold',
    fontSize: 12,
    padding: 16,
    paddingRight: 0,
  },
  cost: {
    width: '15%',
    textAlign: 'right',
    color: '#04183D',
    fontFamily: 'Brown-Std',
    fontSize: 9,
    padding: 16,
    paddingRight: 0,
    paddingTop: 20,
    paddingBottom: 20,
    borderTop: 1,
    borderTopColor: '#F4F4F4',
  },
  descriptionHeader: {
    backgroundColor: '#F3FAFB',
    width: '40%',
    textAlign: 'left',
    color: '#04183D',
    fontFamily: 'Brown-Std',
    fontWeight: 'bold',
    fontSize: 12,
    padding: 16,
  },
  description: {
    width: '40%',
    textAlign: 'left',
    color: '#04183D',
    fontFamily: 'Brown-Std',
    fontSize: 9,
    padding: 16,
    paddingTop: 20,
    paddingBottom: 20,
    borderTop: 1,
    borderTopColor: '#F4F4F4',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 8,
    bottom: 20,
    left: 40,
    textAlign: 'center',
    color: '#04183D',
  },
  colHeader: {
    width: '50%',
    fontFamily: 'Brown-Std',
    fontWeight: 'bold',
    fontSize: 16,
    paddingRight: 30,
    marginBottom: 10,
  },
  col: {
    width: '50%',
    color: '#04183D',
    fontFamily: 'Brown-Std',
    fontSize: 9,
    paddingRight: 40,
  },
  link: {
    fontSize: '18px',
    color: '#34787F',
    marginTop: '5px',
    textDecoration: 'none',
  },
  linkSecondary: {
    fontSize: 9,
  },
});

const PdfDoc = (props) => {
  // format adjuvants selection
  let adjuvantsSelection = '';
  if (props.adjuvants.length > 0) {
    adjuvantsSelection = props.adjuvants.toString().split(',').join(', ');
  }

  // get date and format
  let date = getFormattedDate();

  //console.log('props -->', props);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HCA logo */}
        {props.hcaLogo !== null && (
          <Image
            style={styles.logo}
            src={`${props.urlHost}${props.hcaLogo}`}
            alt="HCA"
          />
        )}

        {/* Date */}
        <View>
          <Text style={styles.date}>{date}</Text>
        </View>

        {/* Ttitle */}
        <View>
          <Text style={styles.headline}>{props.pdfTitle}</Text>
        </View>

        {/* Intro */}
        <View>
          <Text style={styles.intro}>{props.introPDF}</Text>
        </View>

        {/* Table header */}
        <View style={styles.row}>
          <Text style={styles.labelHeader}>{props.pdfTableColumn1Heading}</Text>
          <Text style={styles.selectionHeader}>
            {props.pdfTableColumn2Heading}
          </Text>
          <Text style={styles.costHeader}>{props.pdfTableColumn3Heading}</Text>
          <Text style={styles.descriptionHeader}>
            {props.pdfTableColumn4Heading}
          </Text>
        </View>

        {/* Cycle Type row */}
        <View style={styles.row}>
          <Text style={styles.label}>{props.pdfTableItem1Heading}</Text>
          <Text style={styles.selection}>{props.cycleTypeVal}</Text>
          <Text style={styles.cost}>£{props.cycleTypeCost.toFixed(2)}</Text>
          <Text style={styles.description}>{props.cycleNotes}</Text>
        </View>

        {/* Blastocyst Culture row */}
        <View style={styles.row}>
          <Text style={styles.label}>{props.pdfTableItem3Heading}</Text>
          <Text style={styles.selection}>{props.blastocystCulture}</Text>
          <Text style={styles.cost}>
            £{props.blastocystCultureCost.toFixed(2)}
          </Text>
          <Text style={styles.description}>{props.blastocystCultureNotes}</Text>
        </View>

        {/* Protocol Type row */}
        <View style={styles.row}>
          <Text style={styles.label}>{props.pdfTableItem2Heading}</Text>
          <Text style={styles.selection}>{props.protocolType}</Text>
          <Text style={styles.cost}>£{props.protocolTypeCost.toFixed(2)}</Text>
          <Text style={styles.description}>{props.protocolNotes}</Text>
        </View>

        {/* Adjuvants row */}
        <View style={styles.row}>
          <Text style={styles.label}>{props.pdfTableItem4Heading}</Text>
          <Text style={styles.selection}>{adjuvantsSelection}</Text>
          <Text style={styles.cost}>£{props.adjuvantsCost.toFixed(2)}</Text>
          <Text style={styles.description}>{props.adjuvantsNotes}</Text>
        </View>

        {/* if there are adjuvants selections then render extra information with link */}
        {props.adjuvants.length > 0 && (
          <View style={styles.row}>
            <Text
              style={[
                styles.label,
                { borderTopColor: '#FFFFFF', paddingTop: 0 },
              ]}
            ></Text>
            <Text
              style={[
                styles.selection,
                { borderTopColor: '#FFFFFF', paddingTop: 0 },
              ]}
            ></Text>
            <Text
              style={[
                styles.cost,
                { borderTopColor: '#FFFFFF', paddingTop: 0 },
              ]}
            ></Text>
            <Text
              style={[
                styles.description,
                { borderTopColor: '#FFFFFF', paddingTop: 0 },
              ]}
            >
              <View style={[styles.col, { fontSize: 9 }]}>
                {props.adjuvantsExtraNotes !== null &&
                  props.adjuvantsExtraNotes.length > 0 && (
                    <Text>{props.adjuvantsExtraNotes}</Text>
                  )}
                {props.adjuvantsExtraNotesLink !== null &&
                  props.adjuvantsExtraNotesLink.length > 0 && (
                    <Link
                      src={props.adjuvantsExtraNotesLink}
                      style={styles.link}
                    >
                      <Text style={styles.linkSecondary}>
                        {props.adjuvantsExtraNotesLink}
                      </Text>
                    </Link>
                  )}
              </View>
            </Text>
          </View>
        )}

        {/* Cycle Drugs row */}
        <View style={styles.row}>
          <Text style={styles.label}>{props.pdfTableItem5Heading}</Text>
          <Text style={styles.selection}>{props.selectedDrugValue}</Text>
          <Text style={styles.cost}>£{props.drug1Cost.toFixed(2)}</Text>
          <Text style={styles.description}>
            {props.selectedDrugNotes +
              (props.cycleTypeAdditionalDrugNotes
                ? props.cycleTypeAdditionalDrugNotes
                : '')}
          </Text>
        </View>

        {/* Cycle Drugs 2 row */}
        {props.drug2Cost > 0 && (
          <View style={styles.row}>
            <Text style={styles.label}>
              {props.pdfTableItem5Heading + ' 2'}
            </Text>
            <Text style={styles.selection}>{props.selectedDrugValue2}</Text>
            <Text style={styles.cost}>£{props.drug2Cost.toFixed(2)}</Text>
            <Text style={styles.description}></Text>
            {/*           <Text style={styles.description}>
              {props.selectedDrugNotes2 +
                '\n\n' +
                props.cycleTypeAdditionalDrugNotes2}
            </Text> */}
          </View>
        )}

        {/* Total */}
        <View style={styles.total}>
          <Text style={styles.total}>{props.pdfTableItemTotalCostHeading}</Text>
          <Text style={styles.totalAmount}>£{props.totalCost}</Text>
        </View>

        {/* Footer text */}
        <View style={styles.row}>
          <Text style={styles.colHeader}>
            {props.pdfWhatHappensNextHeading}
          </Text>
          {/* Show header if there is further information */}
          {props.pdfFurtherInformationBody !== null &&
            props.pdfFurtherInformationBody?.length > 0 && (
              <Text style={styles.colHeader}>
                {props.pdfFurtherInformationHeading}
              </Text>
            )}
        </View>

        <View style={styles.row}>
          <Text style={styles.col}>{props.pdfWhatHappensNextBody}</Text>
          <Text style={styles.col}>{props.pdfFurtherInformationBody}</Text>
        </View>

        {/* Phone number link */}
        {props.pdfWhatHappensNextPhoneNumber !== null && (
          <View style={styles.row}>
            <View
              style={[
                styles.col,
                { fontSize: '18px', color: '#34787F', marginTop: '5px' },
              ]}
            >
              <Link
                src={`tel:${props.pdfWhatHappensNextPhoneNumber.replace(
                  /\s/g,
                  ''
                )}`}
                style={styles.link}
              >
                <Text>{props.pdfWhatHappensNextPhoneNumber}</Text>
              </Link>
            </View>
          </View>
        )}
        {/* Access fertility advert */}
        {props.hcaLogo !== null && (
          <Image style={styles.logo} src={props.accessFertilityAd} alt="HCA" />
        )}
        {/* Page number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default PdfDoc;
