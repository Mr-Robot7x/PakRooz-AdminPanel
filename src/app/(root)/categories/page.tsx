import Container from "@/components/Container";
import Image from "next/image";
import React from "react";
import laptop from "../../../../public/webAsserts/laptop-image.jpg";
function CategoryPage() {
  return (
    <Container>
      <section className="bg-red-100 grid md:grid-col-3 grid-col-1 gap-2 w-full">
        <div className="col-span-3">
          <h1>Categories Page</h1>
          <p className="max-w-2xl mt-2">
            create different products categories to organize the products and
            help people find what they are looking for
          </p>
        </div>
        <div className="md:col-span-1 col-span-3">
          <div className="w-full h-12 bg-gray-50 border-b font-bold flex items-center gap-2">
            <div className="w-11 items-center justify-center flex p-1 h-full">
              S.No
            </div>
            <div className="basis-[26%] items-center justify-center flex p-1 h-full">
              Image
            </div>
            <div className="basis-[72%] items-center justify-center flex p-1 h-full">
              Name
            </div>
          </div>
          <div className="bg-white px-1 py-3 relative h-screen hide-scrollbar  overflow-y-auto">
            <div className="w-full  mt-0.5 border-b flex items-center gap-2">
              <div className="w-11 items-center justify-center flex p-1 h-full">
                1
              </div>
              <div className="basis-[26%] items-center justify-center flex p-1 h-full">
                <div className="w-full h-20 bg-red-100 rounded-2xl relative overflow-hidden">
                  <Image
                    alt="product image"
                    src={laptop}
                    fill
                    className="absolute object-cover"
                  />
                </div>
              </div>
              <div className="basis-[72%] flex-col items-start justify-start flex p-1 h-full">
                <span className="font-semibold">Laptops</span>
                <span className="text-sm w-full text-gray-600">
                  Lorem ipsum dolor sit amet...
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 md:col-span-2 col-span-3 min-h-96"></div>
      </section>
    </Container>
  );
}

export default CategoryPage;
