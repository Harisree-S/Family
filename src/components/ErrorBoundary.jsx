import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);

        // Check if it's a chunk load error
        if (error.message && (error.message.includes('Failed to fetch dynamically imported module') || error.message.includes('Importing a module script failed'))) {
            // Reload the page to fetch the new version
            window.location.reload();
        }
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#d4af37',
                    background: '#030305',
                    fontFamily: "'Outfit', sans-serif",
                    textAlign: 'center',
                    padding: '2rem'
                }}>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', marginBottom: '1rem' }}>
                        Updating Experience...
                    </h2>
                    <p style={{ color: '#a0a0a0', marginBottom: '2rem' }}>
                        We've improved the site. Reloading to get the latest version.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '10px 20px',
                            background: 'transparent',
                            border: '1px solid #d4af37',
                            color: '#d4af37',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}
                    >
                        Reload Now
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
