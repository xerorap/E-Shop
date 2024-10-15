import { useState } from 'react'
import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Layout from './layout'

const product = {
  id: 1,
  name: 'Premium T-Shirt',
  price: 29.99,
  description: 'A high-quality, comfortable t-shirt made from 100% cotton.',
  images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  variants: [
    { name: 'Size', options: ['S', 'M', 'L', 'XL'] },
    { name: 'Color', options: ['White', 'Black', 'Blue', 'Red'] },
  ],
  specifications: [
    { name: 'Material', value: '100% Cotton' },
    { name: 'Fit', value: 'Regular' },
    { name: 'Care', value: 'Machine wash cold' },
  ],
  reviews: [
    { id: 1, author: 'John Doe', rating: 5, comment: 'Great product, very comfortable!' },
    { id: 2, author: 'Jane Smith', rating: 4, comment: 'Good quality, but sizing runs a bit small.' },
  ],
}

export default function SingleProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState({})

  const handleVariantChange = (variantName, option) => {
    setSelectedVariants((prev) => ({ ...prev, [variantName]: option }))
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <Image src={image} alt={`${product.name} ${index + 1}`} width={100} height={100} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Variants */}
            {product.variants.map((variant) => (
              <div key={variant.name} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{variant.name}</h3>
                <div className="flex space-x-2">
                  {variant.options.map((option) => (
                    <Button
                      key={option}
                      variant={selectedVariants[variant.name] === option ? 'default' : 'outline'}
                      onClick={() => handleVariantChange(variant.name, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex space-x-4 mt-8">
              <Button size="lg" className="flex-1">
                Buy Now
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="specifications" className="mt-12">
          <TabsList>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="specifications">
            <table className="w-full">
              <tbody>
                {product.specifications.map((spec) => (
                  <tr key={spec.name} className="border-b">
                    <td className="py-2 font-semibold">{spec.name}</td>
                    <td className="py-2">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">{review.author}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5  ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}