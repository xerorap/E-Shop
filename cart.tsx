import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Layout from './layout'

const cartItems = [
  { id: 1, name: 'Product 1', price: 19.99, quantity: 2, image: '/placeholder.svg' },
  { id: 2, name: 'Product 2', price: 29.99, quantity: 1, image: '/placeholder.svg' },
  // Add more cart items...
]

export default function CartPage() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b py-4">
                  <Image src={item.image} alt={item.name} width={80} height={80} className="mr-4" />
                  <div className="flex-1">
                    <Link href={`/product/${item.id}`} className="font-semibold hover:underline">
                      {item.name}
                    </Link>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <Button variant="outline" size="sm">-</Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button variant="outline" size="sm">+</Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
            <div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>${(total + 5).toFixed(2)}</span>
                </div>
                <Button className="w-full mt-6">Proceed to Checkout</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}