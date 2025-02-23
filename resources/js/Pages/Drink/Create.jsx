import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Swal from 'sweetalert2';

const CreateProduct = () => {
    const { data, setData, post, processing, errors } = useForm({
        image_url: '',
        name: '',
        price: '',
        category_id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'), {
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'สร้างสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    สร้างสินค้าใหม่
                </h2>
            }
        >
            <Head title="Create New Product" />
            <div className="container mx-auto p-8 bg-gray-100 shadow-lg rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image_url">
                            URL รูปภาพ
                        </label>
                        <input
                            type="text"
                            id="image_url"
                            name="image_url"
                            value={data.image_url}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.image_url && <div className="text-red-500 text-xs mt-2">{errors.image_url}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            ชื่อสินค้า
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-2">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            ราคา
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.price && <div className="text-red-500 text-xs mt-2">{errors.price}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_id">
                            หมวดหมู่สินค้า
                        </label>
                        <input
                            type="number"
                            id="category_id"
                            name="category_id"
                            value={data.category_id}
                            onChange={handleChange}
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.category_id && <div className="text-red-500 text-xs mt-2">{errors.category_id}</div>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            สร้างสินค้า
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreateProduct;
