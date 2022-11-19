import react, { useState } from 'react'
import IHistory from "./Interface"

export default function HistList(props:{hist: IHistory[]}): JSX.Element {
  let key = 0 //for key in map
  // edited from tailwind-ui
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-lg font-medium text-gray-900 uppercase tracking-wider"
                  >
                    Coin
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-lg font-medium text-gray-900 uppercase tracking-wider"
                  >
                    Guess
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-lg font-medium text-gray-900 uppercase tracking-wider"
                  >
                    Actual
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-lg font-medium text-gray-900 uppercase tracking-wider"
                  >
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.hist.map((elem) => {
                  let x;
                  if (elem.guess==elem.result){ //indicate when user input is correct
                    x = <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Correct
                        </span>
                  } else{
                    x = <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-red-100 text-green-800">
                            Wrong
                        </span>
                  }
                  key+=1;
                  return (<tr key={elem.coin}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-medium text-gray-500">{elem.coin}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{elem.guess}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{elem.result}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {x}
                    </td>
                  </tr>
                 )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
