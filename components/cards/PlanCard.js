export default function PlanCard({ plan = "", description, price, features, showBuyButton = true }) {
  return (
    <>
      <div className="bg-lighter p-2 rounded-lg relative pb-36">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold border-b-2 border-gray-600">{plan.toUpperCase()}</h1>
        </div>
        <div>{description}</div>
        <h1 className="font-bold text-lg">Features: </h1>
        <div className="px-10 py-3">
          <ul className="list-disc">
            {features?.map(feature => <li key={feature}>{feature}</li>)}
          </ul>
        </div>
        <div className="absolute bottom-3 w-full">

          <h1 className="text-3xl font-extrabold text-center">${price}/month</h1>
          {showBuyButton ? (
            <div className="flex justify-center pt-4">
              <button className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-red-600 rounded">
                Buy
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}