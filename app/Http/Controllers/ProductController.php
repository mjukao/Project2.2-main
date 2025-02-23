<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }
    public function manager()
    {
        return inertia('ProductManager'); // ใช้ Inertia.js ถ้าใช้ React/Vue
    }

    public function store(Request $request)
    {
        Log::info("🔍 Data received from Frontend:", $request->all()); // ✅ Log เช็คค่าที่ได้รับ

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image_url' => 'nullable|string|url',
        ]);

        // ✅ ตรวจสอบว่ามีการอัปโหลดไฟล์หรือไม่
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validatedData['image_url'] = asset("storage/$path");
        }

        // ✅ ถ้ามี URL ใช้ URL ที่ผู้ใช้ใส่ (ไม่ทับค่าจากไฟล์)
        if ($request->filled('image_url')) {
            $validatedData['image_url'] = $request->input('image_url'); // ✅ ใช้ input() เพื่อความชัดเจน
        }

        // ✅ ตรวจสอบอีกครั้งว่ามี `image_url` หรือไม่ก่อนบันทึก
        if (!isset($validatedData['image_url']) || empty($validatedData['image_url'])) {
            Log::warning("❌ ไม่มีรูปภาพหรือ URL ถูกส่งมา");
            return response()->json(['error' => 'ต้องมีรูปภาพหรือ URL'], 422);
        }

        Log::info("✅ Data to be saved (Final):", $validatedData); // ✅ Log ตรวจสอบค่าก่อนบันทึก

        $product = Product::create($validatedData);

        return response()->json([
            'message' => 'Product created successfully!',
            'product' => $product
        ], 201);
    }

    public function update(Request $request, $id)
{
    $validatedData = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'price' => 'sometimes|required|numeric',
        'category_id' => 'sometimes|required|integer',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'image_url' => 'nullable|string|url',
    ]);

    $product = Product::findOrFail($id);

    // ✅ ถ้ามีการอัปโหลดไฟล์ใหม่ให้ใช้ไฟล์
    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('products', 'public');
        $validatedData['image_url'] = asset("storage/$path");
    }

    // ✅ ถ้าไม่มีไฟล์ใหม่ ให้ใช้ URL เดิม
    if (!$request->hasFile('image') && !$request->filled('image_url')) {
        unset($validatedData['image_url']);
    }

    // ✅ บันทึกเฉพาะค่าที่ถูกส่งมา
    $product->update($validatedData);

    return response()->json(['message' => 'Product updated successfully!', 'product' => $product], 200);
}


public function destroy($id)
{
    $product = Product::find($id);
    if (!$product) {
        return response()->json(['message' => 'Product not found!'], 404);
    }

    $product->delete(); // ลบสินค้า
    return response()->json(['message' => 'Product deleted successfully!'], 200);
}


}
