import React from 'react';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-50 border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Powered by</span>
            <a
              href="https://newsapi.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              NewsAPI
            </a>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} News Dashboard. Built with React & Next.js
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;