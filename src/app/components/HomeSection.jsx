import React from 'react'

export default function HomeSection() {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('gadgets.png')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex items-center justify-center h-full">
        <a href="products"className=" px-6 py-3 text-5xl text-white hover:bg-gray-700 rounded ">
          Browse all products...
        </a>
      </div>
    </div>
  )
}
