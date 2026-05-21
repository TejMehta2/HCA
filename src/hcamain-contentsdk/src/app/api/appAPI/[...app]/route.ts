import { neon } from '@neondatabase/serverless';
import { getRecurseAppItemsFromGraphQL } from 'lib/consultant-finder/getRecurseAppItemsFromGraphQL';
import { getRecurseGenericItemsFromGraphQL } from 'lib/consultant-finder/getRecurseGenericItemsFromGraphQL';
import { revalidate } from 'lib/consultant-finder/revalidateNow';
import { type NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{
    app?: string[];
  }>;
};

// mock articles
/*
const articles = [
  {
    title: 'Relaxation methods',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=63edcc9f7b277e65bbad3d2a0432005e1a482ab93a3a92a923386d2933770046ec7c14095e20e9525da50aded1bbfbc5&target=blank',
  },
  {
    title: 'Stop Smoking Advice',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=1c42b4d6c2380747cf7996a3a861ab5366e5692ceaeb742ad26e0cc65629a81926a13913d2680aaa205f5062d5245a22&target=blank',
  },
  {
    title: 'Testicular Cancer Fact Sheet',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=2069b58a5bb62b7eb1cd145e0afb99b5b56d314517965c3f1814bcd361142cadf5eebe4a28d34f0345aacfb5cd9f752b&target=blank',
  },
  {
    title: 'Alcohol',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=b7d44e5542c9421b69efae043e9cbe6d0666e27d3db275c42fecf5c0b108ea3d&target=blank',
  },
  {
    title: 'Breast cancer and early detection',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=f1f5f796e2cfdc1a445de055e7d74e5b2c921f043a21c3e62cb04275fdc9cb9f5a3f417bb25ab13ce34565bb0c9079e59394ad5fee1661a2cfad71cc5ed29286&target=blank',
  },
  {
    title: 'Cholesterol explained',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=800c07cca4583d4c69c1e6812e65e8d57055e86889ca8b839715e02fd6605a7a4f3271ea7fa3fa130d9d7f4e43a675f4&target=blank',
  },
  {
    title: 'Cryotherapy',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=179522cc7e6f581fc2c4346a253ce9ca9a5aa2e809c7df5c87f1c56d07a7b30b464c01e3b59c5fe66652651085201003&target=blank',
  },
  {
    title: 'Dietary advice for gout',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=847aaa13c461c475b6b5b6471acd607c42daa281a9bc2b065ec44c5dc586506df9a294f7c36371a02bc238e5a3888143&target=blank',
  },
  {
    title: 'Explaining high blood pressure',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=57e4739a2c419b474596abc44efef99bb7d35cb1abc8fda5eca79395f82e713e41021816d379ddaf10ddb991f06dda70065eb63256499f86b8962be8aa0b5fed&target=blank',
  },
  {
    title: "Gilbert's syndrome",
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=56566ae6c63698f73c802d62120388f1007ac53e0904c42a912c74753dc062ff86b02678e359fa04d9f0b5ea35ab8ca7&target=blank',
  },
  {
    title: 'IBS info',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=41efc5b3af6a863d0b60d39c478587e6e00aaa1b1e7942a512dbd10abb9e7949&target=blank',
  },
  {
    title: 'Iron deficiency anaemia',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=6e234e3cd54bc371660aacedd6f28f6730c991b122dc118852b46ad8360de3e3708a0ca91ea4cf59624c1690ed829cf6&target=blank',
  },
  {
    title: 'Laboratory information sheet',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=c0099b41133b812741aaaf3fb620158f2546683db6d9944e7284d6fb28eab06c0ca52c0e1035fee9dc7eae1ae4fa1c94f0e348b0ccb5d336f500d697d98d0aee&target=blank',
  },
  {
    title: 'Menopause toolkit',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=4d4da116962c1f59d9661aa351332e82132f42d21e21ae77b8cc380270c9a32f1e4b71ab2eb9284ad43717fd838cb2cd&target=blank',
  },
  {
    title: 'Menopause',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=4d4da116962c1f59d9661aa351332e82584c4e5708d51c7359efde8ae973c238&target=blank',
  },
  {
    title: 'Moles and melanoma',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=368656707ec64d40a67b5517c5dc236766f8ab82386e5b891202dfd66986c08160051dd567254e0e801c5adc37f2b8bf&target=blank',
  },
  {
    title: 'Multidisciplinary team support',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=961877a2dc4d8091dc5071a9e33624a2741a357c905fa2b1571709a6180c40363b79ca823298d9cf0b9d353afe8f1a8f83bbc8a25ddb8a82cf25d57460c0fee4&target=blank',
  },
  {
    title: 'Physical activity guidelines',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=91ce185a83f3d43eea920f01fa1388d9a88e8629072baebf9a4f7dd06f590061507f3a480989811f967ef31e2bac96263d6c79aa0a7dcc5ad909f2a97180c302&target=blank',
  },
  {
    title: 'Underactive thyroid',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=397a29fd387d048f0853a0e5921edcac65d3532cdc00644be5bcfc102c0e42a60f43bc58078cf9bf008f41d353dd2b46&target=blank',
  },
  {
    title: 'Vitamin D deficiency',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=ce05c5ffc02bf4c3b06381daa49e644e276800d242bc562015db15d54d51f327e79a535fba9efdea4cb7d8f394c75e49&target=blank',
  },
  {
    title: 'Spinal mobility Lumbar exercises',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=092d24e03284ab5a49983b57275e00ea5b12a297984c6f76efc5aeee38f60c7f8292df217703d4f737774fa754c3fb637ef6306fcd3e345ef22909ef725d19c6&target=blank',
  },
  {
    title: 'Spinal mobility Thoracic exercises',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=092d24e03284ab5a49983b57275e00ea8ff99a435f5f7c9f6ce434d2b28de8b958cf09bc9d51bfb6c87191c1768b3e920a2761ccff9e7f971dcf325abc9b4deb&target=blank',
  },
  {
    title: 'Spinal mobility Neck exercises',
    link: 'https://portal.hcaprimarycare.co.uk/mms-mapping/sheet-library.js?sheet=092d24e03284ab5a49983b57275e00ea7bdc49f3814c3e7960801f0e6afe55f2ad9f17603c9ca4d05b082a2cfaa2a69547d30cf7b867efd1f27e00ed1646178f&target=blank',
  },
];
*/
type AppApiBody = {
  accessCode?: string;
  key?: string;
  value?: string;
};

