import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Layout from './layout'

const products = [
  { id: 1, name: 'Product 1', price: 19.99, image: '/placeholder.svg' },
  { id: 2, name: 'Product 2', price: 29.99, image: '/placeholder.svg' },
  { id: 3, name: 'Product 3', price: 39.99, image: '/placeholder.svg' },
  { id: 4, name: 'Product 4', price: 49.99, image: '/placeholder.svg' },
  { id: 5, name: 'Product 5', price: 59.99, image: '/placeholder.svg' },
  { id: 6, name: 'Product 6', price: 69.99, image: '/placeholder.svg' },
]

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Garden']

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortOption, setSortOption] = useState('featured')

  const slides = [
    { image: '/placeholder.svg', title: 'Summer Sale', description: 'Up to 50% off on selected items' },
    { image: '/placeholder.svg', title: 'New Arrivals', description: 'Check out our latest products' },
    { image: '/placeholder.svg', title: 'Free Shipping', description: 'On orders over $50' },
  ]

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === 'price-low-high') return a.price - b.price
    if (sortOption === 'price-high-low') return b.price - a.price
    return 0 // 'featured' or default
  })

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Slider */}
        <div className="relative h-64 sm:h-80 mb-8 rounded-lg overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image src={slide.image} alt={slide.title} layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-xl">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white"
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white"
            onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar (Desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Button
                    variant={selectedCategory === category ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            {/* Filter and Sort Options */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="w-full sm:w-auto mb-4 sm:mb-0"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={sortOption}
                onValueChange={setSortOption}
                className="w-full sm:w-auto"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <Image src={product.image} alt={product.name} width={300} height={300} className="w-full h-48 object-cover mb-4" />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}