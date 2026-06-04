'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';
import Script from 'next/script';
import type { ScriptProps } from 'next/script';

type Props = {
  html?: string;
  id: string;
};

type ErrorBoundaryProps = {
  children?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

type ParsedScript = {
  attrs: Partial<ScriptProps>;
  content: string;
};

class CmsScriptErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('CmsScript failed to render:', error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

const scriptTagPattern = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const attributePattern =
  /([^\s"'=<>`]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

const attributeNameMap: Record<string, keyof ScriptProps> = {
  charset: 'charSet',
  crossorigin: 'crossOrigin',
  referrerpolicy: 'referrerPolicy',
  nomodule: 'noModule',
};

const parseAttributes = (source: string): Partial<ScriptProps> => {
  const attrs: Partial<ScriptProps> = {};

  for (const match of source.matchAll(attributePattern)) {
    const [, rawName, doubleQuotedValue, singleQuotedValue, unquotedValue] =
      match;
    const lowerName = rawName.toLowerCase();
    const name = attributeNameMap[lowerName] ?? rawName;
    const value = doubleQuotedValue ?? singleQuotedValue ?? unquotedValue;

    attrs[name as keyof ScriptProps] = value ?? true;
  }

  return attrs;
};

const parseScripts = (html: string): ParsedScript[] => {
  try {
    const scripts = Array.from(html.matchAll(scriptTagPattern)).map(
      (match) => ({
        attrs: parseAttributes(match[1] ?? ''),
        content: match[2] ?? '',
      })
    );

    if (scripts.length > 0) {
      return scripts;
    }

    const content = html.trim();

    return content ? [{ attrs: {}, content }] : [];
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('CmsScript failed to parse CMS script HTML:', error);
    }

    return [];
  }
};

export function CmsScript({ html, id }: Props) {
  return (
    <CmsScriptErrorBoundary>
      <CmsScriptContent html={html} id={id} />
    </CmsScriptErrorBoundary>
  );
}

function CmsScriptContent({ html = '', id }: Props) {
  const scripts = parseScripts(html);

  return (
    <>
      {scripts.map(({ attrs, content }, index) => {
        const scriptId =
          attrs.id?.toString() || (scripts.length === 1 ? id : `${id}-${index}`);

        if (attrs.src) {
          return (
            <Script
              {...attrs}
              id={scriptId}
              key={scriptId}
              strategy="afterInteractive"
            />
          );
        }

        return (
          <Script
            {...attrs}
            id={scriptId}
            key={scriptId}
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      })}
    </>
  );
}
