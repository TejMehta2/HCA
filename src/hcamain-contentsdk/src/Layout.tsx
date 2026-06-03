import { JSX } from 'react';
import {
  AppPlaceholder,
  DesignLibraryApp,
  Field,
  Page,
} from '@sitecore-content-sdk/nextjs';
import Scripts from 'src/Scripts';
import SitecoreStyles from 'components/content-sdk/SitecoreStyles';
import componentMap from '.sitecore/component-map';
import YextProvider from '@component-library/yext/YextProvider/YextProvider';
import ScrollTransition from '@component-library/components/ScrollTransition/ScrollTransition';
import { themeModes } from '@component-library/foundation/Themes/Themes.config';
import type { Theme } from '@component-library/foundation/Themes/Themes.types';

interface LayoutProps {
  page: Page;
}

export interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const Layout = ({ page }: LayoutProps): JSX.Element => {
  const { layout, mode } = page;
  const { route } = layout.sitecore;
  const mainClassPageEditing = mode.isEditing ? 'editing-mode' : 'prod-mode';

  const itemPath = layout.sitecore.context.itemPath as string | undefined;
  const isHomepage = itemPath === '/';

  const firstComponent = route?.placeholders?.['headless-main']?.[0];
  const firstComponentTheme: Theme =
    isHomepage &&
    firstComponent?.params?.Theme &&
    firstComponent.params.Theme in themeModes
      ? (firstComponent.params.Theme as Theme)
      : 'B-HCA-Navy-Blue';
  return (
    <>
      <Scripts />
      <SitecoreStyles layoutData={layout} />
      {process.env.NEXT_PUBLIC_LOAD_COOKIES && (
        <head
          dangerouslySetInnerHTML={{
            __html: process.env.NEXT_PUBLIC_LOAD_COOKIES,
          }}
        />
      )}
      {/* root placeholder for the app, which we add components to using route data */}
      <YextProvider>
        <div className={mainClassPageEditing}>
          {mode.isDesignLibrary ? (
            route && (
              <DesignLibraryApp
                page={page}
                rendering={route}
                componentMap={componentMap}
                loadServerImportMap={() =>
                  import('.sitecore/import-map.server')
                }
              />
            )
          ) : (
            <>             
              <header>
                <div id="header">
                  {route && (
                    <AppPlaceholder
                      page={page}
                      componentMap={componentMap}
                      name="headless-header"
                      rendering={route}
                    />
                  )}
                </div>
              </header>
              <main>
                <div id="content">
                  {isHomepage ? (
                    <ScrollTransition initialTheme={firstComponentTheme}>
                      {route && (
                        <AppPlaceholder
                          page={page}
                          componentMap={componentMap}
                          name="headless-main"
                          rendering={route}
                        />
                      )}
                    </ScrollTransition>
                  ) : (
                    route && (
                      <AppPlaceholder
                        page={page}
                        componentMap={componentMap}
                        name="headless-main"
                        rendering={route}
                      />
                    )
                  )}
                </div>
              </main>
              <footer>
                <div id="footer">
                  {isHomepage ? (
                    <ScrollTransition transitionBackground={false}>
                      {route && (
                        <AppPlaceholder
                          page={page}
                          componentMap={componentMap}
                          name="headless-footer"
                          rendering={route}
                        />
                      )}
                    </ScrollTransition>
                  ) : (
                    route && (
                      <AppPlaceholder
                        page={page}
                        componentMap={componentMap}
                        name="headless-footer"
                        rendering={route}
                      />
                    )
                  )}
                </div>
              </footer>
            </>
          )}
        </div>
      </YextProvider>
    </>
  );
};

export default Layout;
