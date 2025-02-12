'use client';

import CustomImage from '@/components/image';
import { ProductType } from '@/interfaces';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ShoppingCart = () => {
	const [products, setProducts] = useState<ProductType[]>(() => {
		if (typeof window !== 'undefined') {
			return JSON.parse(localStorage.getItem('carts') as string) || [];
		}
		return [];
	});

	// localStorage'ni faqat products o'zgarganda yangilash
	useEffect(() => {
		localStorage.setItem('carts', JSON.stringify(products));
	}, [products]);

	// Jami narxni hisoblash (endi useEffect kerak emas)
	const total = products.reduce((acc, item) => acc + item.price * item.quantity, 0);

	const removeProduct = (id: number) => {
		setProducts(products.filter(product => product.id !== id));
	};

	const handleIncrement = (id: number) => {
		setProducts(products.map(product => 
			product.id === id ? { ...product, quantity: product.quantity + 1 } : product
		));
	};

	const handleDecrement = (id: number) => {
		setProducts(products.map(product => 
			product.id === id ? { ...product, quantity: Math.max(product.quantity - 1, 1) } : product
		));
	};

	const handleUpdateQuantity = (id: number, value: number) => {
		if (value < 1) return;
		setProducts(products.map(product => 
			product.id === id ? { ...product, quantity: value } : product
		));
	};

	return (
		<>
			{products.length ? (
				<div className='min-h-screen bg-gray-100 pt-20'>
					<h1 className='mb-10 text-center text-2xl font-bold'>Cart Items</h1>
					<div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
						<div className='rounded-lg md:w-2/3'>
							{products.map(product => (
								<div key={product.id} className='mb-6 rounded-lg bg-white p-6 shadow-md flex'>
									<div className='relative w-52'>
										<CustomImage product={product} fill />
									</div>
									<div className='sm:ml-4 flex flex-col justify-between w-full'>
										<div>
											<h2 className='text-lg font-bold text-gray-900'>{product.title}</h2>
											<p className='mt-1 text-xs text-gray-700'>{product.description}</p>
											<div className='flex items-center text-sm my-4'>
												<p>{product.rating.rate}</p>
												<div className='flex ml-2'>
													{[...Array(5)].map((_, i) => 
														i < Math.floor(product.rating.rate) ? 
														<StarIcon key={i} className='h-4 w-4 text-yellow-500' /> : 
														<StarIconOutline key={i} className='h-4 w-4 text-yellow-500' />
													)}
												</div>
												<p className='text-blue-600 hover:underline cursor-pointer text-xs ml-4'>
													See all {product.rating.count} reviews
												</p>
											</div>
										</div>
										<div className='flex justify-between items-center'>
											<div className='flex items-center border-gray-100'>
												<button 
													className='px-3 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-l'
													onClick={() => handleDecrement(product.id)}
												> - </button>
												<input
													type='number'
													className='h-8 w-10 border text-center'
													value={product.quantity}
													min='1'
													onChange={(e) => handleUpdateQuantity(product.id, parseInt(e.target.value))}
												/>
												<button 
													className='px-3 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white rounded-r'
													onClick={() => handleIncrement(product.id)}
												> + </button>
											</div>
											<p className='text-sm'>
												{(product.price * product.quantity).toLocaleString('en-US', {
													style: 'currency',
													currency: 'USD',
												})}
											</p>
											<button onClick={() => removeProduct(product.id)} className='text-red-500 hover:text-red-700'>
												✖
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
						<div className='h-full rounded-lg border bg-white p-6 shadow-md md:w-1/3'>
							<div className='mb-2 flex justify-between'>
								<p className='text-gray-700'>Subtotal</p>
								<p className='text-gray-700'>
									{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
								</p>
							</div>
							<div className='flex justify-between'>
								<p className='text-gray-700'>Shipping</p>
								<p className='text-gray-700'>$10.00</p>
							</div>
							<hr className='my-4' />
							<div className='flex justify-between'>
								<p className='text-lg font-bold'>Total</p>
								<p className='text-lg font-bold'>
									{(total + 10).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
								</p>
							</div>
							<button className='mt-6 w-full rounded-md bg-blue-500 py-4 font-medium text-white hover:bg-blue-600'>
								Check out
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className='flex h-screen items-center justify-center bg-white w-full'>
					<div className='text-center'>
						
						<h1 className='text-3xl font-bold text-gray-800'>Shopping cart is empty</h1>
						<p className='text-gray-600 mt-4'>Add some products to your cart!</p>
						<Link href={'/products'}>
							<button className='mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
								Browse Products
							</button>
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default ShoppingCart;
