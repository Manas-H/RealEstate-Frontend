import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-4 fixed bottom-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="ml-4">&copy; {currentYear} All rights reserved.</div>
        <div className="mr-4">
          Developed by <span className="font-semibold">Manas</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
