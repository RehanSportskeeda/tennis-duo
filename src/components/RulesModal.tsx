import React from 'react';
import { X } from 'lucide-react';
import { trackModalOpen, trackModalClose } from '../utils/analytics';
import RacketIcon from '../assets/racket.svg?react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  // Lock/unlock body scroll when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      trackModalOpen('rules');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-black p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-2xl">🎾</span>
            <h2 className="text-2xl font-bold text-white">Tennis Duo Rules</h2>
          </div>
          
          <p className="text-gray-100">How to play Tennis Duo</p>
        </div>
        
        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <ol className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-semibold text-lg">1.</span>
              <span>Each row and column must have equal numbers of 🎾 and rackets</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-lg">2.</span>
              <span>No more than 2 consecutive 🎾 or rackets (vertically or horizontally)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-lg">3.</span>
              <span>
                <div className="inline-flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center text-sm font-bold bg-white rounded-full border-2 border-gray-200 shadow-sm text-green-600">
                    =
                  </div>
                  <span>means cells must be the same</span>
                </div>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-semibold text-lg">4.</span>
              <span>
                <div className="inline-flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center text-sm font-bold bg-white rounded-full border-2 border-gray-200 shadow-sm text-red-600">
                    ×
                  </div>
                  <span>means cells must be different</span>
                </div>
              </span>
            </li>
          </ol>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Tips:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Click a cell to cycle through values:</li>
              <li className="ml-4">1st click → 🎾</li>  
              <li className="ml-4 flex items-center gap-2">2nd click → <RacketIcon className="inline-block w-4 h-4 align-middle" /></li>  
              <li className="ml-4">3rd click → Empty</li>
              <li>• Use hints if you get stuck (adds 15 sec to your time)</li>
              <li>• Try to solve without hints for the best score!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;