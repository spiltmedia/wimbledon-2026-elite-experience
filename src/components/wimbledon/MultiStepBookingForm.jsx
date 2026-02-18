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
    price: 6799,
    available: 8
  },
  {
    id: 'holiday-inn-double',
    hotel: 'Holiday Inn London - Bloomsbury',
    occupancy: 'Double',
    price: 5554.50,
    available: 12
  },
  {
    id: 'welbeck-single',
    hotel: 'The Welbeck Hotel',
    occupancy: 'Single',
    price: 7009,
    available: 5
  },
  {
    id: 'welbeck-double',
    hotel: 'The Welbeck Hotel',
    occupancy: 'Double',
    price: 5657.50,
    available: 10
  }
];

export default function MultiStepBookingForm({ isOpen, onClose, preSelectedPackage = null }) {
  const [currentStep, setCurrentStep] = useState(preSelectedPackage ? 2 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    selectedPackage: preSelectedPackage || '',
    paymentChoice: 'full',
    name: '',
    email: '',
    phone: '',
    travelDates: '',
    numberOfTravelers: '1',
    specialRequests: ''
  });

  const steps = [
    { number: 1, title: 'Select Package', icon: Hotel },
    { number: 2, title: 'Payment Choice', icon: CheckCircle },
    { number: 3, title: 'Your Details', icon: User },
    { number: 4, title: 'Confirmation', icon: CheckCircle }
  ];

  const selectedPackageData = packages.find(pkg => pkg.id === formData.selectedPackage);

  const handleNext = () => {
    if (currentStep < 4) {
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
    try {
      await base44.entities.Inquiry.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        package_interest: selectedPackageData ? 
          `${selectedPackageData.hotel} - ${selectedPackageData.occupancy} Occupancy - $${selectedPackageData.price}` : 
          'Package inquiry',
        message: `Travel Dates: ${formData.travelDates}\nNumber of Travelers: ${formData.numberOfTravelers}\nSpecial Requests: ${formData.specialRequests || 'None'}`,
        status: 'new'
      });
      
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(preSelectedPackage ? 2 : 1);
    setIsSuccess(false);
    setFormData({
      selectedPackage: preSelectedPackage || '',
      paymentChoice: 'full',
      name: '',
      email: '',
      phone: '',
      travelDates: '',
      numberOfTravelers: '1',
      specialRequests: ''
    });
    onClose();
  };

  const canProceedStep1 = formData.selectedPackage !== '';
  const canProceedStep2 = formData.paymentChoice !== '';
  const canProceedStep3 = formData.name && formData.email && formData.phone && formData.travelDates;

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
                          Reserve your spot with a deposit today
                        </p>
                        <div className="text-3xl font-bold text-white">
                          ${selectedPackageData?.occupancy === 'Double' ? '7,049' : '3,525'}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">
                          {selectedPackageData?.occupancy === 'Double' ? '$3,524.50 per person • ' : ''}Deposit • Balance due 60 days before travel
                        </p>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact Information */}
                {currentStep === 3 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold mb-4">Your Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-white">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-slate-800 border-slate-700 text-white"
                          placeholder="John Smith"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-white">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-slate-800 border-slate-700 text-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-white">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-slate-800 border-slate-700 text-white"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="travelers" className="text-white">Number of Travelers</Label>
                        <Select 
                          value={formData.numberOfTravelers}
                          onValueChange={(value) => setFormData({ ...formData, numberOfTravelers: value })}
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Person</SelectItem>
                            <SelectItem value="2">2 People</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="dates" className="text-white">Preferred Travel Dates *</Label>
                      <Input
                        id="dates"
                        value={formData.travelDates}
                        onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder="June 26 - July 1, 2026 (or flexible)"
                      />
                    </div>

                    <div>
                      <Label htmlFor="requests" className="text-white">Special Requests (Optional)</Label>
                      <Textarea
                        id="requests"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        className="bg-slate-800 border-slate-700 text-white"
                        placeholder="Any special requirements or questions..."
                        rows={3}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold mb-4">Review Your Booking</h3>
                    
                    <div className="bg-slate-800 rounded-xl p-6 space-y-4">
                      <div>
                        <h4 className="text-sm text-gray-400 mb-1">Selected Package</h4>
                        <p className="text-white font-semibold">{selectedPackageData?.hotel}</p>
                        <p className="text-gray-300">{selectedPackageData?.occupancy} Occupancy</p>
                        <p className="text-2xl font-bold text-[#dc2626] mt-2">
                          ${selectedPackageData?.price.toLocaleString()} per person
                        </p>
                      </div>
                      
                      <div className="border-t border-slate-700 pt-4">
                        <h4 className="text-sm text-gray-400 mb-2">Payment Option</h4>
                        <p className="text-white font-semibold">
                          {formData.paymentChoice === 'full' ? 'Pay in Full' : 'Deposit Payment'}
                        </p>
                        <p className="text-2xl font-bold text-white mt-1">
                          {formData.paymentChoice === 'full' 
                            ? selectedPackageData?.occupancy === 'Double'
                              ? `$${(selectedPackageData.price * 2).toLocaleString()}`
                              : `$${selectedPackageData?.price.toLocaleString()}`
                            : selectedPackageData?.occupancy === 'Double' ? '$7,049' : '$3,525'}
                        </p>
                        {formData.paymentChoice === 'deposit' ? (
                          <p className="text-sm text-gray-400 mt-1">
                            {selectedPackageData?.occupancy === 'Double' ? '$3,524.50 per person • ' : ''}Balance due 60 days before travel
                          </p>
                        ) : selectedPackageData?.occupancy === 'Double' && (
                          <p className="text-sm text-gray-400 mt-1">
                            ${selectedPackageData.price.toLocaleString()} per person
                          </p>
                        )}
                      </div>
                      
                      <div className="border-t border-slate-700 pt-4">
                        <h4 className="text-sm text-gray-400 mb-2">Contact Information</h4>
                        <p className="text-white">{formData.name}</p>
                        <p className="text-gray-300">{formData.email}</p>
                        <p className="text-gray-300">{formData.phone}</p>
                      </div>
                      
                      <div className="border-t border-slate-700 pt-4">
                        <h4 className="text-sm text-gray-400 mb-2">Booking Details</h4>
                        <p className="text-gray-300">Travel Dates: {formData.travelDates}</p>
                        <p className="text-gray-300">Travelers: {formData.numberOfTravelers}</p>
                        {formData.specialRequests && (
                          <p className="text-gray-300 mt-2">Special Requests: {formData.specialRequests}</p>
                        )}
                      </div>

                      <div className="bg-[#1e3a8a]/20 border border-[#1e3a8a] rounded-lg p-4 mt-4">
                        <p className="text-sm text-gray-300">
                          By submitting this booking request, our team will contact you within 24 hours to confirm 
                          availability and provide payment instructions. No payment is required at this time.
                        </p>
                      </div>
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
                
                {currentStep < 4 ? (
                  <Button
                    onClick={handleNext}
                    disabled={
                      currentStep === 1 ? !canProceedStep1 
                      : currentStep === 2 ? !canProceedStep2 
                      : !canProceedStep3
                    }
                    className="flex-1 bg-[#dc2626] hover:bg-[#b91c1c]"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 bg-[#dc2626] hover:bg-[#b91c1c]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                  </Button>
                )}
              </div>
            </>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}