import react, { useState } from "react";
import { IScore } from "../models/Interface";

function ScoreList(props: { players: IScore[] }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="-my-2 overflow-x-auto  w-[80vw]">
        <div className="py-2 align-middle inline-block">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="w-[80vw] divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="px-6 py-3 text-lg font-medium text-gray-900 uppercase tracking-wider">
                  <th
                    scope="col"
                    className="px-6 py-3 text-lg font-medium text-gray-900 uppercase tracking-wider"
                  >
                    USERNAME
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-lg font-medium text-gray-900 uppercase tracking-wider"
                  >
                    SCORE
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-lg font-medium text-gray-900 uppercase tracking-wider"
                  >
                    TOTAL GUESSES
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-lg font-medium text-gray-900 uppercase tracking-wider"
                  >
                    WIN RATE
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.players.length > 0 ? (
                  props.players.map((player) => (
                    <tr className="text-center">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {player.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {player.score}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {player.totalGuess}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {Math.round((player.score / player.totalGuess) * 100)}%
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center">
                    <td className="px-6 py-4 whitespace-nowrap">
                      No scores yet!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ScoreList;
