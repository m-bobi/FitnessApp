import React from 'react'
import './Products.css';
const Products = () => {
  return (
    <><div className="productBanner">
      <div className="homeBannerContainer" data-aos="fade-right">
        <p className="firstText">A test</p>
        <div className="middleText">
          <p>GROW MENTALLY, AND PHYSICALLY</p>
        </div>
        <div className="bottomText">
          <p>Need help getting started?</p>
        </div>
        <button
          type="submit"
          className="buttonS mt-5 tracking-wide font-semibold text-gray-100 hover:text-gray-900 w-52 py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <span className="ml-3">Start now!</span>
        </button>
      </div>
    </div>
      <div className='border'>
        <div className='borderText'>
          <p>Our Products</p>
          
        </div>
        <div class="w-1/6 border-t-2 mx-auto border-red-700  pb-8"></div>
        <div class="flex items-center justify-center mt-4 pb-20">
  <input
    type="text"
    placeholder="Search..."
    class="rounded-full py-2 px-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-left"
  />
  <button class="bg-red-700 transition-colors duration-300 ease-in-out hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full ml-2">
    Search
  </button>
</div>

        <div class="flex flex-row flex-wrap mx-auto px-10 space-x-5 pb-10">
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" alt="" src="" />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Product Name</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio aspernatur quaerat molestias ea consequatur modi adipisci, pariatur in doloribus eius similique ad aut dicta provident culpa voluptatibus? Libero, quis alias?
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block text-gray-700 mr-2 mb-2">$99.99</span>
            </div>
            <div class="px-6 pt-4 pb-2">
              <button class="bg-red-700 transition-colors duration-300 ease-in-out hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>



          </div>
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" alt="" src="" />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Product Name</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi hic laborum illum corporis magni quo consequuntur. Placeat assumenda dolorem numquam, maiores necessitatibus perferendis similique odio exercitationem sequi dolorum blanditiis voluptatum!
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block text-gray-700 mr-2 mb-2">$99.99</span>
            </div>
            <div class="px-6 pt-4 pb-2">
              <button class="bg-red-700 transition-colors duration-300 ease-in-out hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>

          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" alt="" src="" />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Product Name</div>
              <p class="text-gray-700 text-base">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum temporibus suscipit hic tenetur voluptatem cum quasi blanditiis necessitatibus. Autem a culpa provident consequatur tenetur odio nihil quos maiores earum nesciunt!
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block text-gray-700 mr-2 mb-2">$99.99</span>
            </div>
            <div class="px-6 pt-4 pb-2">
              <button class="bg-red-700 transition-colors duration-300 ease-in-out hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" alt="" src="" />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Product Name</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ad aliquam debitis! Ratione quidem, voluptates iusto quam exercitationem sequi quaerat ullam voluptate itaque, harum voluptatibus dolorum, vel repudiandae blanditiis id?
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block text-gray-700 mr-2 mb-2">$99.99</span>
            </div>
            <div class="px-6 pt-4 pb-2">
              <button class="bg-red-700 transition-colors duration-300 ease-in-out hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className='secondary-products'></div>
        <div class="flex flex-row flex-wrap mx-auto px-10 space-x-5">
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" alt="" src="" />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Product Name</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum unde adipisci minima earum, est aliquid aut nesciunt tempora explicabo tempore ut voluptatibus dolor officiis vel mollitia! Eius repellat id inventore?
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block text-gray-700 mr-2 mb-2">$99.99</span>
            </div>
            <div class="px-6 pt-4 pb-2">
              <button class="bg-red-700 transition-colors duration-300 ease-in-out hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" alt="" src="" />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Product Name</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta tenetur at possimus eveniet, accusamus velit assumenda voluptas, sequi laborum repellendus quidem ad voluptatibus accusantium cum nisi rem sapiente, qui dignissimos.
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block text-gray-700 mr-2 mb-2">$99.99</span>
            </div>
            <div class="px-6 pt-4 pb-2">
              <button class="bg-red-700 transition-colors duration-300 ease-in-out hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" alt="" src="" />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Product Name</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores nihil, sed corporis blanditiis maxime nam. Blanditiis at neque provident dolorum, voluptate eligendi exercitationem asperiores. Incidunt consequuntur dolore porro ipsa laboriosam.
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block text-gray-700 mr-2 mb-2">$99.99</span>
            </div>
            <div class="px-6 pt-4 pb-2">
              <button class="bg-red-700 transition-colors duration-300 ease-in-out hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" alt="" src="" />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Product Name</div>
              <p class="text-gray-700 text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque unde voluptate architecto sapiente nulla sunt culpa facere illum laudantium assumenda rem, ea dolores accusamus, sed provident fugiat, ipsam voluptas adipisci?
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span class="inline-block text-gray-700 mr-2 mb-2">$99.99</span>
            </div>
            <div class="px-6 pt-4 pb-2">
              <button class="bg-red-700 transition-colors duration-300 ease-in-out hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default Products