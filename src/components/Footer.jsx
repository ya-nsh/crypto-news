import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer p-1 bg-black text-primary-content footer-center">
      <div>
        <p className="text-white">
          Copyright &copy; {currentYear} All rights reserved
        </p>
      </div>
    </footer>
  );
}
