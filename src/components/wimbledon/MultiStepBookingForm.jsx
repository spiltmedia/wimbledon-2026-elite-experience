import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';
import { Check, ChevronRight, ChevronLeft, Calendar, User, CheckCircle, Hotel, Users, AlertCircle } from 'lucide-react';

const packages = [
  {
    id: 'holiday-inn-single',
    hotel: 'Holiday Inn London - Bloomsbury',
    occupancy: 'Single',
    price: 6605,
    available: 8,
    paymentLinks: {
      deposit: 'https://app.mlv.com/payment-link/69974d7188a3f0221282df1f',
      full: 'https://app.mlv.com/payment-link/69974d9049e76fe27fa823c3'
    }
  },
  {
    id: 'holiday-inn-double',
    hotel: 'Holiday Inn London - Bloomsbury',
    occupancy: 'Double',
    price: 5405,
    available: 12,
    paymentLinks: {
      deposit: 'https://app.mlv.com/payment-link/69974d14d6779c1cbc98bbfb',
      full: 'https://app.mlv.com/payment-link/69974d5344f21f9fe6d832be'
    }
  },
  {
    id: 'welbeck-single',
    hotel: 'The Welbeck Hotel',
    occupancy: 'Single',
    price: 6805,
    available: 5,
    paymentLinks: {
      deposit: 'https://app.mlv.com/payment-link/69974cd749e76f7fe2a8233b',
      full: 'https://app.mlv.com/payment-link/69974cf61a8400c7530258c2'
    }
  },
  {
    id: 'welbeck-double',
    hotel: 'The Welbeck Hotel',
    occupancy: 'Double',
    price: 5505,
    available: 10,
    paymentLinks: {
      deposit: 'https://app.mlv.com/payment-link/69974ca044f21f1036d8325f',
      full: 'https://app.mlv.com/payment-link/69974cbe0d246019b2b2bc0f'
    }
  }
];

