import React, { Component, ErrorInfo, ReactNode, Suspense } from 'react';

// Catches errors during server-side pre-render via suspense
// Catches error during client side rendering in production
// Allows client side errors to show during development

interface Props {
  children?: ReactNode;
  fallback?: JSX.Element;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // TODO - report error on client-side monitoring once available
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Uncaught error:', error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <></>;
    }

    return (
      <Suspense fallback={this.props.fallback || <></>}>
        {this.props.children}
      </Suspense>
    );
  }
}

export default ErrorBoundary;
