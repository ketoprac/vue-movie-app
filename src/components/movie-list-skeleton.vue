<template>
  <div className="h-8 bg-gray-600 mt-6 mb-4 px-2 w-36 mx-auto animate-pulse"></div>
  <ul
    className="p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-8/12 mx-auto"
  >
    <!-- Skeleton loading -->
    <li
      v-for="index in 9"
      :key="index"
      className="border border-gray-600 mb-2 p-3 shadow rounded-xl animate-pulse"
    >
      <div className="w-full h-96 bg-gray-600 mb-2"></div>
      <div className="h-6 bg-gray-600 mb-2"></div>
      <div className="h-5 bg-gray-600 w-3/4 mb-2"></div>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-1">
          <div className="h-4 w-5 bg-gray-600"></div>
          <div className="h-4 w-8 bg-gray-600"></div>
        </div>
        <div className="h-4 w-5 bg-gray-600"></div>
      </div>
    </li>
  </ul>
</template>