export default function MultiStepBookingForm({ isOpen, onClose, preSelectedPackage = null }) {
  const [currentStep, setCurrentStep] = useState(preSelectedPackage ? 2 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    selectedPackage: preSelectedPackage || '',
    paymentChoice: 'full'
  });

  const steps = [
    { number: 1, title: 'Select Package', icon: Hotel },
    { number: 2, title: 'Payment Choice', icon: CheckCircle }
  ];

  const selectedPackageData = packages.find(pkg => pkg.id === formData.selectedPackage);

  const handleNext = () => {
    if (currentStep === 2) {
      handleSubmit();
    } else if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    const minStep = preSelectedPackage ? 2 : 1;
    if (currentStep > minStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const paymentLink = selectedPackageData?.paymentLinks[formData.paymentChoice];
    if (paymentLink) {
      window.location.href = paymentLink;
    }
  };

  const handleClose = () => {
    setCurrentStep(preSelectedPackage ? 2 : 1);
    setIsSuccess(false);
    setFormData({
      selectedPackage: preSelectedPackage || '',
      paymentChoice: 'full'
    });
    onClose();
  };

  const canProceedStep1 = formData.selectedPackage !== '';
  const canProceedStep2 = formData.paymentChoice !== '';

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Book Your Wimbledon Experience</DialogTitle>
        </DialogHeader>

        {/* Success State */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12 text-center"
            >
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Booking Request Received!</h3>
              <p className="text-gray-400 mb-2">
                Thank you for your interest in our Wimbledon 2026 package.
              </p>
              <p className="text-gray-400">
                Our team will contact you within 24 hours to confirm availability and finalize your booking.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Progress Indicators */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => {
                    const StepIcon = step.icon;
                    const isActive = currentStep === step.number;
                    const isCompleted = currentStep > step.number;
                    
                    return (
                      <React.Fragment key={step.number}>
                        <div className="flex flex-col items-center flex-1">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                            isCompleted 
                              ? 'bg-green-500' 
                              : isActive 
                                ? 'bg-[#dc2626]' 
                                : 'bg-slate-700'
                          }`}>
                            {isCompleted ? (
                              <Check className="w-6 h-6 text-white" />
                            ) : (
                              <StepIcon className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <p className={`text-sm font-medium ${
                            isActive ? 'text-white' : 'text-gray-400'
                          }`}>
                            {step.title}
                          </p>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`h-1 flex-1 mx-2 rounded ${
                            currentStep > step.number ? 'bg-green-500' : 'bg-slate-700'
                          }`} />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Form Steps */}
              <AnimatePresence mode="wait">
                {/* Step 1: Package Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold mb-4">Choose Your Package</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {packages.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => setFormData({ 
                            ...formData, 
                            selectedPackage: pkg.id,
                            numberOfTravelers: pkg.occupancy === 'Double' ? '2' : '1'
                          })}
                          className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                            formData.selectedPackage === pkg.id
                              ? 'border-[#dc2626] bg-[#dc2626]/10'
                              : 'border-slate-700 hover:border-slate-600 bg-slate-800'
                          }`}
                        >
                          {formData.selectedPackage === pkg.id && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-[#dc2626] rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                          
                          <div className="mb-2">
                            <h4 className="font-bold text-white">{pkg.hotel}</h4>
                            <p className="text-sm text-gray-400">{pkg.occupancy} Occupancy</p>
                          </div>
                          
                          <div className="text-2xl font-bold text-white mb-2">
                            ${pkg.price.toLocaleString()}
                            <span className="text-sm text-gray-400 font-normal"> per person</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm">
                            {pkg.available > 5 ? (
                              <>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-green-400">{pkg.available} rooms available</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-4 h-4 text-yellow-500" />
                                <span className="text-yellow-400">Only {pkg.available} left!</span>
                              </>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Payment Choice */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold mb-6">Choose Your Payment Option</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={() => setFormData({ ...formData, paymentChoice: 'full' })}
                        className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                          formData.paymentChoice === 'full'
                            ? 'border-[#dc2626] bg-[#dc2626]/10'
                            : 'border-slate-700 hover:border-slate-600 bg-slate-800'
                        }`}
                      >
                        {formData.paymentChoice === 'full' && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-[#dc2626] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                        
                        <h4 className="text-xl font-bold text-white mb-2">Pay in Full</h4>
                        <p className="text-gray-400 text-sm mb-4">
                          Complete payment now and secure your booking
                        </p>
                        <div className="text-3xl font-bold text-white">
                          ${selectedPackageData?.occupancy === 'Double' 
                            ? (selectedPackageData.price * 2).toLocaleString()
                            : selectedPackageData?.price.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {selectedPackageData?.occupancy === 'Double' 
                            ? `$${selectedPackageData.price.toLocaleString()} per person • ` 
                            : ''}Total amount
                        </p>
                      </button>

                      <button
                        onClick={() => setFormData({ ...formData, paymentChoice: 'deposit' })}
                        className={`relative p-6 rounded-xl border-2 text-left transition-all ${
                          formData.paymentChoice === 'deposit'
                            ? 'border-[#dc2626] bg-[#dc2626]/10'
                            : 'border-slate-700 hover:border-slate-600 bg-slate-800'
                        }`}
                      >
                        {formData.paymentChoice === 'deposit' && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-[#dc2626] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                        
                        <h4 className="text-xl font-bold text-white mb-2">Pay Deposit</h4>
                        <p className="text-gray-400 text-sm mb-4">
                          Reserve your spot — 50% deposit, balance in installments
                        </p>
                        <div className="text-3xl font-bold text-white">
                          ${selectedPackageData?.occupancy === 'Double' ? '3,582' : '1,791'}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {selectedPackageData?.occupancy === 'Double' ? '$1,791 per person • ' : ''}Due today (incl. CC surcharge)
                        </p>
                        <div className="mt-3 text-xs text-gray-500 space-y-1">
                          <p>• 2nd deposit: April 1, 2026</p>
                          <p>• Final balance: May 1, 2026</p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}


              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700">
                {currentStep > (preSelectedPackage ? 2 : 1) && (
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 bg-slate-800 border-slate-600 text-white hover:bg-slate-700"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
                
                <Button
                  onClick={handleNext}
                  disabled={
                    currentStep === 1 ? !canProceedStep1 
                    : currentStep === 2 ? !canProceedStep2 || isSubmitting
                    : false
                  }
                  className="flex-1 bg-[#dc2626] hover:bg-[#b91c1c]"
                >
                  {currentStep === 2 ? (isSubmitting ? 'Processing...' : 'Proceed to Payment') : 'Continue'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}