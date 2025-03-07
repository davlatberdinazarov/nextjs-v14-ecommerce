'use client'

import CustomImage from '@/components/image';
import { ProductType } from '@/interfaces';
import { Dialog } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/16/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function ProductDetailPage() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const { id } = useParams();
  const router = useRouter();

  // LocalStorage bilan ishlashni useEffect ichida qilish
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      const products: ProductType[] =
        JSON.parse(localStorage.getItem('carts') || '[]');

      const isExistProduct = products.find(c => c.id === product?.id);

      let updatedData;
      if (isExistProduct) {
        updatedData = products.map(c =>
          c.id === product?.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      } else {
        updatedData = [...products, { ...product, quantity: 1 }];
      }

      localStorage.setItem('carts', JSON.stringify(updatedData));
      toast('Product added to your bag!!');
    }
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const product = await res.json();
        setProduct(product);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) getData();
  }, [id]);

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          router.back();
        }}
        className='relative z-50'
      >
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <Dialog.Panel className='mx-auto max-w-3xl rounded bg-white p-10'>
              {loading ? (
                <div className='h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin' />
              ) : (
                <div className='flex gap-x-8 h-96'>
                  {product?.image && (
                    <div className='relative w-72 h-full hidden md:inline'>
                      <CustomImage product={product} fill />
                    </div>
                  )}
                  <div className='flex-1 flex flex-col'>
                    <div className='flex-1'>
                      <h4 className='font-semibold'>{product?.title}</h4>
                      <p className='font-medium text-sm'>${product?.price}</p>

                      <div className='flex items-center text-sm my-4'>
                        <p>{product?.rating?.rate}</p>
                        {product?.rating?.rate && (
                          <div className='flex items-center ml-2 mr-6'>
                            {Array.from({ length: Math.floor(product.rating.rate) }, (_, i) => (
                              <StarIcon key={i} className='h-4 w-4 text-yellow-500' />
                            ))}
                            {Array.from({ length: 5 - Math.floor(product.rating.rate) }, (_, i) => (
                              <StarIconOutline key={i} className='h-4 w-4 text-yellow-500' />
                            ))}
                          </div>
                        )}
                        <p className='text-blue-600 hover:underline cursor-pointer text-xs'>
                          See all {product?.rating?.count} reviews
                        </p>
                      </div>
                      <p className='line-clamp-5 text-sm'>{product?.description}</p>
                    </div>

                    <div className='space-y-3 text-sm'>
                      <button
                        className='button w-full bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black'
                        onClick={handleClick}
                      >
                        Add to bag
                      </button>
                      <button
                        onClick={() => window.location.reload()}
                        className='button w-full bg-transparent border-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent'
                      >
                        View full details
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
