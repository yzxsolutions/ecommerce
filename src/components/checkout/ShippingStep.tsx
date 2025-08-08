'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, MapPin, Truck } from 'lucide-react';
import { Address, ShippingMethod } from '../../types/checkout';
import { checkoutApi } from '../../lib/api/checkout';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Select } from '../ui/select';

interface ShippingStepProps {
  onComplete: (
    shippingAddress: Address,
    billingAddress: Address | null,
    useSameAddress: boolean,
    shippingMethod: ShippingMethod
  ) => void;
  isLoading: boolean;
}

export const ShippingStep: React.FC<ShippingStepProps> = ({
  onComplete,
  isLoading,
}) => {
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<string>('');
  const [loadingShipping, setLoadingShipping] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Address>();

  // Load saved addresses on component mount
  useEffect(() => {
    loadSavedAddresses();
  }, []);

  // Load shipping methods when address is selected
  useEffect(() => {
    if (selectedAddressId) {
      loadShippingMethods(selectedAddressId);
    }
  }, [selectedAddressId]);

  const loadSavedAddresses = async () => {
    try {
      const addresses = await checkoutApi.getAddresses();
      setSavedAddresses(addresses);

      // Auto-select default address if available
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress && defaultAddress.id) {
        setSelectedAddressId(defaultAddress.id);
      }
    } catch (error) {
      console.error('Failed to load addresses:', error);
    }
  };

  const loadShippingMethods = async (addressId: string) => {
    setLoadingShipping(true);
    try {
      const methods = await checkoutApi.getShippingMethods(addressId);
      setShippingMethods(methods);

      // Auto-select first shipping method
      if (methods.length > 0) {
        setSelectedShippingMethod(methods[0].id);
      }
    } catch (error) {
      console.error('Failed to load shipping methods:', error);
    } finally {
      setLoadingShipping(false);
    }
  };

  const handleNewAddress = async (data: Address) => {
    try {
      const newAddress = await checkoutApi.createAddress(data);
      setSavedAddresses((prev) => [...prev, newAddress]);
      setSelectedAddressId(newAddress.id!);
      setShowNewAddressForm(false);
      reset();
    } catch (error) {
      console.error('Failed to create address:', error);
    }
  };

  const handleContinue = () => {
    const selectedAddress = savedAddresses.find(
      (addr) => addr.id === selectedAddressId
    );
    const selectedMethod = shippingMethods.find(
      (method) => method.id === selectedShippingMethod
    );

    if (!selectedAddress || !selectedMethod) return;

    onComplete(
      selectedAddress,
      useSameAddress ? null : selectedAddress, // For now, using same address for billing
      useSameAddress,
      selectedMethod
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Shipping Address
        </h2>

        {/* Saved Addresses */}
        {savedAddresses.length > 0 && (
          <div className="space-y-3 mb-4">
            {savedAddresses.map((address) => (
              <Card
                key={address.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedAddressId === address.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedAddressId(address.id!)}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="address"
                    value={address.id}
                    checked={selectedAddressId === address.id}
                    onChange={() => setSelectedAddressId(address.id!)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {address.firstName} {address.lastName}
                      </span>
                      {address.isDefault && (
                        <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p className="text-sm text-gray-600">{address.country}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Add New Address Button */}
        <Button
          variant="outline"
          onClick={() => setShowNewAddressForm(!showNewAddressForm)}
          className="mb-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Address
        </Button>

        {/* New Address Form */}
        {showNewAddressForm && (
          <Card className="p-6 mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add New Address
            </h3>
            <form
              onSubmit={handleSubmit(handleNewAddress)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <Input
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                    error={errors.firstName?.message}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <Input
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                    error={errors.lastName?.message}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company (Optional)
                </label>
                <Input {...register('company')} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1 *
                </label>
                <Input
                  {...register('addressLine1', {
                    required: 'Address is required',
                  })}
                  error={errors.addressLine1?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2 (Optional)
                </label>
                <Input {...register('addressLine2')} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <Input
                    {...register('city', { required: 'City is required' })}
                    error={errors.city?.message}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <Input
                    {...register('state', { required: 'State is required' })}
                    error={errors.state?.message}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code *
                  </label>
                  <Input
                    {...register('postalCode', {
                      required: 'Postal code is required',
                    })}
                    error={errors.postalCode?.message}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <Select
                  {...register('country', { required: 'Country is required' })}
                  error={errors.country?.message}
                  placeholder="Select Country"
                  options={[
                    { value: 'US', label: 'United States' },
                    { value: 'CA', label: 'Canada' },
                    { value: 'UK', label: 'United Kingdom' },
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (Optional)
                </label>
                <Input {...register('phone')} />
              </div>

              <div className="flex gap-3">
                <Button type="submit">Save Address</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewAddressForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>

      {/* Billing Address Option */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Billing Address
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="sameAddress"
            checked={useSameAddress}
            onChange={(e) => setUseSameAddress(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="sameAddress" className="text-sm text-gray-700">
            Same as shipping address
          </label>
        </div>
      </div>

      {/* Shipping Methods */}
      {selectedAddressId && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Shipping Method
          </h3>
          {loadingShipping ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {shippingMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedShippingMethod === method.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedShippingMethod(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value={method.id}
                      checked={selectedShippingMethod === method.id}
                      onChange={() => setSelectedShippingMethod(method.id)}
                    />
                    <Truck className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">
                          {method.name}
                        </span>
                        <span className="font-medium text-gray-900">
                          ${method.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        Estimated delivery: {method.estimatedDays}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={handleContinue}
          disabled={!selectedAddressId || !selectedShippingMethod || isLoading}
          size="lg"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};