// media library items have these properties
interface ISitecoreMediaProps {
  name: string;
  path: string;
  url: string;
}

interface IAccessCodeProps {
  products: unknown;
  client: string;
  accessCode: string;
}

export const dynamic = 'force-dynamic';

async function getRequestBody(req: NextRequest): Promise<AppApiBody | undefined> {
  if (!req.body) {
    return undefined;
  }

  const contentType = req.headers.get('content-type') ?? '';

  try {
    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();

      return Object.fromEntries(formData.entries()) as AppApiBody;
    }

    return (await req.json()) as AppApiBody;
  } catch {
    return undefined;
  }
}

function setResponseHeaders(response: NextResponse) {
  // add headers
  if (revalidate.now() || revalidate.noCache()) {
    response.headers.set('Cache-Control', 'no-cache');
    response.headers.set('CDN-Cache-Control', 'no-cache');
    response.headers.set('Vercel-CDN-Cache-Control', 'no-cache');
  } else {
    response.headers.set('Cache-Control', 'max-age=60');
    response.headers.set('CDN-Cache-Control', 'max-age=100');
    response.headers.set('Vercel-CDN-Cache-Control', 'max-age=120');
  }

  // CORS as we are going cross domains
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
}

// example http://localhost:3000/api/appAPI/PCApp or http://localhost:3000/api/appAPI/Library or http://localhost:3000/api/appAPI/AccessCode
async function appAPIHandler(req: NextRequest, context: RouteContext) {
  const { app } = await context.params;
  const body = await getRequestBody(req);
  let output: unknown[] | unknown = [];
  const appRootPath = '/sitecore/content/HCA/App';
  const accessCodesRootPath = '/sitecore/content/HCA/App/AccessCodes';
  const mediaRootPath = '/sitecore/media library/Project/HCA/App';

  // the xm-cloud published media library base url - varies based on environment, fallback to dev
  const mediaLibraryBaseURL =
    process.env.NEXT_PUBLIC_MEDIA_LIBRARY_BASE_URL! ??
    'https://edge.sitecorecloud.io/hcainternat9865-hcadigital-dev-40cb/media';
  const frags = app as string[];

  // endpoint for App API
  // prod root: https://www.hcahealthcare.co.uk/api/appAPI/
  //
  // sub functions
  // dev https://xm-dev.hcahealthcareqa.co.uk/api/appAPI/Library
  // returns the array of the document library used in the PC App
  //
  // dev https://xm-dev.hcahealthcareqa.co.uk/api/appAPI/PCApp
  // local http://localhost:3001/api/appAPI/PCapp
  // returns the copy (content) from the Sitecore tree
  //
  // dev https://xm-dev.hcahealthcareqa.co.uk/api/appAPI/PCApp/AccessCode
  // local https://xm-dev.hcahealthcareqa.co.uk/api/appAPI/PCApp/AccessCode
  // validates the passed access code and returns JSON from the associated Sitecore entries

  //const error: string = '';
  if (frags) {
    // path is appended to root, query params for context
    const lang = req.nextUrl.searchParams.get('lang') ?? 'en';
    const platform = req.nextUrl.searchParams.get('platform') ?? '';
    const requestedPath = `${appRootPath}/${frags.join('/')}`;
    const mediaLibraryPath = `${mediaRootPath}/${'PCApp'}`;
    const mode = req.nextUrl.searchParams.get('mode') ?? 'app';

    // switch on the type of request, is it for the library or the content?
    switch (frags?.join('')?.toLowerCase()) {
      case 'relaywrite': // this is a request to write a relay a code e.g. 2FA
        {
          if (body && body.key && body.value) {
            ('use server');
            // Connect to the Neon database
            const sql = neon(`${process.env.DATABASE_URL}`);

            // Insert the key value into the Postgres database
            const result = await sql.query(
              `INSERT INTO app_relay (app_key,app_value) VALUES ('${body.key}','${body.value}')`
            );
            output = JSON.stringify(result);
          }
        }
        break;
      case 'relayread': // this is a request to read a relay code e.g. 2FA
        {
          if (body && body.key) {
            ('use server');
            // Connect to the Neon database
            const sql = neon(`${process.env.DATABASE_URL}`);

            // select the top from the Postgres database
            const result = await sql.query(
              `SELECT app_key,app_value,updated,now() - updated as age from app_relay where app_key like '${body.key}' order by updated desc limit 1`
            );

            if (result && result.length > 0) {
              output = result[0];
            }
          }
        }
        break;

      case 'accesscodes': // this is a request for access code content
        {
          if (req.method === 'POST') {
            if (body && body.accessCode) {
              const accessCodeRequested = body.accessCode;
              //console.log('accessCodeRequested', accessCodeRequested);
              const accessCodesData = await getRecurseAppItemsFromGraphQL(
                accessCodesRootPath,
                lang,
                platform
              );

              if (accessCodesData?.codes) {
                const accessCodesArray = Object.entries(accessCodesData.codes);
                accessCodesArray.forEach((accessCode: Array<unknown>) => {
                  if (Object.values(accessCode).length > 1) {
                    const entry: IAccessCodeProps = Object.values(
                      accessCode
                    )[1] as IAccessCodeProps;

                    if (accessCodeRequested === entry.accessCode) {
                      //console.log('accessCode', entry.accessCode);
                      output = { codes: [entry] }; // return data on match of access code
                    }
                  }
                });
              }
            }
          } else {
            output = '{ "error": "invalid method" }';
          }
        }
        break;

      case 'library': // this is a request for the document library
        {
          //output = await articles; mock
          const mediaLibraryDocs = await getRecurseAppItemsFromGraphQL(
            mediaLibraryPath,
            lang,
            platform
          );

          const library =
            mediaLibraryDocs?.sitecore?.media_library?.Project?.HCA?.App?.PCApp
              ?.Library;

          // all good - we got the tree back for the media library?
          if (library) {
            // go through each entry and fix up to the format required by the app/portal
            const libraryArray = Object.entries(library);
            let result: unknown[] = [];
            libraryArray.forEach((doc: Array<unknown>) => {
              if (Object.values(doc).length > 1) {
                // sanity check - index 1 is the media library properties for that doc
                const entry: ISitecoreMediaProps = Object.values(
                  doc
                )[1] as ISitecoreMediaProps;
                //console.log(entry.name, entry.path, entry.url);
                result = result.concat({
                  title: entry.name,
                  link: mediaLibraryBaseURL + entry.url,
                });
              }
            });
            output = result;
          }
        }
        break;

      // default is we want content as JSON
      default:
        {
          output =
            mode === 'app'
              ? await getRecurseAppItemsFromGraphQL(
                  requestedPath,
                  lang,
                  platform
                )
              : await getRecurseGenericItemsFromGraphQL(
                  requestedPath,
                  lang,
                  platform
                );
        }
        break;
    }
  }

  const response = NextResponse.json(output, { status: 200 });
  setResponseHeaders(response);

  return response;
}

export async function GET(req: NextRequest, context: RouteContext) {
  return appAPIHandler(req, context);
}

export async function POST(req: NextRequest, context: RouteContext) {
  return appAPIHandler(req, context);
}

export async function PUT(req: NextRequest, context: RouteContext) {
  return appAPIHandler(req, context);
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  return appAPIHandler(req, context);
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  return appAPIHandler(req, context);
}

export async function HEAD(req: NextRequest, context: RouteContext) {
  return appAPIHandler(req, context);
}

export async function OPTIONS(req: NextRequest, context: RouteContext) {
  return appAPIHandler(req, context);
}
